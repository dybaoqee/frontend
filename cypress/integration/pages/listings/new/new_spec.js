import * as colors from 'constants/colors'
import convertColor from 'utils/color_converter'
import axios from 'axios'
var listing = require('cypress/fixtures/listings/show.json')
var related = require('cypress/fixtures/listings/related.json')

export const mockListingCreated = function() {
  const MockAdapter = require('axios-mock-adapter')
  // This sets the mock adapter on the default instance
  var mock = new MockAdapter(axios)

  mock.onGet('/listings/1').reply(200, {
    listing: {...listing.listing}
  })

  mock.onGet('/listings/1/related').reply(200, {
    listings: related.listings
  })
}

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
      cy.route(
        'GET',
        '/maps/placeDetail?q=*',
        'fixture:maps/placedetail/place_detail.json'
      )
      const input = cy.get('input[name=street]')
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

        cy.route(
          'GET',
          '/maps/autocomplete?q=*',
          'fixture:maps/autocomplete/address_complete.json'
        )

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

    it('should be able to navigate to next page', () => {
      const $advanceButton = Cypress.$('button:contains("Próximo")')
      cy.wrap($advanceButton).not('have.prop', 'disbaled')
      cy.wrap($advanceButton).click()
    })

    it('should display error if listing type is not defined', () => {
      const $advanceButton = Cypress.$('button:contains("Próximo")')
      cy.wrap($advanceButton).click()
      let $select = Cypress.$('.Select, .type')

      cy
        .wrap($select)
        .should(
          'have.css',
          'border',
          `1px solid ${convertColor(colors.red.medium)}`
        )
    })

    it('should be able to select listing type', () => {
      cy
        .get('div.Select-control input')
        .first()
        .type('Ap', {force: true})
        .get('.Select-option:contains(Apartamento)')
        .click()
    })

    it('should be able to create listing', () => {
      mockListingCreated()
      cy.server()
      cy.route(
        'POST',
        `${Cypress.env('apiUrl')}/listings`,
        'fixture:listings/new.json'
      )
      cy.get('button:contains("Próximo")').click()
    })
  })
})
