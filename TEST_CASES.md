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

## Additional FR-01 and FR-02 Test Cases

The following cases have been added to cover unit pricing and the implemented sales analytics. They have not yet been executed; their actual results remain unrecorded.

| Test ID | Test Scenario | Test Data / Action | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-13 | Validate unit price | Try a blank price, 0, a negative price, a value with more than two decimal places, and a valid positive price with up to two decimal places. | Blank, zero, negative, and over-precision prices are rejected; a valid price is accepted. | Not executed. | NOT RUN |
| TC-14 | Calculate order total automatically | Enter quantity 3 and unit price ₱12.50. | The order total updates to ₱37.50 (quantity × unit price). | Not executed. | NOT RUN |
| TC-15 | Calculate completed-order revenue | Create completed orders with valid unit prices totaling ₱200, plus Pending and Processing orders with other totals. | Total revenue includes the ₱200 completed-order total and excludes Pending and Processing orders. | Not executed. | NOT RUN |
| TC-16 | Calculate today's sales | Use a completed order with a valid unit price dated today, a completed order with a valid unit price dated yesterday, and a Pending order dated today. | Today's sales include only the completed order with a valid unit price dated today. | Not executed. | NOT RUN |
| TC-17 | Calculate units sold | Use completed orders with valid unit prices and quantities 2 and 3, plus a Pending order with quantity 4. | Units sold is 5; the Pending order is excluded. | Not executed. | NOT RUN |
| TC-18 | Calculate average order value | Use two completed orders with valid unit prices and totals ₱20 and ₱40, plus a Pending order. | Average order value is ₱30, calculated from completed orders with a valid unit price only. | Not executed. | NOT RUN |
| TC-19 | Display revenue trends | Select Daily, Weekly, and Monthly with completed orders with valid unit prices in the corresponding date ranges. | The chart changes grouping by selected period and shows completed-order revenue for the displayed date buckets. | Not executed. | NOT RUN |
| TC-20 | Rank best-selling products | Add completed orders with valid unit prices, repeated order details, and differing quantities, plus a Pending order with a high quantity. | Products are grouped by order details and ranked by quantity from completed orders with a valid unit price; the Pending order is excluded and no more than five products are shown. | Not executed. | NOT RUN |

## Test Summary

- Total Test Cases: 20
- Passed: 12
- Failed: 0
- Pending (not run): 8

## Overall Testing Result

The 12 original FR-01 test cases are recorded as passed. TC-13 through TC-20 have not been executed and are not included in the passed count.

## Testing and Improvement

- All 12 original test cases are recorded as passed.
- Corrected the form validation logic after adding the service category field.
- Updated the search function to include service categories.
- Removed outdated predefined product logic from the edit function.
- Verified that orders and updated statuses remain saved using localStorage.
- Added eight unexecuted test cases for unit pricing, order totals, and FR-02 sales analytics.

## Testing Notes

The 12 original test cases are recorded as executed using sample customer information and made-up order details. The eight additional cases are pending execution; no actual results are claimed for them.

The application structure was also verified to use one HTML page with external CSS and JavaScript files.