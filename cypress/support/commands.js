// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getSwaggerSection', (sectionName) => {
  return cy.get(`[data-tag=${sectionName}]`)
    .then($el => {
      if (!$el.attr('data-is-open')) {
        cy.wrap($el).click();
      }
    }).parent();
});
Cypress.Commands.add('executeSwaggerRoute', { prevSubject: true }, (subject, routeName, method) => {
  return cy.wrap(subject).within(() => {
    cy.get(`[data-path="${routeName}"]`)
      .parent()
      .parent()
      .click()
      .within(() => {
        cy.get('button').contains('Try it out ').click();
        cy.get('button').contains('Execute').click();
      });
  });;
});
Cypress.Commands.add('shouldReceiveStatus', { prevSubject: true }, (subject, statusCode) => {
  cy.wrap(subject)
    .contains('Server response')
    .parent()
    .within((response) => {
      cy.wrap(response).contains(statusCode);
    });
});