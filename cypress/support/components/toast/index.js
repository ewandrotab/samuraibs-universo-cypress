///  <reference types="cypress"/>

import {el} from './elements'

class Toast {

    shouldHaveText(expectText) {
        cy.get(el.toast, {timeout: 10000})
            .should('be.visible')
            .should('have.css', 'opacity', '1', {timeout: 1500})
            .find('p')
            .should('be.visible')
            .and('have.text', expectText)
    }
}
export default new Toast()