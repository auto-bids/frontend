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

        cy.get('.offer-page-main-seller > a > .bg-teal-500').click()

        cy.get('.seller-page-buttons > .px-4').click()

        cy.contains("1234")

        cy.get("textarea").type("123")

        cy.get("button").contains("Send").click()

        cy.wait(1000)

        cy.get(':nth-child(12) > .justify-end > .flex > .lazy-load-image-background > .w-10')

    })

})

export {}
