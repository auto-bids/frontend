describe("Edit Auction Offer", () => {

    beforeEach(() => {
        cy.session("editSession", () => {
            cy.loginWithAuth0()
        });

    })

    it("should remove offer", () => {
        cy.visit('/account')
        cy.get('.account-offers > .border').select("auction")
        cy.get('.col-span-1 > .bg-red-500').click()
        cy.on('window:confirm', () => true);
        cy.reload()
        cy.get('.account-offers > .border').select("auction")
        cy.get('.col-span-1 > .bg-red-500').should('not.exist')
    });

})

export {}