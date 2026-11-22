# Prompt Log – Creative Bay Order Tracker

## Project Information

- App Name: Creative Bay Order Tracker
- Community: Creative Bay small business
- Main Feature: Customer Order Recording and Monitoring
- Additional Feature: Business Dashboard and Sales Analytics

## Prompt History

### Prompt 1 – Initial FR-01 Application

- Purpose: Generate the initial Creative Bay Order Tracker application.
- Feature: FR-01 – Customer Order Recording and Monitoring.
- Tool: GitHub Copilot Agent Mode.
- Files generated: `index.html`, `style.css`, `script.js`.
- Prompt: Six-line FR-01 prompt used in Copilot.
- Review: The generated application was opened and reviewed in a browser.
- Testing result: Refer to the original FR-01 test results in `TEST_CASES.md`.

### Prompt 2 – Add Creative Bay Service Categories

- Purpose: Customize the application based on the actual services offered by Creative Bay.
- Changes requested:
  - Add a service category dropdown.
  - Include the five Creative Bay service categories.
  - Change the order description field to order details.
  - Display the selected service category in the order table.
- Files affected: `index.html`, `script.js`.
- Review: Checked the dropdown options and verified that selected categories appeared in the order table.
- Testing result: Service category selection and display were tested successfully.

### Prompt 3 – Review and Fix Application Functionality

- Purpose: Review the JavaScript code and correct issues after adding service categories.
- Changes made:
  - Corrected the form validation structure.
  - Added service category validation.
  - Updated order searching to include service categories.
  - Removed an unused predefined products array from the editing function.
  - Checked that the table headings matched the displayed order information.
- File affected: `script.js`.
- Review: The corrected application was tested in the browser.
- Testing result: Adding, editing, searching, updating order status, and localStorage persistence were tested successfully.

## Additional Documentation

The following project documentation was prepared and updated:

- `README.md` – Project overview, community problem, solution, functional requirements, and acceptance criteria.
- `TEST_CASES.md` – Formal test cases and testing results.

## Future Prompts

Record every additional prompt used to develop, fix, or improve the application. Include the prompt's purpose, the changes made, affected files, and testing results.
