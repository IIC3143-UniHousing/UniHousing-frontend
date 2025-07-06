describe('User Profile Page', () => {
    const mockUser = {
        name: 'Initial User',
        email: 'initial@example.com',
        type: 'estudiante',
        auth0Id: 'auth0|12345'
    };

    beforeEach(() => {
        // Log the user in and set up API intercepts
        cy.window().then((win) => {
            win.localStorage.setItem('user', JSON.stringify(mockUser));
            win.localStorage.setItem('access_token', 'fake-profile-token');
        });

        // Intercept the initial data fetch
        cy.intercept('GET', 'http://localhost:3000/api/users/me', {
            statusCode: 200,
            body: mockUser,
        }).as('getUserData');

        cy.visit('/profile');
    });

    it('should load and display the user data in the form', () => {
        cy.wait('@getUserData');
        cy.get('input[value="Initial User"]').should('be.visible');
        cy.get('input[value="initial@example.com"]').should('be.visible');
        cy.contains('span', 'estudiante').should('be.visible');
    });

    it('should enable the update button only when changes are made', () => {
        // Button should be disabled initially
        cy.contains('button', 'Actualizar perfil').should('be.disabled');

        // Change the name
        cy.get('input[value="Initial User"]').clear().type('Updated User');
        
        // Button should now be enabled
        cy.contains('button', 'Actualizar perfil').should('not.be.disabled');

        // Revert the change
        cy.get('input[value="Updated User"]').clear().type('Initial User');

        // Button should be disabled again
        cy.contains('button', 'Actualizar perfil').should('be.disabled');
    });

    it('should successfully update user data and show a success message', () => {
        cy.intercept('PUT', 'http://localhost:3000/api/users/me', {
            statusCode: 200,
            body: { success: true }
        }).as('updateUserData');

        cy.get('input[value="Initial User"]').clear().type('Updated User!');
        cy.contains('button', 'Actualizar perfil').click();

        cy.wait('@updateUserData');

        // Assert the success message appears
        cy.contains('Cambios guardados correctamente').should('be.visible');
        
        // Assert it disappears after a moment (based on component's setTimeout)
        cy.contains('Cambios guardados correctamente', { timeout: 4000 }).should('not.exist');
    });

    it('should show an alert on failed update', () => {
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);  // 🔥 Set this first!

        cy.intercept('PUT', 'http://localhost:3000/api/users/me', {
            statusCode: 500,
            body: { success: false }
        }).as('updateUserData');

        cy.get('input[value="Initial User"]').clear().type('This Will Fail');
        cy.contains('button', 'Actualizar perfil').click();
        cy.wait('@updateUserData');

        cy.then(() => {
            expect(alertStub).to.have.been.calledWith('Error al actualizar perfil');
        });
    });

});