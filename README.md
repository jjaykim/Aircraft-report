# Co-op

# 1. Backend

## 1.1 Set up Backend

1. At root, install required pip library: `pip3 install -r requirements.txt`
2. Create `.env` file on root directory
3. Connect the database to the local machine

   3-1. Start your `Postgresql` and use the following command to initialize development and test databases

   ```sql
   $ psql postgres
   postgres=# CREATE USER py_demo WITH SUPERUSER PASSWORD 'test';
   postgres=# CREATE DATABASE py_demo OWNER py_demo;
   ```

   3-2. FYI, I use `DBeaver` for the database tool

4. Add Database URL into `.env` file

   ```text
   DB_URL=postgresql://py_demo:test@localhost:5432/py_demo
   ```

5. Run `python3 app.py`
6. Finally, you can check the `aircraft` table in the `py_demo` database.

## 1.2 Endpoint

- By using `graphql`, our app has only one endpoint which is `/graphql`
- There are total of 3 queries and can be tested in `GraphiQL`

  - If you set up Backend, you can test them. Run `python3 app.py`

  ```graphql
  query all {
    allAircraft {
      id
      model
      atctWeightClass
      manufacturer
    }
  }

  query matchedModels {
    matchedModels(input: "ace") {
      id
      model
      manufacturer
      atctWeightClass
    }
  }

  query matchedAtctWeight {
    matchedAtctWeight(weight: "tbd") {
      id
      model
      atctWeightClass
      manufacturer
    }
  }
  ```

# 2. Frontend

## 2.1 Set up Front

1. Open another terminal window
2. Go to `react-client` folder and run npm install

   ```bash
   cd react-client
   npm install
   ```

3. Run `npm start`
4. If you have an error like below

   > Proxy error: Could not proxy request /graphql from localhost:3000 to [http://localhost:5000](http://localhost:5000/).
   > See [https://nodejs.org/api/errors.html#errors_common_system_errors](https://nodejs.org/api/errors.html#errors_common_system_errors) for more information (ECONNREFUSED).

   Please check your backend is running

# Stacks:

> `Backend`
>
> > **Python** with [**Flask**](https://flask.palletsprojects.com/en/2.1.x/quickstart/)
> >
> > **GraphQL** for APIs
> >
> > **PostgreSQL** for Database
> >
> > [**Graphene**](https://graphene-python.org/) for GraphQL
> >
> > [**SQLAlchemy**](https://docs.sqlalchemy.org/en/14/orm/) for Base ORM
> >
> > **psycopg2** for DB engine
>
> `Frontend`
>
> > **React** (v17)
> >
> > **TypesScript** > [**Materia-UI**](https://v4.mui.com/api/typography/#typography-api) (v4)
> >
> > **Apollo** for Graphql interaction to bckend
