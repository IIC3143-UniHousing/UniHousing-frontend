
describe('CreateHousing Form Interactions', () => {
    const mockPropietario = {
        id: 1,
        name: 'Test Propietario',
        email: 'propietario@example.com',
        type: 'propietario',
    };

    const mockEstudiante = {
        id: 2,
        name: 'Test Estudiante',
        email: 'estudiante@example.com',
        type: 'estudiante',
    };

    it('should redirect a non-propietario user', () => {
        cy.window().then((win) => {
            win.localStorage.setItem('user', JSON.stringify(mockEstudiante));
        });
        cy.visit('/housing/new');
        cy.url().should('not.include', '/housing/new');
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    context('when logged in as a propietario', () => {
        beforeEach(() => {
            cy.window().then((win) => {
                win.localStorage.setItem('user', JSON.stringify(mockPropietario));
                win.localStorage.setItem('access_token', 'fake-propietario-token');
            });
            cy.visit('/housing/new');
        });

        it('should display the form and allow typing in all fields', () => {
            cy.get('input[name="title"]').type('Beautiful Apartment').should('have.value', 'Beautiful Apartment');
            cy.get('input[name="price"]').type('500000').should('have.value', '500000');
            cy.get('input[name="address"]').type('123 Main St, Santiago').should('have.value', '123 Main St, Santiago');
            cy.get('textarea[name="description"]').type('A wonderful place to live and study.').should('have.value', 'A wonderful place to live and study.');
            cy.get('input[name="size"]').type('75').should('have.value', '75');
            cy.get('input[name="rooms"]').type('3').should('have.value', '3');
            cy.get('input[name="bathrooms"]').type('2').should('have.value', '2');
        });

        it('should show client-side validation errors for invalid data', () => {
            cy.get('input[name="title"]').type('abc');
            cy.contains('button', 'Agregar propiedad').click();
            // Note: If this still fails, double-check the exact error message in your component.
            cy.contains('Debe ingresar todos los datos').should('be.visible');
        });

        it('should allow uploading an image', () => {
            // IMPORTANT: Make sure a file named 'test-image.jpg' exists in cypress/fixtures/
            cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg', { force: true });
            cy.contains('test-image.jpg').should('be.visible');
        });

        it('should submit the form successfully and redirect', () => {
            cy.intercept('POST', 'http://localhost:3000/api/housing', {
                statusCode: 201, // 201 Created is more standard for successful POSTs
                body: { success: true, housing: { id: 'new-housing-123' } },
            }).as('createHousingRequest');

            cy.visit('/housing/new');

            cy.get('input[name="title"]').type('Wonderful Student Home');
            cy.get('input[name="price"]').type('450000');
            cy.get('input[name="address"]').type('Avenida Siempreviva 742');
            cy.get('textarea[name="description"]').type('This is a detailed and valid description of the property.');
            cy.get('input[name="size"]').type('80');
            cy.get('input[name="rooms"]').type('4');
            cy.get('input[name="bathrooms"]').type('2');
            cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg', { force: true });

            cy.contains('button', 'Agregar propiedad').click();

            cy.wait('@createHousingRequest');
            cy.url().should('include', '/housing/success'); 
        });

        it('should show an error message on API failure', () => {
             cy.intercept('POST', 'http://localhost:3000/api/housing', {
                statusCode: 500,
                body: { success: false, message: "Error al enviar los datos." },
            }).as('createHousingFailure');
            
            cy.get('input[name="title"]').type('Wonderful Student Home');
            cy.get('input[name="price"]').type('450000');
            cy.get('input[name="address"]').type('Avenida Siempreviva 742');
            cy.get('textarea[name="description"]').type('This is a detailed and valid description of the property.');
            cy.get('input[name="size"]').type('80');
            cy.get('input[name="rooms"]').type('4');
            cy.get('input[name="bathrooms"]').type('2');
            cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg', { force: true });

            // CORRECTED: The button text is for adding, not editing.
            cy.contains('button', 'Agregar propiedad').click();

            cy.wait('@createHousingFailure');
            cy.contains('Error al enviar los datos.').should('be.visible');
        });
    });
});