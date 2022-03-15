import {el} from './elements'
import toast from '../../components/toast'

class LoginPage {
    
    constructor() {
        this.toast = toast
    }
    
    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get(el.email).should('be.visible').type(user.email)
        cy.get(el.password).should('be.visible').type(user.password)
    }

    submit(){
        cy.contains(el.loginButton).click()
    }    

    alertHaveText(expectText){
        cy.contains('.alert-error', expectText).should('be.visible')
    }
}

export default new LoginPage()