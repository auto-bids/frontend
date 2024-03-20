/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
    namespace Cypress {
        interface Chainable {
            loginWithAuth0(): Chainable,
        }
    }
}

Cypress.Commands.add("loginWithAuth0", () => {
    const email = Cypress.env('USER_EMAIL');
    const password = Cypress.env('USER_PASSWORD');
    cy.visit('/');
    cy.get('button').contains('Register/Login').click();
    cy.url().should('include', '/register'); // #1

    cy.get('a').contains('Login with Google').click();

    cy.origin('https://dev-wgrfncmy5tahnvay.us.auth0.com', {args: {email, password}},
        ({email, password}) => {
            cy.get('input[name="username"]').type(email);
            cy.get('input[name="password"]').type(password);
            cy.get('button[name="action"]').click();
        });

    cy.url().should('include', '/account'); // #2
    cy.contains(email); // #3
});

export {}
