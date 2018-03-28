describe('Add Listing', () => {
  context('Unauthenticated', () => {
    it('should redirect to login page', () => {
      cy.visit('/imoveis/adicionar').then((resp) => {
        expect(resp.location.pathname).to.include('/login')
      })
    })

    it('should be redirected to listing creation page after login', () => {})
  })

  context('Authenticated', () => {
    it('should be redirected to listing creation after login', () => {
      cy.server() // enable response stubbing
      cy.route(
        'POST',
        `${Cypress.env('apiUrl')}/users/login`,
        'fixture:users/login.json'
      )
      cy.get('input[name=email]').type('foo@bar.com')
      cy.get('input[name=password]').type('foobar{enter}')
      cy.url().should('include', '/imoveis/adicionar')
    })
  })
})
