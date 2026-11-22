
# Creative Bay Order Tracker
## FR-01 – Customer Order Recording and Monitoring
### Formal Test Cases

| Test ID | Test Scenario | Test Data / Action | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-01 | Add a valid customer order | Name: Maria Santos; Description: Custom Keychain; Quantity: 2; Date: Today; Status: Pending | Order is added and displayed in the order list. | Not tested | Pending |
| TC-02 | Reject a blank customer name | Leave customer name empty and complete the other fields. | Application rejects the order and displays a validation message. | Not tested | Pending |
| TC-03 | Reject a blank order description | Leave description empty and complete the other fields. | Application rejects the order and displays a validation message. | Not tested | Pending |
| TC-04 | Reject invalid quantities | Try 0, -1, and 1.5 as the quantity. | Application rejects zero, negative, and decimal quantities. | Not tested | Pending |
| TC-05 | Reject invalid or future dates | Try an invalid date and a date after today. | Application rejects invalid and future order dates. | Not tested | Pending |
| TC-06 | Update order status | Change an existing order from Pending to Processing, then Completed. | The selected status is updated and displayed correctly. | Not tested | Pending |
| TC-07 | Preserve orders after refresh | Add an order, refresh the browser, and check the order list. | Previously saved orders remain displayed. | Not tested | Pending |
| TC-08 | Check application structure | Inspect index.html, style.css, and script.js. | The app uses one HTML page, external CSS and JavaScript, and browser localStorage. | Not tested | Pending |

## Test Summary

- Total Test Cases: 8
- Passed: 0
- Failed: 0
- Pending: 8

## Testing Notes

Record the actual result after performing each test. Mark each test as PASS or FAIL based on the observed result.
