import React from 'react'
import AddressInput from 'components/listings/new-listing/steps/AddressInput'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from 'config/theme'
import { ThemeProvider } from 'styled-components'

describe('<AddressInput/>', () => {
  it('should render a clean page', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <AddressInput />
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
