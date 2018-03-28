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
      cy.get('input[name=email]').type('foo@bar.com')
      cy.get('input[name=password]').type('foobar{enter}')

      cy.url().should('include', '/imoveis/adicionar')
    })
  })
})
