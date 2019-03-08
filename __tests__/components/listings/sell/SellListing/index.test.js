import React from 'react'
import SellListing from 'components/listings/sell/SellListing'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from 'config/theme'
import { ThemeProvider } from 'styled-components'

describe('<SellListing/>', () => {
  it('should render a clean page', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <SellListing />
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
