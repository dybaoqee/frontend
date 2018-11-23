import React from 'react';
import Bedrooms from 'components/listings/new-listing/steps/Bedrooms';
import renderer from 'react-test-renderer';
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

describe('<AddressInput/>', () => {
  it('should render previously selected bedroom options', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <Bedrooms
          rooms={{
            bedrooms: 3,
            suites: 1,
            bathrooms: 3
          }}
        />
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
