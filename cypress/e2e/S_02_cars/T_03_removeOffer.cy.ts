describe('Remove Offer', () => {
    it('should remove offer', () => {
        cy.loginWithAuth0()
        cy.visit('/account')
        cy.get('button#deleteOfferButton').click()
        cy.on('window:confirm', () => true);
        cy.reload()
        cy.get('#deleteOfferButton').should('not.exist')
    })
})

export {};