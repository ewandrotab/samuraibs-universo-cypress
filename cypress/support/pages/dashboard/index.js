import {el} from './elements'

class DashboardPage {
    
    shouldLoggedIn(user){
        cy.url().should('include', '/dashboard')
        cy.contains('span', 'Bem-vindo').should('be.visible')
        cy.get(el.linkProfile).should('be.visible')
        cy.contains('strong', user.name).should('be.visible')
        
    }
}
export default new DashboardPage()