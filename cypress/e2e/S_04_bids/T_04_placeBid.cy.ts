describe("Search car offer", () => {

    beforeEach(() => {
        cy.session("editSession", () => {
            cy.loginWithAuth0()
        });

    })

    it("visits search page and searches for a specific car offer", () => {
        cy.visit('/search/auction?')
        cy.get('.justify-center > .form-button').click()
        cy.get('[href="/auction/offer/663dfe5d7ae03002f10221eb"] > .offer-element').click()

        cy.wait(1000)

        cy.get('.text-3xl').then(($el) => {
            const text = $el.text().split(" ")[0]

            cy.get('input').type((parseInt(text)+10).toString())

            cy.get('.p-1').click()

            cy.wait(1000)

            cy.contains((parseInt(text)+10).toString())
        })
    })

})

export {}