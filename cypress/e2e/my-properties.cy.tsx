// cypress/e2e/my-properties.cy.tsx (FIXED)

describe('My Properties and Management', () => {
    const ownerId = 1;
    const mockOwner = { id: ownerId, name: 'Test Propietario', type: 'propietario' };

    const mockHousings = [
        { id: 101, title: 'My First Property', address: '123 Main St', ownerId: ownerId, available: true, images: [''] },
        { id: 102, title: 'Someone Elses Property', address: '456 Other St', ownerId: 999, available: true, images: [''] },
        { id: 103, title: 'My Second, Unavailable Property', address: '789 My Ave', ownerId: ownerId, available: false, images: [''] },
    ];

    beforeEach(() => {
        cy.window().then((win) => {
            win.localStorage.setItem('user', JSON.stringify(mockOwner));
            win.localStorage.setItem('access_token', 'fake-owner-token');
        });
        
        cy.intercept('GET', 'http://localhost:3000/api/housing*', {
            body: { housing: mockHousings }
        }).as('getAllHousings');

        cy.visit('/my-housings');
        cy.wait('@getAllHousings');
    });

    it('should only display properties owned by the logged-in user', () => {
        cy.contains('h2', 'My First Property').should('be.visible');
        cy.contains('h2', 'My Second, Unavailable Property').should('be.visible');
        cy.contains('h2', 'Someone Elses Property').should('not.exist');
    });

    it('should correctly toggle a property availability on success', () => {
        const propertyToToggleId = 101;

        cy.intercept('PUT', `http://localhost:3000/api/housing/${propertyToToggleId}`, {
            statusCode: 200,
            body: { success: true },
        }).as('updateAvailability');

        // Locate the housing card by its title
        cy.contains('h2', 'My First Property')
            .parents('div.bg-white')
            .within(() => {
            // Verify initial state
            cy.contains('span', 'Disponible').should('be.visible');

            // Click toggle
            cy.get('label[for="toggle-101"]').click(); 


            // Expect optimistic UI update
            cy.contains('span', 'No Disponible').should('be.visible');
            });

        cy.wait('@updateAvailability');
    });

    it('should revert the UI and show an alert if toggling availability fails', () => {
        const propertyToToggleId = 103;

        cy.intercept('PUT', `http://localhost:3000/api/housing/${propertyToToggleId}`, {
            statusCode: 500,
            body: { message: 'Server error' },
        }).as('updateAvailability');

        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        cy.contains('h2', 'My Second, Unavailable Property')
            .parents('div.bg-white')
            .within(() => {
            // Confirm initial state
            cy.contains('span', 'No Disponible').should('be.visible');

            // Click the toggle
            cy.get('label[for="toggle-103"]').click(); 


            // UI changes optimistically
            cy.contains('span', 'Disponible').should('be.visible');
            });

        cy.wait('@updateAvailability').then(() => {
            expect(alertStub).to.have.been.calledOnceWith('Error: No se pudo actualizar la propiedad. Reintentando...');
        });

        // Confirm UI rollback
        cy.contains('h2', 'My Second, Unavailable Property')
            .parents('div.bg-white')
            .within(() => {
            cy.contains('span', 'No Disponible').should('be.visible');
            });
    });

    context('Property Deletion', () => {
        it('should allow a user to delete a property via confirmation modal', () => {
            const propertyToDeleteId = 101;

            cy.intercept('GET', `http://localhost:3000/api/housing/${propertyToDeleteId}`, {
                body: { housing: { ...mockHousings[0], owner: mockOwner } }
            }).as('getHousing');
            
            // FIXED: More robust selector for finding the edit link.
            cy.contains('h2', 'My First Property')
              .closest('div.bg-white')
              .find('a[href*="/edit"]')
              .click();

            cy.wait('@getHousing'); // Wait after navigation
            cy.url().should('include', `/housing/${propertyToDeleteId}/edit`);

            // --- The rest of your delete test ---
            cy.intercept('DELETE', `http://localhost:3000/api/housing/${propertyToDeleteId}`, {
                statusCode: 204
            }).as('deleteRequest');

            cy.get('button').contains('Eliminar Propiedad').click();
            cy.contains('¿Estás seguro que quieres eliminar la propiedad?').should('be.visible');
            
            cy.get('div[class*="bg-black/75"]').contains('button', 'Eliminar').click();
            cy.wait('@deleteRequest');

            cy.contains('La propiedad ha sido eliminada').should('be.visible');
            cy.contains('button', 'Ir a inicio').click();
            cy.url().should('eq', Cypress.config().baseUrl + '/');
        });
    });
});