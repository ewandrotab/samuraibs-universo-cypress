///  <reference types="cypress"/>

it('webapp deve estar online', () => {
    // Um simples comentário
    
    cy.visit('/')

    cy.title().should('equal', 'Samurai Barbershop by QAninja')
});
