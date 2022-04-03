///  <reference types="cypress"/>

import forgotPassPage from '../support/pages/forgotpass'
import resetPassPage from '../support/pages/resetpass'


describe('resgate de senha', function () {

    before(function () {
        cy.fixture("recovery").then(function (recovery) {
            this.data = recovery
        })

    })

    context('quando o usuário esquece a senha', function () {

        before(function () {
            cy.postUser(this.data)
        })

        it('deve poder resgatar por email', function () {

            forgotPassPage.go()   
            forgotPassPage.form(this.data.email)     
            forgotPassPage.submit()    
            forgotPassPage.toast.shouldHaveText('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')            

        })
    })

    context('quando o usuário solicita o resgate', function () {

        before(function(){
            
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)

        })
        it('deve poder cadastrar uma nova senha', function ()  {

            const token = Cypress.env('recoveryToken')
            
            resetPassPage.go(token) 
            resetPassPage.form('abc123', 'abc123')  
            resetPassPage.submit()

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            resetPassPage.toast.shouldHaveText(message)
            
        });
    });

});