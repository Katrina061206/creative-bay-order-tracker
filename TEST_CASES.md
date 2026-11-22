
# Creative Bay Order Tracker
## FR-01 – Customer Order Recording and Monitoring
### Formal Test Cases

| Test ID | Test Scenario | Test Data / Action | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-01 | Add a valid customer order | Name: Maria Santos; Description: Custom Keychain; Quantity: 2; Date: Today; Status: Pending | Order is added and displayed in the order list. | Order successfully added and displayed in the order list. | PASS |
| TC-02 | Reject a blank customer name | Leave customer name empty and complete the other fields. | Application rejects the order and displays a validation message. | Application rejected the order because the customer name was blank. | PASS |
| TC-03 | Reject a blank order description | Leave description empty and complete the other fields. | Application rejects the order and displays a validation message. | Application rejected the order because the order description was blank. | PASS |
| TC-04 | Reject invalid quantities | Try 0, -1, and 1.5 as the quantity. | Application rejects zero, negative, and decimal quantities. | Application rejected all three invalid quantities: 0, -1, and 1.5. | PASS |
| TC-05 | Reject invalid or future dates | Try an invalid date and a date after today. | Application rejects invalid and future order dates. | Application successfully rejected both the future date and invalid date. | PASS |
| TC-06 | Update order status | Change an existing order from Pending to Processing, then Completed. | The selected status is updated and displayed correctly. | Application successfully updated the order status from Pending to Processing and then to Completed. | PASS |
| TC-07 | Preserve orders after refresh | Add an order, refresh the browser, and check the order list. | Previously saved orders remain displayed. | Juan Dela Cruz's order remained visible after refreshing the browser. | PASS |
| TC-08 | Check application structure | Inspect index.html, style.css, and script.js. | The app uses one HTML page, external CSS and JavaScript, and browser localStorage. | Confirmed one HTML page, separate CSS and JavaScript files, and localStorage implementation. | PASS |


## Test Summary

- Total Test Cases: 8
- Passed: 8
- Failed: 0
- Pending: 0

## Overall Testing Result

PASS – All eight FR-01 test cases passed.

## Testing and Improvement

- All 8 FR-01 test cases passed.
- No failed test cases were found.
- No corrective code changes were necessary.

## Testing Notes

All test cases were executed successfully. The application correctly adds valid customer orders, rejects blank required fields, rejects invalid quantities and dates, updates order statuses, and preserves saved orders after browser refresh using localStorage.

The application structure was also verified to use one HTML page with external CSS and JavaScript files.
