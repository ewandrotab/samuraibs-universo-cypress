///  <reference types="cypress"/>

it('webapp deve estar online', () => {
    
    cy.visit('/')

    cy.title().should('equal', 'Samurai Barbershop by QAninja')
});