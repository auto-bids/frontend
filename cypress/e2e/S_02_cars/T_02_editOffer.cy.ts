describe("Edit Offer", () => {

    beforeEach(() => {
        cy.session("editSession", () => {
            cy.loginWithAuth0()
        });
        cy.visit('/account')
        cy.get('button#editOfferButton').click()
    });

    it("should edit offer", () => {

        cy.get("textarea").clear().type("New description")
        cy.get("button#price").click()
        cy.get("input#price").clear().type("5000")
        cy.get("button#mileage").click()
        cy.get("input#mileage").clear().type("123")
        cy.get('button').contains('Submit').click()

        cy.get("a").contains("Test Car 1").click();

        cy.get("p.offer-page-main-description-description").contains("New description")
        cy.get("p.offerPrice").contains("5000")
        cy.get("p.offer-value").contains("123")
    })

    describe("form validation", () => {
        it("should display editDescriptionErrors", () => {
            cy.get("textarea").clear().invoke('val', ("a".repeat(3001))).type('!').invoke('val')
            cy.get('button').contains('Submit').click()
            cy.contains("Description must be at most 3000 characters");
            cy.get("textarea").clear()
            cy.get('button').contains('Submit').click()
            cy.contains("Description is required");
            cy.get("textarea").clear().type("New description")
            cy.get("div#editDescriptionError").should("not.exist");
        });

        it("should display editPriceErrors", () => {
            cy.get("button#price").click()
            cy.get("input#price").clear()
            cy.get("button").contains("Submit").click()
            cy.contains("Price is required");
            cy.get("input#price").clear().type("0")
            cy.contains("Price must be at least 1");
            cy.get("input#price").clear().type("1.1")
            cy.contains("Price must be an integer");
            cy.get("input#price").clear().type("1000")
            cy.get("div#editPriceError").should("not.exist");
        })

        it("should display editMileageErrors", () => {
            cy.get("button#mileage").click()
            cy.get("input#mileage").clear()
            cy.get("button").contains("Submit").click()
            cy.contains("Mileage is required");
            cy.get("input#mileage").clear().type("-1")
            cy.contains("Mileage must be at least 0");
            cy.get("input#mileage").clear().type("1.1")
            cy.contains("Mileage must be an integer");
            cy.get("input#mileage").clear().type("1000")
            cy.get("div#editMileageError").should("not.exist");
        })
    });

    describe("photoForm validation", () => {
        it("should display editPhotosErrors", () => {
            cy.get("button#photos").click()
            cy.get("button").contains("Add Photo").click()
            cy.get("input[type='file']").selectFile('cypress/fixtures/wrong_file_format.xyz')
            cy.on('window:alert', (alertText) => {
                expect(alertText).to.equal('Invalid file type. Please upload a JPEG or PNG image.');
            });
            cy.get("button").contains("Submit").click()
        })

        it("should edit photos", () => {
            cy.get("button#photos").click()
            cy.get("button").contains("Add Photo").click()
            cy.get("input[type='file']").selectFile('cypress/fixtures/black.png')
            cy.get("button").contains("Submit").click()
            cy.get("svg", {timeout: 10000}).should("not.be.visible");
            cy.wait(2000)
            cy.get('button#editOfferButton').click()
            cy.get("button#photos").click()
            cy.get("img[alt='Photo 1']").should("exist")
            cy.get("img[alt='Photo 2']").should("not.exist")
        })

        it("should remove photo", () => {
            cy.get("button#photos").click()
            cy.get("img[alt='Photo 1']").should("exist")
            cy.get("button").contains("Remove").click()
            cy.get("button").contains("Submit").click()
            cy.get("svg", {timeout: 10000}).should("not.be.visible");
            cy.wait(2000)
            cy.get('button#editOfferButton').click()
            cy.get("button#photos").click()
            cy.get("img[alt='Photo 1']").should("not.exist")
        })
    })

    it("should cancel edit offer", () => {
        cy.get("button").contains("Cancel").click()
        cy.get("button").contains("Submit").should("not.exist")
    });
})

export {};