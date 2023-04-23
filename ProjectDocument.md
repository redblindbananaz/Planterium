# Project Documentation:

## OverView:

The mobile application, **Planterium**, aims to address the challenges faced by plant enthusiasts in keeping track of their plant collection and maintaining an effective watering schedule. This application is designed for individuals who have a good knowledge of plants and possess a diverse collection, making it difficult to remember the last time a plant was watered or its age.

**Planterium** also provides a platform for users to rate the general health of their plants in a simple and visually appealing manner. Additionally, the application allows users to group their plants by location and provides support for plants with varying watering requirements. Furthermore, for those who own specific or rare plants with complex scientific names, Planterium offers a feature to record and reference such information.

##### Features needed for requirements:

- Simple Design and Great Responsiveness
- Application to have offline support=> SQLite
- Address the resolution issue
- Avoid poor and unclear navigation
- Implement the landscape modes
- Try to have an auto-fill feature=> Not applicable for this project But use of numeric keyboard if number need to be entered.
- Advanced Features

## Structure Tree:

- **Main** = custom Tab system: Home (plants) **or** Rooms (rooms)
- **Main Plus** button on either tabs =>Navigate=> **RegisterPlant**
- **Main Card Press** =>Navigate=> **View Plant**(Details of selected ID)
- **View Plant** => return || Water || Edit || Delete
- **View Plant Return** action =>Navigation(Main)
- **View Plant Water || Delete**=> confirm message Modal=> Action SQL =>Navigation(Main)
- **ViewPlant Edit** =>Navigate(Register)=> **Update** actions instead of **Register**

## Features:

- Max lenght of user input implemented with character count and red color warning if reached
- Custom Calendar with Modal
- Welcome Helper message: how to start, if empty list
- SQL Database
- Navigation
- Dynamic dates
- Custom components
- Counter
- Dynamic colors for Health rates
- Splash Screen
- SQl Grouping and Counting
- Transparancy and gradient design.

## BugFix:

- **Plant Card Home**: Calculation of Date formatting issues, all dates are now at the right format, calculation of **last time watered** ( time difference between last watering date=> represent in days with current day), calculation of **Next watering** date (time difference last watering date, current date => represent in days=> (n)days || Overdue || Now || tomorrow),calculation of **Time owned** (time difference between purchase date and current date=> representation per: days||months||Years accordingly).
  **All calculation are now working and tested**
- **Counter water schedule**: Limit sets to 1 minimum and 31 for max: Bug appear when pressing plus: goes from default value 4 to 41. also when default 4=> record 3. Limit issues
- **Camera**:
  Info: 'In JavaScript, a **promise** represents an operation that may complete either successfully or with an error. When working with promises, it's important to handle both successful and failed results. An unhandled promise rejection occurs when a promise is rejected (i.e., an error occurs), but there is no error handler to handle the error. This means that the error is not being caught and the code is not handling it properly, which can lead to unexpected behavior or crashes.
  For example, if you are making an API call using a promise and the call fails, but there is no error handling in place, the promise will be rejected and you may see an "unhandled promise rejection" error in your console.**NOT RESOLVED**.
- **Edit** not retrieving information- solved (still need to work on updating some child components)

## Testing:

- **plant Name and botanical lenght:** Max size character tested, no overlapping text, color warning appear, word count working.
- **Calendar:** Date showing correct data, selection and display accurate, modal visible on/off working.
- **Welcome** message visible is no list present and not vibible when cards
- **SQL** Loading and operation message confirming actions, refreshed applied on page to reload new data.
- **Navigation** tested trough the build
- **Dynamic dates** range of dates tested during Bugfix for the 3 features (last watered, next watering, time owned since purchased)
- **Dynamic colors** tested and shows accordingly on icon and text of Health.
- **Details** when changes, details represented correctly according to card view and when changes, all applies.
- **Bugfix** have been tested and passed( Unless marked as NOT RESOLVED)
- **Rooms** showing dynamically.Disappear when no plants in the room and update number of plants if plant added to the room.
- **WateringRoom** updates all waterdate back to today and reset next watering days according to waterscheddule for all plants in the selected room.
- **DefaultThumbnail** if no image picked by camera or gallery.

## To do List:

- Finish View plant layout: **Done**
- Room => show accurate number of plants: **Done**
- empty entries enable **Done**
- watering rooms **Done**
- overdue watering=> red border of cards or red tint=> custom attributes
- Camera issues promises **Not Solved, talked to PInal regarding a solution.**
- On press cancel, water, etc... colors.accent
- Fix days 8.0 to 8 **Done** Data base updated to Integer for Days
- Create ascreen recording to demo the application **Done**
- README file for GitHub **Done**
- Code Clean up - never ending...
