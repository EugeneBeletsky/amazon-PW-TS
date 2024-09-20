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