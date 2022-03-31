import {el} from './elements'

class Toast {

    shouldHaveText(expectText) {
        cy.get(el.toast, {timeout: 10000})
            .should('be.visible')
            .find('p')
            .should('be.visible')
            .and('have.text', expectText)
    }
}
export default new Toast()