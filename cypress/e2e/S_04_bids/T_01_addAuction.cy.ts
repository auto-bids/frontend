describe("createNewAuction", () => {
    beforeEach(() => {
        if (!Cypress.currentTest?.title.includes("not logged in")) {
            cy.session("loggedIn", () => {
                cy.loginWithAuth0()
            })
        }
        cy.visit("/new-listing");
    });


    describe("form validation", () => {
        beforeEach(() => {
            cy.get('.App > :nth-child(2) > :nth-child(1) > :nth-child(2)').click()
        });

        it("should display dateErrors", () => {
            cy.get("#start").clear().type("2022-01-01T00:00");
            cy.contains("Start date must be in the future");
            cy.get("#end").clear().type("2021-01-01T00:00");
            cy.contains("End date must be after start date");
        })
    });

    it("should submit the form with valid data", () => {
        cy.get('.App > :nth-child(2) > :nth-child(1) > :nth-child(2)').click()
        cy.get("#title").type("Test Car 1");

        cy.get('input[name="make"]').type("Toyota");
        cy.get("div[role='listbox']").should("be.visible");
        cy.get("div[role='listbox']").contains("Toyota").click();

        cy.get('input[name="model"]').type("Corolla");
        cy.get("div[role='listbox']").should("be.visible");
        cy.get("div[role='listbox']").contains("Corolla").click();
        cy.get("div[role='listbox']").contains("Corolla").click();

        cy.get("#description").type("This is a test car");
        cy.get("#year").clear().type("2020");
        cy.get("#mileage").clear().type("10000")
        cy.get("#engine_capacity").clear().type("2000")
        cy.get("#fuel").select("Gasoline")
        cy.get("#transmission").select("Automatic")
        cy.get("#steering").select("Left")
        cy.get("#type").select("Sedan")
        cy.get("#power").clear().type("100")
        cy.get("select#drive").select('Front').should("have.value", "Front")
        cy.get("#doors").clear().type("4")
        cy.get("#seats").clear().type("5")
        cy.get("#registration_number").type("123456")
        cy.get("#vin_number").clear().type("123456")
        cy.get("#first_registration").clear().type("2024-01-01")
        cy.get("#condition").select("New")
        cy.get("#telephone_number").type("123456789")

        cy.get("#start").clear().type("2025-01-01T00:00");
        cy.get("#end").clear().type("2025-01-01T01:00");

        cy.get(".new-listing-form").submit();

        cy.contains("Search", {timeout: 10000}).should("be.visible");

        cy.wait(3000);

        cy.url().then(url => {
            const pathname = new URL(url).pathname;
            expect(pathname).to.equal("/");
        })

        cy.visit("/account");
        cy.get('.account-offers > .border').select("auction")
        cy.get("a").contains("Test Car 1");
    });

});


export {}