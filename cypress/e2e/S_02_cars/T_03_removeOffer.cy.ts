describe('Remove Offer', () => {
    it('should remove offer', () => {
        cy.loginWithAuth0()
        cy.visit('/account')
        cy.get('.col-span-1 > .bg-red-500').click()
        cy.on('window:confirm', () => true);
        cy.reload()
        cy.get('.col-span-1 > .bg-red-500').should('not.exist')
    })
})

export {};