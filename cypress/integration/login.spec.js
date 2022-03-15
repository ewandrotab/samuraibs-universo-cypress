///  <reference types="cypress"/>

import loginPage from '../support/pages/login'
import dasboardPage from '../support/pages/dashboard'

describe('login', function () {    

    context('quando o usuário já existe', function () {
        
        const user = {
            name: 'Administrador',
            email: 'admin@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }
        before(function () {
            cy.task('removeUser', user.email).then(function (result) {
                console.log(result)
            })

            cy.request({
                url: 'http://localhost:3333/users',
                method: 'POST',
                body: user
            }).then(function (response) {
                expect(response.status).to.equal(200)
            })

        });
        it('então deve ser logado com sucesso', function () {

            cy.intercept({
                method: 'GET',
                path:'/appointments/days'
            },
            {
               statusCode: 200 
            }).as('getDays')
            
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            cy.wait('@getDays')
            dasboardPage.shouldLoggedIn(user)

        });
    });

    context('quando informo a senha incorreta', function () {

        const user = {
            name: 'Mário Benício Caleb Caldeira',
            email: 'mario.caleb@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
             cy.task('removeUser', user.email).then(function (result) {
                 console.log(result)
             })

            cy.request({
                url: 'http://localhost:3333/users',
                method: 'POST',
                body: user
            }).then(function (response) {
                expect(response.status).to.equal(200)
            })           

        });

        it('então o usuário não deve ser logado', function () {

            const incorretUser = {
                email: 'admin2@samuraibs.com',
                password: 'abc123',
            }
            
            loginPage.go()
            loginPage.form(incorretUser)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')


        });
    });

    context('quando informo um email com formato inválido', function () {

        const user = {
            name: 'Maria da Paz',
            email: 'mariapaz.samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }
        it('deve exibir mensagem de alerta', function () {

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            loginPage.alertHaveText('Informe um email válido')
        });
    });

    context('quando não preencho nenhum dos campos', function () {

        const alertMessages = ['E-mail é obrigatório', 'Senha é obrigatória']

        before(function () {
            loginPage.go()
            loginPage.submit()
        });

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                loginPage.alertHaveText(alert)
            });

        })

    });
});