import {el} from './elements'
import toast from '../../components/toast'

class SignupPage {

    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit('/signup')
    }

    form(user) {
        cy.get(el.name)
            .clear()
            .type(user.name)
        
        cy.get(el.email)
            .clear()
            .type(user.email)
        
        cy.get(el.password)
            .clear()
            .type(user.password)
    }

    submit() {
        cy.contains(el.signupButton).click()
    }

    alertHaveText(expectText){
        cy.contains('.alert-error', expectText).should('be.visible')
    }


}

export default new SignupPage()