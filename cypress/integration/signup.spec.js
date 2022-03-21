///  <reference types="cypress"/>

import signupPage from '../support/pages/signup'

//import faker from '@faker-js/faker'

describe('cadastro', () => {

    context('quando o usuário é novato', () => {
        //const email = 'faker.internet.email()'
        const user = {
            name: 'Ewandro Luiz Taborda',
            email: 'ewandro@samuraibs.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('removeUser', user.email).then(function (result) {
                console.log(result)
            })
        });

        it('deve cadastrar com sucesso', () => {

            signupPage.go()

            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        });
    });

    context('quando o email já existe', () => {
        const user = {
            name: 'Millena Oliveira',
            email: 'millena@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)
        });

        it('não deve cadastrar o usuário', () => {

            signupPage.go()

            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        });
    });

    context('quando o email é incorreto', () => {

        const user = {
            name: 'Elizabeth Solbech',
            email: 'liza.yahoo.com',
            password: 'pwd123',
        }
        it('deve exibir mensagem de alerta', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()

            signupPage.alertHaveText('Informe um email válido')
        });
    });

    context('quando a senha possui menos de 6 caracteres', () => {

        const passwords = ['1', '1a', '1ab', '1abc', '1abcd']


        before(function() {
            signupPage.go()
        });

        passwords.forEach(function (pass) {

            const user = {name: 'Jason Friday', email: 'jason@samuraibs.com', password: pass }
            it('não deve cadastrar com a senha: ' + pass, () => {
                signupPage.form(user)
                signupPage.submit()

            });

        })

        afterEach(() => {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        });

    });

    context('quando não preencho nenhum dos campos', () => {
        
        const alertMessages = ['Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória']

        before(() => {
            signupPage.go()
            signupPage.submit()
        });

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLowerCase(), () => {
                signupPage.alertHaveText(alert)
            });

        })
        
    });


});