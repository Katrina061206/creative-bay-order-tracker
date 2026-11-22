
# Creative Bay Order Tracker

## About the Project

Creative Bay Order Tracker is a simple community web application designed to help the Creative Bay small business organize and monitor customer orders.

## Community Problem

The business owner struggles to organize and monitor customer orders because orders are manually recorded through chat messages and written notes. This makes it difficult to track order details and monitor order progress.

## Problem Solution

A simple web application where the business owner can record, view, and update customer orders in one organized place.

## Run the Application

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a modern web browser.

Order data is stored in the browser's localStorage and is not automatically shared with other devices or browsers.

The application uses:
- `index.html` for the page structure.
- `style.css` for the visual design.
- `app.js` for application functionality.

## Functional Requirement

### FR-01: Customer Order Recording and Monitoring

The business owner can add and manage customer orders using the following information:

- Customer Name
- Order Description
- Quantity
- Order Date
- Order Status (Pending, Processing, Completed)

## Acceptance Criteria

1. The application allows the owner to add customer orders with all required information.
2. The application displays saved customer orders in an organized list.
3. Blank customer names and order descriptions are rejected.
4. Quantity must be a positive whole number.
5. Invalid calendar dates and future order dates are rejected.
6. The owner can update an order's status to Pending, Processing, or Completed.
7. Saved orders remain available after refreshing the browser using localStorage.

## Technologies

- HTML5
- CSS3
- JavaScript
- Browser localStorage

## Privacy

This project uses fictional sample data for demonstration purposes. No real customer personal information is used.

## Project Version

v0.1.0 (to be tagged after completing the lab steps).
