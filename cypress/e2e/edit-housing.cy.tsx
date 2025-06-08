describe("EditHousing Interactions", () => {

    it('should allow editing housing details', () => {
        cy.visit('/housing/edit?id=12345');
        cy.get('input[name="title"]').type('Updated Housing').should('have.value', 'Updated Housing');
        cy.get('textarea[name="description"]').type('This is an updated housing description.').should('have.value', 'This is an updated housing description.');
        cy.get('input[name="address"]').type('456 Updated St, Updated City').should('have.value', '456 Updated St, Updated City');
        cy.get('input[name="price"]').type('600').should('have.value', '600');
        cy.get('form').submit();
        cy.contains('¡Felicidades! Tu propiedad ha sido actualizada').should('be.visible');
    });

    it('should display an error message if required fields are missing', () => {
        cy.visit('/housing/edit?id=12345');
        cy.get('input[name="title"]').clear();
        cy.get('form').submit();
        cy.contains('Debe ingresar todos los datos').should('be.visible');
    });

    it('should allow removing images', () => {
        cy.visit('/housing/edit?id=12345');
        cy.get('ul').contains('test-image.jpg').should('exist');
        cy.get('ul').contains('test-image.jpg')
            .parent()
            .within(() => {
                cy.contains('Eliminar').click();
            });
        cy.get('ul').contains('test-image.jpg').should('not.exist');
    });

    it('should display a success message on successful housing update (200 OK)', () => {
        cy.intercept('PUT', 'http://localhost:3000/api/housing/12345', {
            statusCode: 200,
            body: { _id: '12345', title: 'Updated Housing' },
        }).as('updateHousingRequest');

        cy.visit('/housing/edit?id=12345');
        cy.get('input[name="title"]').type('Updated Housing');
        cy.get('textarea[name="description"]').type('This is an updated housing description.');
        cy.get('input[name="address"]').type('456 Updated St, Updated City');
        cy.get('input[name="price"]').type('600');
        cy.get('form').submit();

        cy.wait('@updateHousingRequest');
        cy.contains('¡Felicidades! Tu propiedad ha sido actualizada').should('be.visible');
    });

    it('should display an error message on failed housing update (e.g., 400 Bad Request)', () => {
        cy.intercept('PUT', 'http://localhost:3000/api/housing/12345', {
            statusCode: 400,
            body: { error: 'validation_error', description: 'Invalid data provided.' },
        }).as('updateHousingRequest');

        cy.visit('/housing/edit?id=12345');
        cy.get('input[name="title"]').clear();
        cy.get('form').submit();

        cy.wait('@updateHousingRequest');
        cy.contains('Debe ingresar todos los datos').should('be.visible');
    });

    it('should display a generic error if API returns error without specific description (e.g., 500)', () => {
        cy.intercept('PUT', 'http://localhost:3000/api/housing/12345', {
            statusCode: 500,
            body: {},
        }).as('updateHousingRequest');

        cy.visit('/housing/edit?id=12345');
        cy.get('input[name="title"]').type('Updated Housing');
        cy.get('form').submit();

        cy.wait('@updateHousingRequest');
        cy.contains('Error al actualizar la propiedad.').should('be.visible');
    });

    it('should allow uploading new images', () => {
        cy.visit('/housing/edit?id=12345');
        const imageName = 'new-image.jpg';
        cy.get('input[type="file"]').attachFile(imageName);
        cy.get('ul').contains(imageName).should('exist');
        cy.get('ul').contains(imageName)
            .parent()
            .within(() => {
                cy.contains('Eliminar').click();
            });
        cy.get('ul').contains(imageName).should('not.exist');
    });

    it


})