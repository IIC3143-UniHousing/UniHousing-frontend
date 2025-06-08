describe('SignupForm Interactions', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('should allow typing into all fields and selecting account type', () => {
    cy.get('input[name="full_name"]').type('Test User').should('have.value', 'Test User');
    cy.get('input[name="email"]').type('signup@example.com').should('have.value', 'signup@example.com');
    cy.get('input[name="password"]').type('newPassword123').should('have.value', 'newPassword123');

    // Check default account type (Estudiante)
    cy.contains('button', 'Estudiante').should('have.class', 'border-blue-500');
    cy.contains('button', 'Propietario').should('not.have.class', 'border-blue-500');

    // Click "Propietario" button
    cy.contains('button', 'Propietario').click();
    cy.contains('button', 'Propietario').should('have.class', 'border-blue-500');
    cy.contains('button', 'Estudiante').should('not.have.class', 'border-blue-500');

    // Click "Estudiante" button
    cy.contains('button', 'Estudiante').click();
    cy.contains('button', 'Estudiante').should('have.class', 'border-blue-500');
  });

  it('should display a success message on successful signup (201 Created)', () => {
    cy.intercept('POST', 'http://localhost:3000/api/signup', {
      statusCode: 201,
      body: { _id: 'user123', email: 'signup@example.com' },
    }).as('signupRequest');

    cy.get('input[name="full_name"]').type('Test User');
    cy.get('input[name="email"]').type('signup@example.com');
    cy.get('input[name="password"]').type('newPassword123');
    // Default account_type is false (Estudiante), no need to click unless testing the other type
    cy.get('form').submit();

    cy.wait('@signupRequest');
    cy.contains('Registro Exitoso').should('be.visible');
    cy.get('.text-red-500', { timeout: 1000 }).should('not.exist');
  });

  it('should display an error message on failed signup (e.g., 400 Bad Request)', () => {
    cy.intercept('POST', 'http://localhost:3000/api/signup', {
      statusCode: 400,
      body: { error: 'validation_error', description: 'Email already in use.' },
    }).as('signupRequest');

    cy.get('input[name="full_name"]').type('Another User');
    cy.get('input[name="email"]').type('existing@example.com');
    cy.get('input[name="password"]').type('password456');
    cy.get('form').submit();

    cy.wait('@signupRequest');
    cy.contains('Email already in use.').should('be.visible');
    cy.get('.text-green-600', { timeout: 1000 }).should('not.exist');
  });

  it('should display a generic error if API returns error without specific description (e.g., 500)', () => {
    cy.intercept('POST', 'http://localhost:3000/api/signup', {
      statusCode: 500,
      body: { /* No description or error */ },
    }).as('signupRequest');

    cy.get('input[name="full_name"]').type('Error User');
    cy.get('input[name="email"]').type('error@example.com');
    cy.get('input[name="password"]').type('errorPass');
    cy.get('form').submit();

    cy.wait('@signupRequest');
    cy.contains('Error al registrarse.').should('be.visible');
  });

  it('should display a network error if the server is unreachable', () => {
    cy.intercept('POST', 'http://localhost:3000/api/signup', {
      forceNetworkError: true,
    }).as('signupRequest');

    cy.get('input[name="full_name"]').type('Network Error User');
    cy.get('input[name="email"]').type('network@example.com');
    cy.get('input[name="password"]').type('networkPass');
    cy.get('form').submit();

    cy.wait('@signupRequest');
    cy.contains('Error al conectarse con el servidor.').should('be.visible');
  });

  it('should have required fields (HTML5 validation)', () => {
    cy.get('form').submit();
    cy.get('input[name="full_name"]:invalid').should('exist');
    cy.get('input[name="email"]:invalid').should('exist');
    cy.get('input[name="password"]:invalid').should('exist');
    cy.get('.text-red-500').should('not.exist');
  });
});