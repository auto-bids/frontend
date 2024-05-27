describe("Edit Auction Offer", () => {

    beforeEach(() => {
        cy.session("editSession", () => {
            cy.loginWithAuth0()
        });
        cy.visit('/account')
        cy.get('.account-offers > .border').select("auction")
        cy.get('.col-span-1 > .bg-blue-500').click()

    });

    it("should edit offer", () => {
        cy.get("textarea").clear().type("New description")
        cy.get('.max-w-xl > .flex > :nth-child(2)').click()
        cy.get("input#mileage").clear().type("123")
        cy.get('.max-w-xl > .bg-blue-500').click()

        cy.get("a").contains("Test Car 1").click();

        cy.get("p.offer-page-main-description-description").contains("New description")
        cy.get("p.offer-value").contains("123")
        cy.contains("Auction not started yet")
    })

})

export {}