import {el} from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class LoginPage {
    
    constructor() {
        this.toast = toast
        this.alert = alert
    }
    
    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get(el.email)
            .should('be.visible')
            .clear()
            .type(user.email)
        
        cy.get(el.password)
            .should('be.visible')
            .clear()
            .type(user.password)
    }

    submit(){
        cy.contains(el.loginButton).click()
    }    

    
}

export default new LoginPage()