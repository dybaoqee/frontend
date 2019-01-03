import React from 'react'
import ExpandButton from 'components/listings/shared/ListingFilter/components/ExpandButton'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

describe('<ExpandButton/>', () => {
  it('should render component', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <ExpandButton
          expanded={false}
          onClick={() => {}}
        />
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
