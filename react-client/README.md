> I use `material-ui` for CSS

# Filter Selector
  - Through the filter selection section, the user can select the desired filter.
  
![Filter_Selector](https://user-images.githubusercontent.com/47313362/175656396-780a8b50-7084-4799-a028-1e2e84c73075.png)
![Filter_Selector](https://user-images.githubusercontent.com/47313362/175656680-3b633f05-6f23-4681-8f1e-1ee93f0ea97b.png)

# GET All Aircraft
  - Created sorting and pagination functions
  
https://user-images.githubusercontent.com/47313362/175656948-eda158c5-5ca9-4b95-9904-bf1040b5ee8a.mov

# GET Mathed Models Aircraft
  - Added a search function to help users find the model they want.
  - The search function continuously sends requests to the server each time the user enters it. 
  - To prevent this issue, the [debounce](https://lodash.com/docs/#debounce) function of the lodash library is used.
  - Debouncing has a function that waits for a set amount of time and then executes a specific event.

https://user-images.githubusercontent.com/47313362/175657099-84e83dbb-9bf0-4dc9-b360-0d7183aaebe2.mov



# GET Matched ATCT Weight Class Aircraft
  - Since there are many overlapping values of ATCT Weight Class, it has been implemented so that the user can select it.

https://user-images.githubusercontent.com/47313362/175657049-bdabd2fc-52f0-417d-bd78-8a2543808254.mov

# 404 NotFound Page
  - If the user try to reach a route that does not exist, a 404 error message is displayed
  - When the user click the `GO TO HOME` button, redirected to the home page

https://user-images.githubusercontent.com/47313362/175665823-f7d53fc7-198e-4063-a1f4-24890cc22973.mov


