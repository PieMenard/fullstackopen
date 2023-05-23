describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Cy Test User',
            username: 'cy_test_user',
            password: 'test'
        }
        cy.request('POST', 'http://localhost:3003/api/users',user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('login')
        cy.contains('username')
        cy.contains('password')
    })
    it('user can log in', function() {
        cy.contains('login').click()
        cy.get('#username').type('cy_test_user')
        cy.get('#password').type('test')
        cy.get('#login-button').click()

        cy.contains('Cy Test User logged in')
    })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('cy_test_user')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Cy Test User logged in')
    })
})