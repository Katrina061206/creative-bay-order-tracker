# PROJECT BRIEF
## Creative Bay Order Tracker

### 1. Project Overview
Creative Bay Order Tracker is a simple, one-page web application designed to help Creative Bay organize, record, and monitor customer orders.

The application will provide an organized way to manage orders instead of relying entirely on handwritten notes and chat messages.

### 2. Community
Creative Bay small business.

### 3. Problem Statement
In Creative Bay, the small business owner struggles to monitor customer orders and their completion status because orders are often recorded through messages and manual notes. A web page where the business owner can add, view, and update customer orders would help organize daily transactions and prevent forgotten or delayed orders.

### 4. Project Objective
To develop a simple and user-friendly web application that allows the business owner to record customer orders and monitor their progress.

### 5. Functional Requirement

**FR-01: Customer Order Recording and Monitoring**

The business owner can add and manage customer orders by entering the following information:

- Customer Name
- Order Description
- Quantity
- Order Date
- Order Status (Pending, Processing, or Completed)

### 6. Acceptance Criteria

1. The system must allow the user to add an order with a customer name, order description, quantity, and order date.
2. The system must reject blank required fields, non-positive or non-whole quantities, invalid calendar dates, and future order dates.
3. The system must display saved orders in an organized list.
4. The system must allow the user to update an order's status (Pending, Processing, or Completed).
5. Saved orders must remain available after refreshing the browser using localStorage.

### 7. Technologies

- HTML5 – Web page structure
- CSS3 – Application design and layout
- JavaScript – Application functionality and validation
- Browser localStorage – Local data persistence

### 8. Application Scope

The initial application will include:

- A simple order dashboard.
- An order entry form.
- An organized customer order list.
- Order status management.
- Input validation.
- Local storage of order records.

### 9. Limitations

- The application will use only one HTML page.
- Data will be stored in the browser's localStorage.
- No server-side programming or database is required.
- No login or registration system will be included.
- The application is intended for local demonstration.
- Fictional customer information will be used during testing and demonstration.

### 10. Privacy and Data Protection

The project will use made-up customer information for demonstration purposes and will avoid collecting real personal data, in consideration of the Data Privacy Act of 2012 (RA 10173).

### 11. Future Enhancement

Additional functionality may be introduced as a second feature through a GitHub pull request after completing the initial FR-01 implementation.