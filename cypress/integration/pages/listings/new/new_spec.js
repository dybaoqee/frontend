import * as colors from 'constants/colors'
import convertColor from 'utils/color_converter'

describe('Add Listing', () => {
  context('Unauthenticated', () => {
    it('should redirect to login page', () => {
      cy.visit('/imoveis/adicionar').then((resp) => {
        expect(resp.location.pathname).to.include('/login')
      })
    })
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
      cy.url().should('not.include', 'login')
      cy.url().should('include', '/imoveis/adicionar')
    })

    it('should display error on input if address name does not exist', () => {
      cy.server()
      const wrongAddress = 'thisaddressshouldnotexist'
      let $input = Cypress.$('input[name=street]')

      cy
        .route(
          'GET',
          `/maps/autocomplete?q=${encodeURI(wrongAddress)}`,
          'fixture:maps/autocomplete/non-existent_address.json'
        )
        .as('getWrongAddress')

      cy.wrap($input).type(wrongAddress)
      cy.wait('@getWrongAddress')

      cy
        .wrap($input)
        .should(
          'have.css',
          'border',
          `1px solid ${convertColor(colors.red.medium)}`
        )
    })

    it('should select the correct address', () => {
      cy.server()
      const input = cy.get('input[name=street]')
      let correctAddress = 'Rua José Getúlio'
      cy
        .route(
          'GET',
          '/maps/autocomplete?q=*',
          'fixture:maps/autocomplete/address.json'
        )
        .as('getRightAddress')
      cy.focused().clear()
      input.type('Rua José Getúlio')
      cy.wait(500).then(function() {
        const $input = Cypress.$('input[name=street]')
        $input
          .next()
          .children()[0]
          .click()
        cy
          .get('input')
          .first()
          .focus()
          .type(
            '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}217'
          )
      })

      cy.wait(500).then(function() {
        const $input = Cypress.$('input[name=street]')
        $input
          .next()
          .children()[0]
          .click()
      })
    })
  })
})
