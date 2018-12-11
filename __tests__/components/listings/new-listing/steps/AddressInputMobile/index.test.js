import React from 'react'
import AddressInputMobile from 'components/listings/new-listing/steps/AddressInputMobile'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

describe('<AddressInput/>', () => {
  it('should render a clean page', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <AddressInputMobile />
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
