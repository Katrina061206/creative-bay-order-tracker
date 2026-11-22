# Prompt Log – Creative Bay Order Tracker

## Project Information

- **App Name:** Creative Bay Order Tracker
- **Community:** Creative Bay small business
- **Main Feature:** FR-01 – Customer Order Recording and Monitoring
- **Additional Feature:** FR-02 – Business Dashboard and Sales Analytics
- **Development Tools:** ChatGPT and GitHub Copilot Agent Mode

## Existing Prompt and Activity Summaries

**Verification note:** The six numbered summaries below are retained from the existing log; they are not a confirmed count of all prompts or proof that each entry corresponds to exactly one prompt. Current project files can confirm that described features exist, but cannot independently verify original prompt wording, chronology, tool attribution, reviews, or historical test results. Those details are retained as previously reported, not independently verified here. The exact original prompt text is not available in the project files. GitHub push and pull-request claims in Prompt 6 are also not verified by the application files.

### Prompt 1 – Initial FR-01 Application

- **Purpose:** Generate the initial Creative Bay Order Tracker application.
- **Feature:** FR-01 – Customer Order Recording and Monitoring.
- **Tool:** GitHub Copilot Agent Mode.
- **Files generated:** `index.html`, `style.css`, `script.js`.
- **Prompt summary:** A six-line prompt requesting an order management application with customer order recording and monitoring functionality.
- **Review:** Opened and reviewed the generated application in a browser.
- **Testing result:** Initial FR-01 functionality was tested. Refer to `TEST_CASES.md`.

### Prompt 2 – Add Creative Bay Service Categories

- **Purpose:** Customize the application based on the actual services offered by Creative Bay.
- **Tool:** ChatGPT and GitHub Copilot Agent Mode.
- **Changes requested:**
  - Add a service category dropdown.
  - Include the five Creative Bay service categories:
    1. ID Picture and Photography
    2. Printing Services
    3. Customized Designs and Layouts
    4. Tarpaulin and Banner Printing
    5. School and Office Documents
  - Change the order description field to order details.
  - Display the selected service category in the order table.
- **Files affected:** `index.html`, `script.js`.
- **Review:** Checked the dropdown options and verified that selected categories appeared in the order table.
- **Testing result:** Service category selection and display were tested successfully.

### Prompt 3 – Review and Fix Application Functionality

- **Purpose:** Review the JavaScript code and correct issues after adding service categories.
- **Tool:** ChatGPT and GitHub Copilot Agent Mode.
- **Changes requested:**
  - Correct the form validation structure.
  - Add service category validation.
  - Update order searching to include service categories.
  - Remove an unused predefined products array from the editing function.
  - Check that the table headings match the displayed order information.
- **File affected:** `script.js`.
- **Review:** Tested the corrected application in the browser.
- **Testing result:** Adding, editing, searching, updating order status, and localStorage persistence were tested successfully.

### Prompt 4 – Add FR-02 Business Dashboard and Sales Analytics

- **Purpose:** Extend the application with a business dashboard and sales analytics.
- **Feature:** FR-02 – Business Dashboard and Sales Analytics.
- **Tool:** GitHub Copilot Agent Mode.
- **Changes requested:**
  - Add a Business Dashboard.
  - Display Pending, Processing, and Completed order counts.
  - Add a Sales Analytics Summary.
  - Display relevant order and sales information.
  - Connect dashboard statistics with recorded order data.
- **Files affected:** `index.html`, `style.css`, `script.js`.
- **Review:** Checked the dashboard and analytics sections in the browser.
- **Testing result:** Dashboard statistics and sales summaries were reviewed.

### Prompt 5 – Prepare and Update Project Documentation

- **Purpose:** Prepare the documentation required for the Lab 1 project.
- **Tool:** ChatGPT.
- **Changes requested:**
  - Document the community problem and project solution.
  - Describe FR-01 and FR-02.
  - Prepare formal test cases.
  - Record testing results.
  - Update the project brief and README.
  - Organize the prompt history.
- **Files affected:** `README.md`, `PROJECT_BRIEF.md`, `TEST_CASES.md`, `PROMPT_LOG.md`.
- **Review:** Checked the documentation for consistency with the implemented application.
- **Testing result:** Documentation was reviewed against the completed project.

### Prompt 6 – Git and GitHub Project Setup

- **Purpose:** Organize the project using Git and GitHub.
- **Tool:** ChatGPT and Git.
- **Activities:**
  - Initialize and manage the local Git repository.
  - Organize project branches.
  - Create a feature branch for FR-02.
  - Create and merge a pull request into the main branch.
  - Create and push the `v0.1.0` version tag.
- **Files affected:** Project repository and version history.
- **Review:** Checked the GitHub repository, merged pull request, and pushed version tag.
- **Testing result:** Project changes and version tag were successfully pushed to GitHub.

## Additional Project Documentation

The following files support the project:

- `README.md` – Project overview, community problem, solution, functional requirements, and acceptance criteria.
- `PROJECT_BRIEF.md` – Project objectives, scope, features, and requirements.
- `TEST_CASES.md` – Formal test cases and testing results.
- `PROMPT_LOG.md` – Record of prompts and AI-assisted development activities.

## Prompt Logging Reminder

For future logging, add one entry for each confirmed AI prompt used to develop, fix, improve, or document the application. Do not treat the existing six summaries as a confirmed complete prompt history.

Each entry should include:

- Prompt number and title.
- Purpose of the prompt.
- Tool used.
- Changes requested.
- Files affected.
- Review and testing results.

**Note:** The summaries above describe reported development activities and are not the exact original wording entered into ChatGPT or GitHub Copilot. Include original prompt text only when available; otherwise label the entry as a summary and leave unknown details unclaimed.