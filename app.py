import os
import csv
from dotenv import load_dotenv

# flast
from flask import Flask
from flask_graphql import GraphQLView

# DB
from sqlalchemy import create_engine, desc, inspect, Column, Integer, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# graphene
import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField

load_dotenv()

app = Flask(__name__)
DB_URL = os.getenv("DB_URL")

# Database
'''
Connect to Database and load Engine and Session
'''
Base = declarative_base()
engine = create_engine(DB_URL, pool_size=20, max_overflow=0)
Session = sessionmaker(bind=engine) # Define Session dependent on Engine
session = Session()

# Models
'''
To create a table, use the Base that mediates the table class and DB.
'''
class Aircraft(Base):
  __tablename__ = 'aircraft'
  
  id = Column(Integer, primary_key=True)
  date_completed = Column(Text)
  manufacturer = Column(Text)
  model = Column(Text)
  atct_weight_class = Column(Text)
  
  def __repr__(self):
    return '' % self.date_completed % self.manufacturer % self.model % self.atct_weight_class

# Schema Objects
'''
Schemas are used to describe data
'''
class AircraftObject(SQLAlchemyObjectType):
  class Meta:
    model = Aircraft
    interfaces = (graphene.relay.Node, )

# Query
  '''
  Declare node variable in Query class and specify relay field.
  Relay allows users to retrieve only the data they need through queries in predefined data structures.
  '''
class Query(graphene.ObjectType):
  node = graphene.relay.Node.Field()
  all_aircraft = graphene.List(AircraftObject)
  matched_models = graphene.List(AircraftObject, input=graphene.String())
  matched_atct_weight = graphene.List(AircraftObject, weight=graphene.String())
  
  def resolve_all_aircraft(self, info):
    return AircraftObject.get_query(info).order_by(desc(Aircraft.model)).all()

  def resolve_matched_models(self, info, input):
    query = AircraftObject.get_query(info)
    
    return query.filter(Aircraft.model.regexp_match("{0}".format(input), "i")).all()
  
  def resolve_matched_atct_weight(self, info, weight):
    query = AircraftObject.get_query(info)
    
    return query.filter(Aircraft.atct_weight_class == weight).all()
  

class AddAircraft(graphene.Mutation):
  '''
  Inherit graphene's Mutation and define Arguments to be used for it.
  '''
  class Arguments:
    date_completed = graphene.String(required=True)
    manufacturer = graphene.String(required=True)
    model = graphene.String(required=True)
    atct_weight_class = graphene.String(required=True)
    
  aircraft = graphene.Field(lambda: AircraftObject)
    
  def mutate(self, date_completed, manufacturer, model, atct_weight_class):
    aircraft = Aircraft(
      date_completed, 
      manufacturer,
      model,
      atct_weight_class
    )
    session.add(aircraft)
    session.commit()
    return AddAircraft(aircraft=aircraft)

# Mutation
  '''
  Create Mutation ObjectType to store into GraphQLApp
  '''
class Mutation(graphene.ObjectType):
  add_aircraft = AddAircraft.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)

# Routes
'''
Create one endpoint
'''
app.add_url_rule(
  '/graphql',
  view_func=GraphQLView.as_view(
    'graphql',
    schema=schema,
    graphiql=True, # for having the GraphiQL interface
    get_context=lambda: {'session': Session()}
  )
)

# Health Check
@app.route('/')
def index():
  return "Welcom to Python Demo"

# Init all Aircraft data
'''
If there is no table in the DB, read the entire CSV data and stored in the database.
'''
def init_data():
  inspector = inspect(engine)
  
  if 'aircraft' not in inspector.get_table_names():
      Base.metadata.create_all(engine)
      
      data = []
      with open('./Aircraft_Database.csv', 'r') as f:
        reader = csv.DictReader(f)
        
        for txt in reader:
          data.append({
            'Date Completed': txt['Date Completed'], 
            'Manufacturer': txt['Manufacturer'], 
            'Model': txt['Model'], 
            'ATCT Weight Class': txt['ATCT Weight Class']
          })
      f.close()
      
      for item in data:
        aircraft = Aircraft()
        aircraft.date_completed = item['Date Completed']
        aircraft.manufacturer = item['Manufacturer']
        aircraft.model = item['Model']
        aircraft.atct_weight_class = item['ATCT Weight Class']
        session.add(aircraft)
        
      session.commit()
      print("Successfully connect to Database with inserting all data")
        
  else:
    print('Successfully connect to database where aircraft data exists')

if __name__ == "__main__":
  init_data()
  app.run(debug=True)
  