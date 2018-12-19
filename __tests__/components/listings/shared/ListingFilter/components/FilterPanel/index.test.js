import React from 'react'
import FilterPanel from 'components/listings/shared/ListingFilter/components/FilterPanel'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

describe('<FilterPanel/>', () => {
  it('should render component', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <FilterPanel
          show={true}
          close={() => {}}
          apply={() => {}}
          clear={() => {}}
          panelPosition={{left: 0, top: 0}}
        />
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
