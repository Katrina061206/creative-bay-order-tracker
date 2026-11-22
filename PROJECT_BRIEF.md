# PROJECT BRIEF
## Creative Bay Order Tracker

### 1. Project Overview

Creative Bay Order Tracker is a simple, one-page web application designed to help Creative Bay organize, record, and monitor customer orders.

The application provides an organized way to manage customer orders instead of relying entirely on handwritten notes and chat messages. It also includes a business dashboard to help monitor order activity and sales-related information.

### 2. Community

Creative Bay small business.

### 3. Problem Statement

The Creative Bay small business owner struggles to monitor customer orders and their completion status because orders are often recorded through messages and manual notes. This makes it difficult to organize order details, search for specific transactions, and monitor the progress of each order.

A simple web application where the business owner can record, view, search, edit, and update customer orders would help organize daily transactions and reduce forgotten or delayed orders.

### 4. Project Objective

To develop a simple and user-friendly web application that allows the business owner to manage customer orders, monitor their progress, and view business activity through an organized dashboard.

### 5. Functional Requirements

**FR-01: Customer Order Recording and Monitoring**

The business owner can add, view, search, edit, and manage customer orders using the following information:

- Customer Name
- Service Category
- Order Details
- Quantity
- Order Date
- Order Status (Pending, Processing, or Completed)

The application supports the following service categories:

1. ID Picture and Photography
2. Printing Services
3. Customized Designs and Layouts
4. Tarpaulin and Banner Printing
5. School and Office Documents

**FR-02: Business Dashboard and Sales Analytics**

The application provides a business dashboard that helps the owner monitor order activity through order statistics, status counts, and sales-related information.

### 6. Acceptance Criteria

1. The system must allow the user to add an order with a customer name, service category, order details, quantity, and order date.
2. The system must reject blank required fields, non-positive or non-whole quantities, invalid calendar dates, and future order dates.
3. The system must display saved orders in an organized table.
4. The system must allow the user to search for orders using customer names, service categories, and order details.
5. The system must allow the user to edit existing customer orders.
6. The system must allow the user to update an order's status (Pending, Processing, or Completed).
7. The dashboard must reflect changes in order status and display the implemented business statistics.
8. Saved orders must remain available after refreshing the browser using localStorage.

### 7. Technologies

- HTML5 – Web page structure
- CSS3 – Application design and layout
- JavaScript – Application functionality and validation
- Browser localStorage – Local data persistence

### 8. Application Scope

The application includes:

- A business dashboard.
- An order entry form.
- Five Creative Bay service categories.
- An organized customer order table.
- Order searching and editing.
- Order status management.
- Input validation.
- Local storage of order records.
- Order statistics and sales-related information.

### 9. Limitations

- The application will use only one HTML page.
- Data will be stored in the browser's localStorage.
- No server-side programming or database is required.
- No login or registration system will be included.
- The application is intended for local demonstration.
- Fictional customer information will be used during testing and demonstration.
- Order data is not automatically synchronized across different devices or browsers.

### 10. Privacy and Data Protection

The project will use made-up customer information for demonstration purposes and will avoid collecting real personal data, in consideration of the Data Privacy Act of 2012 (RA 10173).

### 11. Future Enhancement

Future improvements may include additional order management tools, improved reporting, and other business features depending on the needs of Creative Bay.

