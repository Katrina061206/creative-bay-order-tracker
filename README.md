
# Creative Bay Order Tracker

## About the Project
Creative Bay Order Tracker is a simple community web application designed to help Creative Bay organize and monitor customer orders.

## Community Problem
The business owner struggles to organize and monitor customer orders because orders are manually recorded through chat messages and written notes. This makes it difficult to track order details and monitor order progress.

## Problem Solution
A simple web page where the business owner can record, view, and monitor customer orders.

## Run the Application
Open `index.html` in a modern browser. Order data is stored in that browser's localStorage and is not shared with other devices.

The page structure, styles, and behavior are kept in `index.html`, `styles.css`, and `app.js`, respectively.

## Functional Requirement

### FR-01: Customer Order Recording and Monitoring

The business owner can add and update customer orders using the following information:
- Customer Name
- Order Description
- Quantity
- Order Date
- Order Status

## Acceptance Criteria
1. The application allows the owner to add and view customer orders.
2. The owner can edit order details and update the status to Pending, Processing, or Completed.
3. Blank customer names and order descriptions are rejected.
4. Quantity must be a positive whole number from 1 to 9999.
5. Invalid calendar dates and future order dates are rejected.
6. Saved orders remain available after refreshing the browser using localStorage.

## Technologies
- HTML
- CSS
- JavaScript
- Browser localStorage

## Privacy
This project uses fictional sample data for demonstration purposes. No real customer personal information is used.

## Project Version
v0.1.0 (to be tagged after completing the lab steps)
