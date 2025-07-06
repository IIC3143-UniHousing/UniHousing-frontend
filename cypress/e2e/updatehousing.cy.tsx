describe('DashboardHousingEdit Form Interactions', () => {
    const mockHousingId = 123;

    const mockOwner: any = {
        id: 1,
        auth0Id: "test",
        name: "owner",
        email: "owner@gmail.com",
        type: "propietario",
        createdAt: "2024-01-01T00:00:00.000Z"
    };

    const mockInitialHousing: any = {
        id: mockHousingId,
        title: 'Old Title',
        price: 400000,
        address: 'Old Address 123',
        description: 'This is the old description of the property.',
        size: 60,
        rooms: 2,
        bathrooms: 1,
        images: ['https://example.com/old_image.png'],
        ownerId: 1,
        available: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        owner: mockOwner
    };

    const mockPropietario = {
        id: 1,
        name: 'Test Propietario',
        email: 'propietario@example.com',
        type: 'propietario',
    };

    beforeEach(() => {
        // Set up localStorage with user session
        cy.window().then((win) => {
            win.localStorage.setItem('user', JSON.stringify(mockPropietario));
            win.localStorage.setItem('access_token', 'fake-propietario-token');
        });

        // Intercept with required Authorization header
        cy.intercept({
            method: 'GET',
            url: `http://localhost:3000/api/housing/${mockHousingId}`,
            headers: {
                Authorization: 'Bearer fake-propietario-token',
            },
        }, {
            statusCode: 200,
            body: { housing: mockInitialHousing },
        }).as('getHousing');

        cy.visit(`/housing/${mockHousingId}/edit`);
        cy.wait('@getHousing');
        cy.contains('Cargando información...').should('not.exist');
    });

    it('should load the form with initial data', () => {
        cy.get('input[name="title"]').should('have.value', mockInitialHousing.title);
        cy.get('input[name="price"]').should('have.value', mockInitialHousing.price);
        cy.get('input[name="size"]').should('have.value', String(mockInitialHousing.size));
        cy.get(`img[src="${mockInitialHousing.images[0]}"]`).should('be.visible');
    });



    it('should display a client-side validation error for invalid data', () => {
        cy.get('input[name="price"]').clear();
        cy.get('input[name="price"]').type('-500');
        cy.contains('button', 'Editar propiedad').click();
        cy.contains('Precio debe ser un número mayor a cero y sin decimales').should('be.visible');
    });
});
