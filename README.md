# Timer Project README
## Overview
This project features a dynamic timer that counts seconds from 0 to 59, accompanied by a color-changing bar and a data grid for managing time intervals and associated colors.

## Key Components
   #### 1. Timer Display
   A digital timer that displays the current second count, updating in real-time from 0 to 59 seconds.
   #### 2. Colored Bar
   A visual bar that changes its color based on the current second and the defined intervals in the data grid.
   By default, the bar is white but dynamically changes color according to the defined intervals.
   #### 3. Data Grid
   Displays rows with the following columns: "From Seconds," "To Seconds," "Color," and "Delete Action."
   Allows users to manage (add, delete) time intervals and their associated colors.
   Provides a delete action for each row to remove unwanted intervals.
   #### 4. Form for Adding Intervals
   A form to add new time intervals with the following fields:
   From Seconds (0 to 59)
   To Seconds (greater than From Seconds, up to 59)
   Color (unique for each interval)
   Validates entries to ensure no overlapping intervals and unique colors.
   Restricts the number of rows in the grid to a maximum of 10.
   Functionality
   Users can monitor the current second through the timer.
   The colored bar reflects changes based on the time intervals defined in the grid.
   The data grid provides a clear overview and management of time intervals and their corresponding colors.
   The form facilitates the addition of new intervals, ensuring all entries meet the specified validation criteria.
   
# Commands
   Run `npm start` for a dev server.

   Run `npm run build` to build the project.

   Run `npm run test` to run unit tests.
