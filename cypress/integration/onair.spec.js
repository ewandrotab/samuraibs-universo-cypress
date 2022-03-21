///  <reference types="cypress"/>

describe('home', function () {
    it('webapp deve estar online', function() {
        // Um simples comentário
        
        cy.visit('/')
    
        cy.title().should('equal', 'Samurai Barbershop by QAninja')
    });
});


