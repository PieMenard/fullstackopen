describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const firstUser = {
            name: 'First User',
            username: 'first_user',
            password: 'test'
        }
        const secondUser = {
            name: 'Second User',
            username: 'second_user',
            password: 'test'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, firstUser)
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser)
        cy.visit('')
    })

    it('Login form is shown', function() {
        cy.contains('login')
        cy.contains('username')
        cy.contains('password')
    })
    it('user can log in', function() {
        cy.contains('login').click()
        cy.get('#username').type('first_user')
        cy.get('#password').type('test')
        cy.get('#login-button').click()

        cy.contains('First User logged in')
    })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'first_user', password: 'test' })

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
                    url: 'https://www.test.com/',
                })
                cy.createBlog({
                    title: 'second test blog',
                    author: 'cypress',
                    url: 'https://www.test.com/',
                })
                cy.createBlog({
                    title: 'third test blog',
                    author: 'cypress',
                    url: 'https://www.test.com/',
                })
            })
            it('user can like a blog', function() {
                cy.contains('first test blog').parent().find('#view-button').click()
                cy.contains('likes 0')
                cy.contains('first test blog').parent().get('#like-button').click()
                cy.contains('likes 1')
            })

            it('user can delete a blog', function () {
                cy.contains('second test blog').parent().find('#delete-button').click()
            })

            it("user can't delete other users blogs, can delete own" , function () {
                cy.contains('logout').click()
                cy.get('#username').type('second_user')
                cy.get('#password').type('test')
                cy.get('#login-button').click()
                cy.contains('Second User logged in')
                cy.contains('second test blog').parent().find('#delete-button').should('not.exist')
                cy.createBlog({
                    title: 'blog by Second User',
                    author: 'cypress',
                    url: 'https://www.test.com/',
                })
                cy.contains('blog by Second User').parent().find('#delete-button').click()
            })
            it('blogs are ordered by likes', function () {
                cy.createBlog({
                    title: 'blog with most likes',
                    author: 'cypress',
                    url: 'https://www.test.com/',
                })
                cy.contains('blog with most likes').parent().find('#view-button').click()
                cy.contains('blog with most likes').parent().get('#like-button').click()
                cy.createBlog({
                    title: 'blog with second most likes',
                    author: 'cypress',
                    url: 'https://www.test.com/',
                })
                cy.contains('blog with second most likes').parent().find('#view-button').click()
                cy.contains('blog with second most likes').parent().get('#like-button').click()
                cy.contains('blog with most likes').parent().find('#view-button').click()
                cy.contains('blog with most likes').parent().get('#like-button').click()

                cy.get('.blog').eq(0).should('contain', 'blog with most likes')
                cy.get('.blog').eq(1).should('contain', 'blog with second most likes')
            })
        })


    })
    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('first_user')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'First User logged in')
    })
})