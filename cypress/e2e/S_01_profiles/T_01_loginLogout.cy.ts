// @ts-ignore
Cypress.config('experimentalSessionSupport', true)
Cypress.session.clearAllSavedSessions().then(r => {})

describe("Login and Logout", () => {

    beforeEach(() => {
        cy.session("loggedIn", () => {
            cy.loginWithAuth0()
        });
    });

    it("should login", () => {
    });

    it("should logout", () => {
        cy.visit('/')
        cy.get('button').contains('Your account').click()
        cy.get('button').contains('Logout').click()
        cy.url().should("include", "/")
        cy.contains("Register/Login")
    });
})

export {};