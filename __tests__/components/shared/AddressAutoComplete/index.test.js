import React from 'react'
import AddressAutoComplete from 'components/shared/AddressAutoComplete'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

describe('<AddressAutoComplete/>', () => {
  it('should render component', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <AddressAutoComplete
          onBackPressed={() => {}}
          onSelectAddress={() => {}}
        />
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
