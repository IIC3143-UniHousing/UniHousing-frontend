describe('SignupForm Interactions', () => {
    beforeEach(() => {
        // Visit the signup page before each test
        cy.visit('/signup');
    });

    it('should allow typing into name, email, and password fields', () => {
        cy.get('input[name="name"]').type('Test User').should('have.value', 'Test User');
        cy.get('input[name="email"]').type('test@example.com').should('have.value', 'test@example.com');
        cy.get('input[name="password"]').type('password123').should('have.value', 'password123');
    });

    it('should allow selecting an account type', () => {
        // Click the 'estudiante' button
        cy.contains('button', 'Estudiante').click();
        // Check if it has the visual style for selection
        cy.contains('button', 'Estudiante').should('have.class', 'border-blue-500');
        cy.contains('button', 'Propietario').should('not.have.class', 'border-blue-500');

        // Click the 'propietario' button
        cy.contains('button', 'Propietario').click();
        cy.contains('button', 'Propietario').should('have.class', 'border-blue-500');
    });

    it('should display a success message on successful registration (200 OK)', () => {
        // Intercept the API call and mock a successful response
        cy.intercept('POST', 'http://localhost:3000/api/users/register', {
            statusCode: 200,
            body: {
                _id: 'some_user_id',
                email: 'test@example.com',
            },
        }).as('signupRequest');

        // Fill out the form
        cy.get('input[name="name"]').type('Test User');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.contains('button', 'Propietario').click();
        cy.get('form').submit();

        // Wait for the API call and assert success
        cy.wait('@signupRequest');
        cy.contains('Registro Exitoso').should('be.visible');
    });

    it('should display an error message if the user already exists (e.g., 409 Conflict)', () => {
        // Mock a conflict error from the server
        cy.intercept('POST', 'http://localhost:3000/api/users/register', {
            statusCode: 409,
            body: {
                error: 'El usuario ya existe.',
            },
        }).as('signupRequest');

        cy.get('input[name="name"]').type('Existing User');
        cy.get('input[name="email"]').type('existing@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.contains('button', 'Estudiante').click();
        cy.get('form').submit();

        cy.wait('@signupRequest');
        cy.contains('El usuario ya existe.').should('be.visible');
        cy.get('.text-green-600').should('not.exist'); // No success message
    });

    it('should display a network error message if the server is unreachable', () => {
        // Simulate a network failure
        cy.intercept('POST', 'http://localhost:3000/api/users/register', {
            forceNetworkError: true,
        }).as('signupRequest');

        cy.get('input[name="name"]').type('Test User');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.contains('button', 'Estudiante').click();
        cy.get('form').submit();

        cy.wait('@signupRequest');
        cy.contains('Error al conectarse con el servidor.').should('be.visible');
    });

    it('should have required fields for name, email, and password', () => {
        // Attempt to submit with only email and password
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('form').submit();

        // Check for HTML5 validation on the 'name' input
        cy.get('input[name="name"]:invalid').should('exist');
    });
});