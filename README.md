# SwagLabs-Automation

## Overview

This project aims to develop an automated test suite for the Sauce Labs demo website. The test suite covers the customer flow of selecting 3 random items and completing the checkout process. The framework is designed using Typescript with Playwright, a popular automation tool. Assertions are included to verify the correctness of user actions, and reporting mechanisms provide clear feedback on test results.

## Prerequisites

Before running the automated tests, ensure you have the following installed:

- Node.js
- npm

## Instructions

To install the dependencies required for this project, follow these steps:

1. Clone the repository:

```bash
git clone <https://github.com/AshutoshGunjal/SwagLabs-Automation.git>
```

2. Install Dependencies:

```
npm install
```

This command installs all the necessary packages defined in package.json, including Playwright and other dependencies.

## Folder Structure

Explain the structure of your project directory and the purpose of each folder:

![diagram (2)](https://github.com/AshutoshGunjal/SwagLabs-Automation/assets/43187740/34387e5e-825a-4da8-b865-71fe8e15c6f0)

## Running Tests

To run the automated tests, execute the following command:

```
npx playwright test
```

This command runs the tests defined in the 'tests' directory using Playwright and generates reports in JSON and HTML formats as configured.

## Reporting

The test results are outputted in HTML formats, providing clear feedback on the test execution status and results.
