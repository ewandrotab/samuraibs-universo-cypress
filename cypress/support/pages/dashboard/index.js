import { el } from './elements'
import header from '../../components/header'

class DashboardPage {
    
    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, {timeout: 7000}).should('be.visible')
    }

    selectDay(day) {

        const target = new RegExp('^' + day + '$', 'g')

        cy.get(el.boxDay).contains(target)
            .click({force:true})
    }

    appointmentShouldBeVisible(customer, hour) {
        cy.contains('div', customer.name)
            .should('be.visible')
            .parent()
            .contains(el.boxHour, hour)
            .should('be.visible')

    }
    
}
export default new DashboardPage()