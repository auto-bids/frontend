describe("createNewListing", () => {
    beforeEach(() => {
        if (!Cypress.currentTest?.title.includes("not logged in")) {
            cy.session("loggedIn", () => {
                cy.loginWithAuth0()
            })
        }
        cy.visit("/new-listing");
    });

    it("should display the form when logged in", () => {
        cy.get('.App > :nth-child(2) > :nth-child(1) > :nth-child(1)').click();
        cy.get(".new-listing-form").should("be.visible");
    });

    it("should not display the form when not logged in", () => {
        cy.get("a").contains("Login or register to add new listing")
    });

    describe("form validation", () => {
        beforeEach(() => {
            cy.get('.App > :nth-child(2) > :nth-child(1) > :nth-child(1)').click();
        });

        it("should display titleErrors", () => {
            cy.get("#title").type(("a").repeat(101));
            cy.contains("Title must be less than 100 characters");
            cy.get("#title").clear();
            cy.get("div#titleError").should("exist");
            cy.get("#title").type("Test Car 1");
            cy.get("div#titleError").should("not.exist");
        });

        it("should display make and model errors", () => {
            cy.get(".new-listing-form").submit();
            cy.get('input[name="make"]').clear();
            cy.get("div#makeError").should("exist");
            cy.get('input[name="make"]').type("Toyota");
            cy.get("div[role='listbox']").should("be.visible");
            cy.get("div[role='listbox']").contains("Toyota").click();
            cy.get('input[name="model"]').clear();
            cy.get("div#modelError").should("exist");
            cy.get('input[name="model"]').type("Corolla");
            cy.get("div[role='listbox']").should("be.visible");
            cy.get("div[role='listbox']").contains("Corolla").click();

            cy.get("div#modelError").should("not.exist");
            cy.get("div#makeError").should("not.exist");
        });

        it("should display price errors", () => {
            cy.get("#price").click({force: true}).clear().type("0.9");
            cy.contains("Price must be an integer");
            cy.get("#price").clear().type("1000000000");
            cy.contains("Price must be less than 100000000");
            cy.get("#price").clear().type("-1");
            cy.contains("Price must be greater than 0");
            cy.get("#price").clear().type("1000");
            cy.get("div#priceError").should("not.exist");
        });

        it("should display description errors", () => {
            cy.get("#description").invoke('val', ("a".repeat(3001))).type('!').invoke('val')
            cy.contains("Description must be less than 3000 characters");
            cy.get("#description").clear();
            cy.get("div#descError").should("exist");
            cy.get("#description").type("This is a test car");
            cy.get("div#descError").should("not.exist");
        });

        it("should display year errors", () => {
            cy.get("#year").clear().type("1800");
            cy.contains("Year must be greater than 1900");
            cy.get("#year").clear().type("2025");
            cy.contains("Year must be less than current year");
            cy.get("#year").clear().type("1901.1");
            cy.contains("Year must be an integer");
            cy.get("#year").clear().type("2024");
            cy.get("div#yearError").should("not.exist");
        });

        it("should display mileage errors", () => {
            cy.get("#mileage").clear().type("-1");
            cy.contains("Mileage must be greater than 0");
            cy.get("#mileage").clear().type("1000000000");
            cy.contains("Mileage must be less than 1000000");
            cy.get("#mileage").clear().type("1000.1");
            cy.contains("Mileage must be an integer");
            cy.get("#mileage").clear().type("10000");
            cy.get("div#mileageError").should("not.exist");
        });

        it("should display vin number errors", () => {
            cy.get("#vin_number").clear().type(("a").repeat(18));
            cy.contains("VIN number must be 17 characters");
            cy.get("#vin_number").clear().type("12345678901234567");
            cy.get("div#vinError").should("not.exist");
        });

        it("should display engine capacity errors", () => {
            cy.get("#engine_capacity").clear().type("0.9");
            cy.contains("Engine capacity must be an integer");
            cy.get("#engine_capacity").clear().type("100000");
            cy.contains("Engine capacity must be less than 10000");
            cy.get("#engine_capacity").clear().type("-1");
            cy.contains("Engine capacity must be greater than 0");
            cy.get("#engine_capacity").clear().type("1000");
            cy.get("div#engineError").should("not.exist");
        });

        it("should display power errors", () => {
            cy.get("#power").clear().type("0.9");
            cy.contains("Power must be an integer");
            cy.get("#power").clear().type("1501");
            cy.contains("Power must be less than 1500");
            cy.get("#power").clear().type("-1");
            cy.contains("Power must be greater than 0");
            cy.get("#power").clear().type("100");
            cy.get("div#powerError").should("not.exist");
        });

        it("should display doors errors", () => {
            cy.get("#doors").clear().type("-1");
            cy.contains("Doors must be greater than 0");
            cy.get("#doors").clear().type("11");
            cy.contains("Doors must be less than 10");
            cy.get("#doors").clear().type("1.1");
            cy.contains("Doors must be an integer");
            cy.get("#doors").clear().type("4");
            cy.get("div#doorsError").should("not.exist");
        });

        it("should display seats errors", () => {
            cy.get("#seats").clear().type("-1");
            cy.contains("Seats must be greater than 0");
            cy.get("#seats").clear().type("11");
            cy.contains("Seats must be less than 10");
            cy.get("#seats").clear().type("1.1");
            cy.contains("Seats must be an integer");
            cy.get("#seats").clear().type("4");
            cy.get("div#seatsError").should("not.exist");
        });

        it("should display registration number errors", () => {
            cy.get("#registration_number").clear().type(("a").repeat(11));
            cy.contains("Registration number must be less than 10 characters");
            cy.get("#registration_number").clear().type("1");
            cy.contains("Registration number must be greater than 3 characters");
            cy.get("#registration_number").clear().type("1234567890");
            cy.get("div#regError").should("not.exist");
        });

        it("should display phone number errors", () => {
            cy.get("#telephone_number").clear().type("1");
            cy.contains("Telephone number must be at least 9 characters");
            cy.get("#telephone_number").clear().type(("1").repeat(16));
            cy.contains("Telephone number must be less than 15 characters");
            cy.get("#telephone_number").clear().type("123456789");
            cy.get("div#phoneError").should("not.exist");
        });
    });

    it("should submit the form with valid data", () => {
        cy.get('.App > :nth-child(2) > :nth-child(1) > :nth-child(1)').click();
        cy.get("#title").type("Test Car 1");

        cy.get('input[name="make"]').type("Toyota");
        cy.get("div[role='listbox']").should("be.visible");
        cy.get("div[role='listbox']").contains("Toyota").click();

        cy.get("#price").clear().type("1000");

        cy.get('input[name="model"]').type("Corolla");
        cy.get("div[role='listbox']").should("be.visible");
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
        cy.get("input[name='location']").clear().type("Gdańsk")
        cy.get("button[name='location']").contains("Search").click()


        cy.get(".new-listing-form").submit();

        cy.contains("Search", {timeout: 10000}).should("be.visible");

        cy.wait(3000);

        cy.url().then(url => {
            const pathname = new URL(url).pathname;
            expect(pathname).to.equal("/");
        })

        cy.visit("/account");
        cy.get("a").contains("Test Car 1");
    });

});


export {}