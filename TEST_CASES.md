# Creative Bay Order Tracker
## FR-01 – Customer Order Recording and Monitoring
### Formal Test Cases

| Test ID | Test Scenario | Test Data / Action | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-01 | Add a valid customer order | Enter valid customer and order information. | Order is added and displayed in the order list. | Order successfully added and displayed in the order list. | PASS |
| TC-02 | Reject a blank customer name | Leave customer name empty and complete the other fields. | Application rejects the order and displays a validation message. | Application rejected the order because the customer name was blank. | PASS |
| TC-03 | Reject a blank order description | Leave order details empty and complete the other fields. | Application rejects the order and displays a validation message. | Application rejected the order because the order details were blank. | PASS |
| TC-04 | Reject invalid quantities | Try 0, -1, and 1.5 as the quantity. | Application rejects zero, negative, and decimal quantities. | Application rejected all three invalid quantities. | PASS |
| TC-05 | Reject invalid or future dates | Try an invalid date and a date after today. | Application rejects invalid and future order dates. | Application successfully rejected both invalid and future dates. | PASS |
| TC-06 | Update order status | Change an existing order from Pending to Processing, then Completed. | The selected status is updated and displayed correctly. | Application successfully updated the order status. | PASS |
| TC-07 | Preserve orders after refresh | Add a sample order and refresh the browser. | Previously saved orders remain displayed. | The sample order remained visible after refreshing the browser. | PASS |
| TC-08 | Check application structure | Inspect index.html, style.css, and script.js. | The application uses one HTML page, external CSS and JavaScript files, and browser localStorage. | Confirmed one HTML page, separate CSS and JavaScript files, and localStorage implementation. | PASS |
| TC-09 | Select a service category | Select Tarpaulin and Banner Printing when adding an order. | The selected category is saved and displayed in the order table. | The selected category appeared correctly in the order table. | PASS |
| TC-10 | Edit an existing order | Edit Juan Dela Cruz's order and change its order details. | Order details are updated while the selected service category is retained. | Order details were updated successfully, and Printing Services remained selected. | PASS |
| TC-11 | Search by service category | Search for Printing Services and Tarpaulin. | Matching orders are displayed based on their service categories. | Both searches successfully displayed their matching orders. | PASS |
| TC-12 | Preserve updated status after refresh | Change an order from Pending to Processing and refresh the browser. | Updated status remains saved and displayed after refreshing. | Processing remained displayed after refreshing the browser. | PASS |

## Test Summary

- Total Test Cases: 12
- Passed: 12
- Failed: 0
- Pending: 0

## Overall Testing Result

PASS – All 12 documented FR-01 test cases passed.

## Testing and Improvement

- All 12 documented test cases passed.
- Corrected the form validation logic after adding the service category field.
- Updated the search function to include service categories.
- Removed outdated predefined product logic from the edit function.
- Verified that orders and updated statuses remain saved using localStorage.

## Testing Notes

All test cases were executed using sample customer information and made-up order details. The application correctly adds valid customer orders, rejects blank required fields, rejects invalid quantities and dates, manages service categories, edits existing orders, searches by category, updates order statuses, and preserves saved records after browser refresh using localStorage.

The application structure was also verified to use one HTML page with external CSS and JavaScript files.