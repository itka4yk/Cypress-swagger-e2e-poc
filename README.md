# PoC of Swagger e2e tests using Cypress.io 

There are three commands created to ensure code reusability:
```ts
cy.getSwaggerSection(sectionName);

cy.executeSwaggerRoute(routeName, methodName);

cy.shouldReceiveStatus(statusCode);
```

So that test suite can be the following:
```ts
cy.getSwaggerSection('store')
  .executeSwaggerRoute('/store/inventory', 'GET')
  .shouldReceiveStatus('200');
```

In order to reduce boilerplate code we can imrove our tests with dynamic test suite's arguments:
```ts
  [
    ['store', '/store/inventory', 'GET', '200'],
    ['user', '/user', 'POST', '200'],
    ['user', '/user/logout', 'GET', '200'],
  ].forEach(([section, route, method, statusCode]) => {
    describe(`When scroll to section: ${section}`, () => {
      describe(`And execute ${method} on route ${route}`, () => {
        it(`Should return status code: ${statusCode}`, () => {
          cy.getSwaggerSection(section)
            .executeSwaggerRoute(route, method)
            .shouldReceiveStatus(statusCode);
        });
      });
    });
  });
```

It we will produce some BDD-style report

```
Swagger
    When scroll to section: store
    And execute GET on route /store/inventory
    Should return status code: 200passed
    
    When scroll to section: user
    And execute POST on route /user
    Should return status code: 200passed
    
    When scroll to section: user
    And execute GET on route /user/logout
    Should return status code: 200
```