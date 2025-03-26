# Amazon Automation Testing Framework

This repository contains automated tests for Amazon website using Playwright and TypeScript.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (if using containerized approach)

## Local Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   BASE_URL=https://www.amazon.com
   USERNAME=your_amazon_email
   PASSWORD=your_amazon_password
   NAME=your_name_on_amazon
   ```

## Running Tests

### Run Smoke Tests Locally

To run all tests with the "@smoke" tag:

```bash
npx playwright test --grep "@smoke"
```

### Run Specific Test File

```bash
npx playwright test tests/path/to/test.spec.ts
```

### Run Tests with UI Mode

```bash
npx playwright test --ui
```

### Run Tests with Different Browser

```bash
npx playwright test --project=chromium  # or firefox, webkit
```

## Docker Approach

### Build Docker Image

```bash
docker build -t amazon-tests .
```

### Run Tests in Docker

```bash
docker run --rm -e USERNAME=your_amazon_email -e PASSWORD=your_amazon_password -e NAME=your_name_on_amazon amazon-tests
```

### Run Tests with Volume Mounted for Reports

```bash
docker run --rm \
  -e USERNAME=your_amazon_email \
  -e PASSWORD=your_amazon_password \
  -e NAME=your_name_on_amazon \
  -v $(pwd)/test-results:/app/test-results \
  amazon-tests
```

## Test Structure

- `Models/` - Page object models and component classes
- `tests/` - Test files organized by feature
- `.env` - Environment variables (not tracked in git)

## Important Notes

1. The "@smoke" tag is used to mark essential tests that verify core functionality.
2. When running tests that interact with Amazon, be aware of potential CAPTCHA challenges.
3. Never commit your Amazon credentials to the repository.
4. Some tests may be sensitive to timing issues, especially when running in CI/CD environments.

## Troubleshooting

- If encountering CAPTCHA issues, try:
  - Running tests less frequently
  - Using a stable IP address
  - Implementing a CAPTCHA solving solution

- For timeout errors:
  - Increase the timeout value: `test.setTimeout(120 * 1000)`
  - Add more explicit waits in problematic areas

to run Prettier to whole project use: npm run format
to run Prettier to specific folder use: npx prettier --write src/
to run Prettier to specific file use: npx prettier --write src/index.ts


to run specific spec file with browser use: npx playwright test tests/SignIn/signin.spec.ts --headed


You can filter the tests based on the tag you add in the test name using Playwright's --grep option. For example, if you want to run only the @smoke tests, you can do it like this:
 npx playwright test tests/Delivery/delivery.spec.ts --grep "@smoke" --headed

 npx playwright test tests/Delivery/delivery.spec.ts --grep "@(smoke|P1)" --headed

except:
npx playwright test tests/Delivery/delivery.spec.ts --grep-invert "@smoke" --headed

All tests @smoke:
npx playwright test --grep "@smoke" --headed

All tests @smoke and @P1
npx playwright test --grep "@(smoke|P1)" --headed

exclude @smoke
npx playwright test --grep-invert "@smoke" --headed