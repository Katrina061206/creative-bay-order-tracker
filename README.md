# Creative Bay Order Tracker

## About the Project

Creative Bay Order Tracker is a simple community web application designed to help the Creative Bay small business organize, record, and monitor customer orders. It provides a centralized place to manage order information, track service categories, and monitor order progress.

## Community Problem

The business owner struggles to organize and monitor customer orders because orders are manually recorded through chat messages and written notes. This makes it difficult to find specific orders, keep track of order details, and monitor the progress of each transaction.

## Problem Solution

The Creative Bay Order Tracker provides a simple web application where the business owner can record, view, search, edit, and update customer orders in one organized place. It also provides a dashboard to help monitor order status and business activity.

## Services Covered

The application supports the following Creative Bay services:

- ID Picture and Photography
- Printing Services
- Customized Designs and Layouts
- Tarpaulin and Banner Printing
- School and Office Documents

## Run the Application

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a modern web browser.

Order data is stored in the browser's `localStorage` and is not automatically shared with other devices or browsers.

The application uses:

- `index.html` for the page structure.
- `style.css` for the visual design.
- `script.js` for application functionality.

## Functional Requirements

### FR-01: Customer Order Recording and Monitoring

The business owner can add, view, search, edit, and manage customer orders using the following information:

- Customer Name
- Service Category
- Order Details
- Quantity
- Order Date
- Order Status (Pending, Processing, Completed)

### FR-02: Business Dashboard and Sales Analytics

The application provides a dashboard that helps the business owner monitor business activity through order statistics and sales-related information.

## Acceptance Criteria

1. The application allows the owner to add customer orders with all required information.
2. The application provides the five available service categories.
3. The application displays saved customer orders in an organized table.
4. The owner can edit existing customer orders.
5. The application allows searching for orders using customer names, service categories, and order details.
6. Blank customer names and order descriptions are rejected.
7. Quantity must be a positive whole number.
8. Invalid calendar dates and future order dates are rejected.
9. The owner can update an order's status to Pending, Processing, or Completed.
10. The dashboard reflects changes in order status.
11. Saved orders remain available after refreshing the browser using `localStorage`.

## Technologies

- HTML5
- CSS3
- JavaScript
- Browser localStorage

## Privacy

This project uses fictional sample data for demonstration purposes. No real customer personal information is used.

## Project Version

v0.1.0 (to be tagged after completing the lab steps).
