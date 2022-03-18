import { el } from './elements'

class Header {

    userLoggedIn(user) {
        cy.url().should('include', '/dashboard')
        cy.contains('span', 'Bem-vindo').should('be.visible')
        cy.get(el.fullName, {timeout: 7000})
            .should('be.visible')
            .and('have.text', user.name)

    }

}

export default new Header()