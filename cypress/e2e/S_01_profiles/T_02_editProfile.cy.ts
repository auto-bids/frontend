describe('Edit Profile', () => {

    const visitAccountPageAndEditProfile = () => {
        cy.visit('/account')
        cy.get('button').contains('Edit Profile').click()
    }

    beforeEach(() => {
        cy.session("editSession", () => {
            cy.loginWithAuth0()
        });
    });

    it('should cancel edit profile', () => {
        visitAccountPageAndEditProfile()
        cy.get('input[name="user_name"]').clear().type('John Doe')
        cy.get('button').contains('Cancel').click()
        cy.contains('Your account')
    })

    it('should edit profile', () => {
        visitAccountPageAndEditProfile()
        cy.get('input[name="user_name"]').clear().type('John Doe')
        cy.get('button').contains('Save').click()
        cy.reload()
        cy.contains('John Doe')
        cy.get('button').contains('Edit Profile').click()
        cy.get('input[name="user_name"]').clear().type(Cypress.env('USER_EMAIL'))
        cy.get('button').contains('Save').click()
        cy.contains(Cypress.env('USER_EMAIL'))
    })

    it('should not edit profile', () => {
        visitAccountPageAndEditProfile()
        cy.get('input[name="user_name"]').clear()
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Name must be between 2 and 50 characters long');
        });
        cy.get('button').contains('Save').click()
    })

    it('should edit profilePicture', () => {
        let originalImageUrl: string | undefined, updatedImageUrl: string | undefined;
        visitAccountPageAndEditProfile()
        cy.get('img[alt="profile"]').then($img => {
            originalImageUrl = $img.attr('src');
        });
        cy.get('input[type="file"]').selectFile('cypress/fixtures/black.png')
        cy.get('button').contains('Save').click()

        cy.get("svg", {timeout: 10000}).should("not.be.visible");
        cy.wait(3000)
        cy.reload()

        cy.get('img[alt="profile"]').then($img => {
            updatedImageUrl = $img.attr('src');
            expect(updatedImageUrl).not.to.equal(originalImageUrl);
        });

        visitAccountPageAndEditProfile()
        cy.get('input[type="file"]').selectFile('cypress/fixtures/white.png')
        cy.get('button').contains('Save').click()
    })

    it('should not edit profilePicture', () => {
        let originalImageUrl: string | undefined, updatedImageUrl: string | undefined;
        visitAccountPageAndEditProfile()
        cy.get('img[alt="profile"]').then($img => {
            originalImageUrl = $img.attr('src');
        });
        cy.get('input[type="file"]').selectFile('cypress/fixtures/wrong_file_format.xyz')
        cy.get('button').contains('Save').click()

        cy.get("svg", {timeout: 10000}).should("not.be.visible");
        cy.wait(3000)
        cy.reload()

        cy.get('img[alt="profile"]').then($img => {
            updatedImageUrl = $img.attr('src');
            expect(updatedImageUrl).to.equal(originalImageUrl);
        });

        visitAccountPageAndEditProfile()
        cy.get('input[type="file"]').selectFile('cypress/fixtures/white.png')
        cy.get('button').contains('Save').click()
    })
})

export {};
