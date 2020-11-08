/// <reference types="cypress" />

context('Swagger e2e', () => {
  beforeEach(() => {
    cy.visit('https://petstore.swagger.io').wait(1000)
  });

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
})
