/// <reference types="cypress" />

context('Login do Saucedemo', () => {
    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/v1/")
    });

    //scenarios
    it('Login válido', () => {
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('#login-button').click()
        cy.get('.product_label').should('have.text', "Products")
    })

    it('Login inválido', () => {
        cy.fixture('login-falhos.json').then((dados) => {

            dados.dadosLogin.forEach((dadoLogin) => {
                cy.get('[data-test="username"]').clear()
                cy.get('[data-test="password"]').clear()

                //conditional to receive empty values in username and password
                if (dadoLogin.username != ""){
                    cy.get('[data-test="username"]').type(dadoLogin.username)
                }

                if (dadoLogin.password != ""){
                    cy.get('[data-test="password"]').type(dadoLogin.password)
                }
                cy.get('#login-button').click()
                cy.get('[data-test="error"]').should('have.text', dadoLogin.message)

            });
        })

    })
});

