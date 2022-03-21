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
            cy.postUser(user)

        });
        it('então deve ser logado com sucesso', function () {
                        
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()            
            dasboardPage.header.userLoggedIn(user)

        });
    });

    context('quando informo a senha incorreta', function () {

        let user = {
            name: 'Mário Benício Caleb Caldeira',
            email: 'mario.caleb@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function(){
                user.password = 'abc123'
            })
            

        });

        it('então o usuário não deve ser logado', function () {
            
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')


        });
    });

    context('quando informo um email com formato inválido', function () {

        const emails = [
            'ewandro.com.br', 'yahoo.com', '@gmail.com', '@', 'ewandro@', '111', '&*^&*^&*^', 'xpto123'
        ]

        before(function() {

            loginPage.go()
            
        });

        emails.forEach(function(email){

            it('não deve logar com o email: '+ email, function () {

                const user = {email: email, password: 'pwd123'}
                
                loginPage.form(user)
                loginPage.submit()
                loginPage.alertHaveText('Informe um email válido')
            });

        })
        
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