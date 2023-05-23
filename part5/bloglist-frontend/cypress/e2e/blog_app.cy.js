describe('Blog app', function() {
    beforeEach(function() {
        cy.visit('')
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'Cy Test User',
            username: 'cy_test_user',
            password: 'test'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
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
    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'cy_test_user', password: 'test' })

        })

        it('A blog can be created', function() {
            cy.get('#new-button').click()
            cy.get('#title-input').type('a blog created by cypress')
            cy.get('#author-input').type('Cypress Hill')
            cy.get('#url-input').type('http://testurl.com')
            cy.contains('submit').click()
            cy.contains('a blog created by cypress')
        })
        describe('and several blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'first test blog',
                    author: 'cypress',
                    blog_url: 'https://www.test.com/',
                })
                cy.createBlog({
                    title: 'second test blog',
                    author: 'cypress',
                    blog_url: 'https://www.test.com/',
                })
                cy.createBlog({
                    title: 'third test blog',
                    author: 'cypress',
                    blog_url: 'https://www.test.com/',
                })
            })
        })


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