describe("Search car offer", () => {

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

        cy.get("button").contains("Search").click();

        cy.contains("golf")
        cy.contains("1999")
        cy.contains("650")
    })

    it("visits main page and tests searchParameters", () => {
        cy.visit("/")
        cy.get(':nth-child(6) > .block').should("not.exist")
        cy.get('.show-all-fields').click()
        cy.get(':nth-child(6) > .block').should("exist")
    })

    it("test inputing wrong data", () => {
        cy.visit("/search/cars?")
        cy.get('[name="year_min"]').type("a")
        cy.get('[name="year_min"]').should("have.value", "")
        cy.get('[name="year_max"]').type("a")
        cy.get('[name="year_max"]').should("have.value", "")

        cy.get('[name="price_min"]').type("a")
        cy.get('[name="price_min"]').should("have.value", "")
        cy.get('[name="price_max"]').type("a")
        cy.get('[name="price_max"]').should("have.value", "")

        cy.get('[name="engine_capacity_min"]').type("a")
        cy.get('[name="engine_capacity_min"]').should("have.value", "")
        cy.get('[name="engine_capacity_max"]').type("a")
        cy.get('[name="engine_capacity_max"]').should("have.value", "")

        cy.get("button").contains("Search").click();
    })

    it("tests pagination", () => {
        cy.visit("/search/cars?")
        cy.get("button").contains("Search").click();
        cy.contains("cygaro")
        cy.get("button").contains("2").click()
        cy.contains("car")
    })

    it("tests multiple searches after eachother", () => {
        cy.visit("/search/cars?")
        cy.get('input[name="year_min"]').type("1999");
        cy.get('input[name="year_max"]').type("1999");
        cy.get('[name="mileage_min"]').type("400000")
        cy.get("button").contains("Search").click();
        cy.contains("golf")
        cy.contains("Śmietnik")

        cy.get('input[name="year_min"]').clear().type("1988");
        cy.get('input[name="year_max"]').clear().type("1988");
        cy.get('[name="mileage_min"]').clear()
        cy.get("button").contains("Search").click();
        cy.contains("project car")

        cy.get('input[name="year_min"]').clear().type("1999");
        cy.get('input[name="year_max"]').clear().type("1999");
        cy.get("button").contains("Search").click();
        cy.contains("1999 mercury grandma keith v8")

    })
})

export {}