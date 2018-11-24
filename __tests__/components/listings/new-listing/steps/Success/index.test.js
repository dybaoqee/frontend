import React from 'react';
import Success from 'components/listings/new-listing/steps/Success';
import renderer from 'react-test-renderer';
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Success
        tour={{
          day: '2018-11-23'
        }}
        location={{
          address: 'Av. Vieira Souto, 600'
        }}
        pricing={{
          userPrice: 1000000
        }}
        listing={{
          id: 1
        }}
      />
    </ThemeProvider>).toJSON()
  expect(tree).toMatchSnapshot()
})
