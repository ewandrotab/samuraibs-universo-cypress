///  <reference types="cypress"/>

import signupPage from '../support/pages/signup'

//import faker from '@faker-js/faker'

describe('cadastro', function () {

    before(function () {
        cy.fixture('signup').then(function (signup) {
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })
    })

    context('quando o usuário é novato', function () {
        //const email = 'faker.internet.email()'


        before(function () {
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result)
                })
        });

        it('deve cadastrar com sucesso', function () {

            signupPage.go()

            signupPage.form(this.success)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        });
    });

    context('quando o email já existe', function () {
        

        before(function () {
            cy.postUser(this.email_dup)
        });

        it('não deve cadastrar o usuário', function () {

            signupPage.go()

            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        });
    });

    context('quando o email é incorreto', function () {

       
        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()

            signupPage.alert.haveText('Informe um email válido')
        });
    });

    context('quando a senha possui menos de 6 caracteres', function () {

        const passwords = ['1', '1a', '1ab', '1abc', '1abcd']


        before(function () {
            signupPage.go()
        });

        passwords.forEach(function (pass) {
            
            it('não deve cadastrar com a senha: ' + pass, function () {
                
                this.short_password.password = pass
                
                signupPage.form(this.short_password)
                signupPage.submit()

            });

        })

        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        });

    });

    context('quando não preencho nenhum dos campos', function () {

        const alertMessages = ['Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória']

        before(function () {
            signupPage.go()
            signupPage.submit()
        });

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                signupPage.alert.haveText(alert)
            });

        })

    });


});