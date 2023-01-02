import type {} from 'cypress'

describe('Zyax-frontend', () => {
  it('Visit localhost', () => {
    cy.visit('http://localhost:3000')

    // Check if page inputs are empty in first rendering
    // and error message shows if button clicked while
    // inputs are empty, also warning message shows while
    // pressing logout before logging in
    cy.get('[data-test-id="email"]').should('not.have.value')
    cy.get('[data-test-id="password"]').should('not.have.value')

    cy.get('[data-test-id="login"]').click()
    cy.get('[data-test-id="email-message"]').should('be.visible')
    cy.get('[data-test-id="password-message"]').should('be.visible')

    cy.get('[data-test-id="logout"]').click()
    cy.get('[data-test-id="warning"]').should('be.visible')

    // Checks if user is logged in with correct email and password
    // and success message shows if email and password was correct
    // Also checks if localStorage will be updated with returned
    // tokens
    cy.get('[data-test-id="email"]').type('test@zyax.se')
    cy.get('[data-test-id="password"]').type('!zyaxSe981')
    cy.get('[data-test-id="login"]')
      .click()
      .should(() => {
        expect(localStorage.getItem('accessToken')).exist
        expect(localStorage.getItem('refreshToken')).exist
      })

    cy.get('[data-test-id="success"]').should('be.visible')

    // Checks if user see error if the email and password is not correct
    cy.get('[data-test-id="email"]').type('test@zya.se')
    cy.get('[data-test-id="password"]').type('!zyaxSe1')
    cy.get('[data-test-id="login"]').click()

    cy.get('[data-test-id="error"]').should('be.visible')

    // Checks if user is loggedout by clicking logout button
    // and tokens will be removed from localStorage
    cy.get('[data-test-id="logout"]')
      .click()
      .should(() => {
        expect(localStorage.getItem('accessToken')).to.be.null
        expect(localStorage.getItem('refreshToken')).to.be.null
      })

    cy.get('[data-test-id="loggedOut"]').should('be.visible')
  })
})
