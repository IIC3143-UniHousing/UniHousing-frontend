describe('Housing Detail and Review Form', () => {
    const mockHousingId = '123';

    // Mock data for a logged-in student
    const mockEstudiante = {
        id: 2,
        name: 'Test Estudiante',
        email: 'estudiante@example.com',
        type: 'estudiante',
    };

    // Mock data for a logged-in owner
    const mockPropietario = {
        id: 1,
        name: 'Test Propietario',
        email: 'propietario@example.com',
        type: 'propietario',
    };

    // Mock initial data for the page
    const mockHousingDetail: any = {
        id: mockHousingId,
        title: 'Awesome Apartment',
        price: 500000,
        address: '123 Cypress Lane',
        description: 'A great place to test.',
        size: 70, rooms: 3, bathrooms: 2,
        images: ['https://example.com/image1.png'],
        owner: mockPropietario,
    };

    const mockInitialReviews = [
        { id: 1, score: 5, comment: 'Loved it!', date: new Date().toISOString(), user: { name: 'Previous User' } },
    ];

    beforeEach(() => {
        // Mock API responses before visiting the page
        cy.intercept('GET', `http://localhost:3000/api/housing/${mockHousingId}`, {
             body: { housing: mockHousingDetail },
        }).as('getHousing');
        
        cy.intercept('GET', `http://localhost:3000/api/reviews?housingId=${mockHousingId}`, {
            body: { reviews: mockInitialReviews },
        }).as('getReviews');
    });

    context('when user is a student', () => {
        beforeEach(() => {
            cy.window().then((win) => {
                win.localStorage.setItem('user', JSON.stringify(mockEstudiante));
                win.localStorage.setItem('access_token', 'fake-student-token');
            });
            cy.visit(`/housing/${mockHousingId}`);
            cy.wait(['@getHousing', '@getReviews']);
        });

        it('should display the review form', () => {
            cy.get('form').contains('Enviar Reseña').should('be.visible');
        });

        it('should allow changing the star rating', () => {
            // Find the 5 stars. The form should default to 5.
            cy.get('div[class*="cursor-pointer"]').find('svg.text-yellow-400').should('have.length', 5);

            // Click the 3rd star
            cy.get('div[class*="cursor-pointer"]').eq(2).click();
            cy.get('div[class*="cursor-pointer"]').find('svg.text-yellow-400').should('have.length', 3);
        });

        it('should successfully submit a new review', () => {
            const comment = 'This is a new test review.';
            const score = 4;

            cy.intercept('POST', 'http://localhost:3000/api/reviews', {
                statusCode: 201
            }).as('postReview');

            cy.intercept('GET', `http://localhost:3000/api/reviews?housingId=${mockHousingId}`, {
                body: {
                reviews: [
                    ...mockInitialReviews,
                    {
                    id: 2,
                    score,
                    comment,
                    date: new Date().toISOString(),
                    user: { name: 'Test Estudiante' }
                    }
                ]
                }
            }).as('getUpdatedReviews');

            cy.visit(`/housing/${mockHousingId}`);

            cy.wait(['@getHousing', '@getReviews']);

            cy.get('div[class*="cursor-pointer"]').eq(3).click();
            cy.get('textarea[placeholder="Escribe tu opinión sobre el lugar..."]').type(comment);
            cy.get('button[type="submit"]').click();

            cy.wait('@postReview');
            cy.wait('@getUpdatedReviews');

            cy.contains(comment).should('be.visible');
            cy.contains('Test Estudiante').should('be.visible');
        });

        it('should show an error message on submission failure', () => {
            cy.intercept('POST', 'http://localhost:3000/api/reviews', {
                statusCode: 400,
                body: { message: 'Tu reseña no pudo ser procesada.' }
            }).as('postReview');

            cy.get('textarea').type('This review will fail.');
            cy.get('form').contains('button', 'Enviar Reseña').click();

            cy.wait('@postReview');
            cy.contains('Tu reseña no pudo ser procesada.').should('be.visible');
            cy.contains('button', 'Enviar Reseña').should('not.be.disabled');
        });
    });

    context('when user is an owner or not logged in', () => {
        it('should NOT display the review form for an owner', () => {
            cy.window().then((win) => {
                win.localStorage.setItem('user', JSON.stringify(mockPropietario));
                win.localStorage.setItem('access_token', 'fake-owner-token');
            });
            cy.visit(`/housing/${mockHousingId}`);
            cy.wait(['@getHousing', '@getReviews']);

            // The form should not be in the DOM
            cy.get('[data-testid="review-form"]').should('not.exist');
        });
    });
});