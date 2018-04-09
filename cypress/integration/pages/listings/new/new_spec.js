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
