describe('LoginForm Interactions', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should allow typing into email and password fields', () => {
    cy.get('input[name="email"]').type('test@example.com').should('have.value', 'test@example.com');
    cy.get('input[name="password"]').type('password123').should('have.value', 'password123');
  });

  it('should display a success message on successful login (200 OK)', () => {
    // CORRECTED: The URL now matches the fetch call in the component
    cy.intercept('POST', 'http://localhost:3000/api/users/login', {
      statusCode: 200,
      body: {
        access_token: 'fake_access_token',
        id_token: 'fake_id_token',
        token_type: 'Bearer',
        expires_in: 3600,
        user: { id: 1, name: 'Test User', type: 'estudiante' }
      },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

    cy.wait('@loginRequest');
    // The component navigates on success, so we check the URL
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should display an error message on failed login (401 Unauthorized)', () => {
    // CORRECTED: The URL now matches the fetch call in the component
    cy.intercept('POST', 'http://localhost:3000/api/users/login', {
      statusCode: 401,
      body: {
        error: 'Invalid credentials provided.',
      },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('form').submit();

    cy.wait('@loginRequest');
    cy.contains('Invalid credentials provided.').should('be.visible');
  });

  it('should display a generic error if API returns error without specific description (e.g., 400)', () => {
    // CORRECTED: The URL now matches the fetch call in the component
    cy.intercept('POST', 'http://localhost:3000/api/users/login', {
      statusCode: 400,
      body: { /* No description or error field */ },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

    cy.wait('@loginRequest');
    cy.contains('Error al iniciar sesión.').should('be.visible');
  });

  it('should display a network error message if the server is unreachable', () => {
    // CORRECTED: The URL now matches the fetch call in the component
    cy.intercept('POST', 'http://localhost:3000/api/users/login', {
      forceNetworkError: true,
    }).as('loginRequest');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

    cy.wait('@loginRequest');
    cy.contains('Error al conectarse con el servidor.').should('be.visible');
  });

  it('should have required fields for email and password (HTML5 validation)', () => {
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();
    cy.get('input[name="email"]:invalid').should('exist');

    cy.get('input[name="password"]').clear();
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('form').submit();
    cy.get('input[name="password"]:invalid').should('exist');
  });
});