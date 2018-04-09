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
