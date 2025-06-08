describe("ViewHousing Interactions", () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3000/api/housing/1', {
            statusCode: 200,
            body: {
                id: 1,
                title: "Pieza en Macul",
                description: "Se arrienda pieza amplia en casa compartida.",
                address: "Av. Vicuña Mackenna 1234, Macul",
                price: 250000,
                rooms: 1,
                bathrooms: 1,
                size: 20,
                images: [
                    "https://placehold.co/600x400?text=Imagen+1",
                    "https://placehold.co/600x400?text=Imagen+2"
                ],
                available: true,
                createdAt: "2024-06-01T10:00:00.000Z",
                updatedAt: "2024-06-04T15:30:00.000Z",
                owner: {
                    id: 1,
                    auth0Id: "auth0|fake123",
                    name: "Juan Pérez",
                    email: "juan@example.com",
                    type: "propietario",
                    createdAt: "2024-01-01T00:00:00.000Z"
                }
            }
        }).as('getHousing');
    });

    it('should display full housing details successfully', () => {
        cy.visit('/housing/1');
        cy.wait('@getHousing');
        cy.contains('Pieza en Macul').should('be.visible');
        cy.contains('Se arrienda pieza amplia en casa compartida.').should('be.visible');
        cy.contains('Av. Vicuña Mackenna 1234, Macul').should('be.visible');
        cy.contains('250000').should('be.visible');
        cy.contains('1 baño').should('exist');
        cy.contains('1 habitación').should('exist');
        cy.contains('20 m²').should('exist');
        cy.contains('Juan Pérez').should('be.visible');
        cy.contains('juan@example.com').should('be.visible');
        cy.get('img[src*="Imagen+1"]').should('exist');
        cy.get('img[src*="Imagen+2"]').should('exist');
    });

    it('should display NotFound page if housing data is not found (404)', () => {
        cy.intercept('GET', 'http://localhost:3000/api/housing/999', {
            statusCode: 404,
            body: { error: 'not_found', description: 'Housing not found.' }
        }).as('getHousingNotFound');
        cy.visit('/housing/999');
        cy.wait('@getHousingNotFound');
        cy.contains('Oops...').should('be.visible');
        cy.contains('No hemos podido encontrar esta página').should('be.visible');
        cy.contains('La página que buscas no aparece dentro de nuestro sistema').should('be.visible');
    });

    it('should display contact card with owner name and email', () => {
        cy.visit('/housing/1');
        cy.wait('@getHousing');
        cy.get('.bg-blue-300').within(() => {
            cy.contains('Contacta a:').should('be.visible');
            cy.contains('Juan Pérez').should('be.visible');
            cy.contains('juan@example.com').should('be.visible');
        });
    });

});

