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
- Unit Price
- Order Total, calculated automatically as quantity × unit price
- Order Date
- Order Status (Pending, Processing, Completed)

The unit price must be greater than zero and may have up to two decimal places. The order total is calculated as the quantity multiplied by the unit price.

### FR-02: Business Dashboard and Sales Analytics

The dashboard displays total orders and Pending, Processing, and Completed order counts, along with recent orders and their status breakdown. Sales analytics include total revenue from completed orders with a valid unit price, today's sales from such orders dated today, units sold in completed orders with a valid unit price, and average order value for completed orders with a valid unit price. A revenue trend can be viewed by day, week, or month, and the best-selling products are ranked by quantities in completed orders with a valid unit price.

These figures are calculated from the order details and prices entered in the application; they are not payment or accounting records.

## Acceptance Criteria

1. The application allows the owner to add customer orders with all required information, including a positive unit price.
2. The application provides the five available service categories.
3. The application calculates the order total by multiplying quantity by unit price and displays saved orders in an organized table.
4. The owner can edit existing customer orders.
5. The application allows searching for orders using customer names, service categories, and order details.
6. Blank customer names and order descriptions are rejected.
7. Quantity must be a positive whole number, and unit price must be greater than zero with no more than two decimal places.
8. Invalid calendar dates and future order dates are rejected.
9. The owner can update an order's status to Pending, Processing, or Completed.
10. The dashboard reflects changes in order status and its analytics use completed orders with a valid unit price.
11. The dashboard and analytics display completed-order revenue, today's sales, units sold, average order value, revenue trends by day/week/month, and best-selling products by quantity, using completed orders with a valid unit price.
12. Saved orders remain available after refreshing the browser using `localStorage`.

## Technologies

- HTML5
- CSS3
- JavaScript
- Browser localStorage

## Privacy

This project uses fictional sample data for demonstration purposes. No real customer personal information is used.

## Project Version

v0.1.0
