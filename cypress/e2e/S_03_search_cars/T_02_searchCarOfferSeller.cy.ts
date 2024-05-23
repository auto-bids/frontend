describe("Search car offer seller", () => {

        it("visits search page and searches for a specific car offer", () => {
            cy.visit('/search/cars?')
            cy.get('input[name="make"]').type("Volkswagen");
            cy.get("div[role='listbox']").should("be.visible");
            cy.get("div[role='listbox']").contains("Volkswagen").click();

            cy.get('input[name="model"]').type("Golf");
            cy.get("div[role='listbox']").should("be.visible");
            cy.get("div[role='listbox']").contains("Golf").click();

            cy.get('input[name="year_min"]').type("1999");
            cy.get('input[name="year_max"]').type("1999");

            cy.get('.justify-center > .form-button').click()
            cy.get('.justify-center > .form-button').click()

            cy.wait(1000)

            cy.get('.offer-element').click()

            cy.get("button").contains("View Seller Profile").click()
            cy.contains("project car")
        })
})

export {};