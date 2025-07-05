describe('Housing List Page', () => {
    // Generate 7 mock properties for testing pagination (5 per page)
    const mockHousings = Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        title: `Test Property ${i + 1}`,
        address: `${i + 1} Test St`,
        price: 100000 + (i * 10000),
        rooms: 2 + (i % 2),
        size: 50 + i,
        images: [''],
        ownerId: 1,
        owner: { name: 'Owner ' + (i + 1) }, // ✅ ADD THIS
}));

    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3000/api/housing?available=true', {
            body: { housing: mockHousings }
        }).as('getHousings');
        
        cy.visit('/housings');
        cy.wait('@getHousings');
    });

    it('should display the first page of properties on load', () => {
        // Should show the first 5 properties
        cy.contains('Test Property 1').should('be.visible');
        cy.contains('Test Property 5').should('be.visible');

        // Property 6 should not be visible yet
        cy.contains('Test Property 6').should('not.exist');
    });

    it('should navigate to the next page and back using pagination controls', () => {
        // Check initial state
        cy.contains('Página 1 de 2').should('be.visible');
        cy.contains('button', 'Anterior').should('be.disabled');

        // Go to next page
        cy.contains('button', 'Siguiente').click();

        // Check page 2 state
        cy.contains('Página 2 de 2').should('be.visible');
        cy.contains('button', 'Siguiente').should('be.disabled');
        cy.contains('Test Property 6').should('be.visible');
        cy.contains('Test Property 1').should('not.exist');

        // Go back to previous page
        cy.contains('button', 'Anterior').click();
        cy.contains('Página 1 de 2').should('be.visible');
        cy.contains('Test Property 1').should('be.visible');
    });

    it('should filter properties by price range', () => {
        cy.get('input[placeholder="Mínimo"]').type('160000');
        cy.get('input[placeholder="Máximo"]').type('160000');

        cy.contains('Test Property 7').should('be.visible');
        cy.contains('Test Property 1').should('not.exist');
    });

   it('should show a message when no properties match the filters', () => {
        cy.get('input[placeholder="Mínimo"]').type('999999');

        cy.contains('No encontramos residencias que coincidan con tu búsqueda.').should('be.visible');
    });

});