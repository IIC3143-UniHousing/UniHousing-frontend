describe("ViewHousing Interactions", () => {
    beforeEach(() => {
        cy.visit('/housing/view?id=12345'); // Adjust the ID as needed
    });

    it('should display housing details', () => {
        cy.contains('Detalles de la Propiedad').should('be.visible');
        cy.get('.housing-title').should('contain', 'Test Housing');
        cy.get('.housing-description').should('contain', 'This is a test housing description.');
        cy.get('.housing-address').should('contain', '123 Test St, Test City');
        cy.get('.housing-price').should('contain', '$500');
    });

    it('should allow users to contact the owner', () => {
        cy.get('button.contact-owner').click();
        cy.contains('Formulario de Contacto').should('be.visible');
        cy.get('input[name="name"]').type('John Doe').should('have.value', 'John Doe');
        cy.get('input[name="email"]').type('