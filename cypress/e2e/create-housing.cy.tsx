describe('CreateHousing Interactions', () => {
    beforeEach(() => {
        cy.visit('/housing/new');
    });
    
    it('should allow typing into all fields', () => {
        cy.get('input[name="title"]').type('Test Housing').should('have.value', 'Test Housing');
        cy.get('textarea[name="description"]').type('This is a test housing description.').should('have.value', 'This is a test housing description.');
        cy.get('input[name="address"]').type('123 Test St, Test City').should('have.value', '123 Test St, Test City');
        cy.get('input[name="price"]').type('500').should('have.value', '500');
        cy.get('input[name="size"]').type('75').should('have.value', '75');
        cy.get('input[name="rooms"]').type('3').should('have.value', '3');
        cy.get('input[name="bathrooms"]').type('2').should('have.value', '2');
    });

    it('should allow selecting and removing images', () => {
        cy.fixture('example.json').then((data) => {
            const imageName = data.image || 'test-image.jpg';
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imageName}`, { force: true });
            cy.get('ul').contains(imageName).should('exist');
            cy.get('ul').contains(imageName)
            .parent()
            .within(() => {
                cy.contains('Eliminar').click();
            });
            cy.get('ul').contains(imageName).should('not.exist');
    });
    
    it('should display a success message on successful housing creation (201 Created)', () => {
        cy.intercept('POST', 'http://localhost:3000/api/housing', {
        statusCode: 201,
        body: { _id: 'housing123', title: 'Test Housing' },
        }).as('createHousingRequest');
    
        cy.get('input[name="title"]').type('Test Housing');
        cy.get('textarea[name="description"]').type('This is a test housing description.');
        cy.get('input[name="address"]').type('123 Test St, Test City');
        cy.get('input[name="price"]').type('500');
        cy.get('form').submit();
    
        cy.wait('@createHousingRequest');
        cy.url().should('include', '/housing/success?id=housing123');
        cy.contains('¡Felicidades! Tu propiedad ya fue agregada').should('be.visible');
        cy.contains('Los estudiantes podrán revisar la información de tu propiedad').should('be.visible');
        cy.get('button').contains('Revisar propiedad').should('be.visible');
    });

    it("should display and close the error message if no data is entered", () => {
        cy.intercept('POST', '/api/housing', {
            statusCode: 400,
            body: {
            success: false,
            message: "Debe ingresar todos los datos",
            }
        }).as('createHousingRequest');

        cy.visit('/housing/new');
        cy.contains('Agregar propiedad').click();

        cy.wait('@createHousing');
        cy.contains('Debe ingresar todos los datos').should('be.visible');
        cy.contains('Cerrar').click();
        cy.contains('Debe ingresar todos los datos').should('not.exist');
    });
});

    
    //it('should display an error message on failed housing creation (e.g., 400 Bad Request)', () => {
        //cy.intercept('POST', 'http://localhost:3000/api/housing', {
        //statusCode: 400,
        //body: { error: 'validation_error', description: 'Invalid data provided.' },
        //}).as('createHousingRequest');
    
        //cy.get('input[name="title"]').type('');
        //cy.get('textarea[name="description"]').type('');
        //cy.get('input[name="address"]').type('');
        //cy.get('input[name="price"]').type('');
        //cy.get('form').submit();
    
        //cy.wait('@createHousingRequest');
        //cy.contains('Invalid data provided.').should('be.visible');
    //});
    
    //it('should display a generic error if API returns error without specific description (e.g., 500)', () => {
        //cy.intercept('POST', 'http://localhost:3000/api/housing', {
            //statusCode: 500,
            //body: {},
        //}).as('createHousingRequest');

        //cy.get('input[name="title"]').type('Test Housing');
        //cy.get('textarea[name="description"]').type('This is a test housing description.');
        //cy.get('input[name="address"]').type('123 Test St, Test City');
        //cy.get('input[name="price"]').type('500');
        //cy.get('form').submit();

        //cy.wait('@createHousingRequest');
        //cy.contains('Ocurrió un error. Por favor intenta más tarde.').should('be.visible');
    //});
});