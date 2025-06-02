describe('LoginForm Interactions', () => {
  beforeEach(() => {
    cy.visit('/login'); 
  });

  it('should allow typing into email and password fields', () => {
    cy.get('input[name="email"]').type('test@example.com').should('have.value', 'test@example.com');
    cy.get('input[name="password"]').type('password123').should('have.value', 'password123');
  });

  it('should display a success message on successful login (200 OK)', () => {
    cy.intercept('POST', 'http://localhost:3000/api/login', {
      statusCode: 200,
      body: {
        access_token: 'fake_access_token',
        id_token: 'fake_id_token',
        token_type: 'Bearer',
        expires_in: 3600,
      },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

    cy.wait('@loginRequest');
    cy.contains('Inicio de sesión exitoso').should('be.visible');
    cy.get('.text-red-500', { timeout: 1000 }).should('not.exist'); // Check no error message
  });

  it('should display an error message on failed login (401 Unauthorized)', () => {
    cy.intercept('POST', 'http://localhost:3000/api/login', {
      statusCode: 401,
      body: {
        error: 'unauthorized',
        description: 'Invalid credentials provided.',
      },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('form').submit();

    cy.wait('@loginRequest');
    cy.contains('Invalid credentials provided.').should('be.visible');
    cy.get('.text-green-600', { timeout: 1000 }).should('not.exist'); // Check no success message
  });

  it('should display a generic error if API returns error without specific description (e.g., 400)', () => {
    cy.intercept('POST', 'http://localhost:3000/api/login', {
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
    cy.intercept('POST', 'http://localhost:3000/api/login', {
      forceNetworkError: true, // Simulate a network error
    }).as('loginRequest');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

    cy.wait('@loginRequest');
    cy.contains('Error al conectarse con el servidor.').should('be.visible');
  });

  it('should have required fields for email and password (HTML5 validation)', () => {
    // Attempt to submit without filling email
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();
    cy.get('input[name="email"]:invalid').should('exist'); // Checks HTML5 validation
    cy.get('.text-red-500').should('not.exist'); // No API error message should appear yet

    // Clear password, fill email, and attempt to submit without password
    cy.get('input[name="password"]').clear();
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('form').submit();
    cy.get('input[name="password"]:invalid').should('exist'); // Checks HTML5 validation
    cy.get('.text-red-500').should('not.exist');
  });
});