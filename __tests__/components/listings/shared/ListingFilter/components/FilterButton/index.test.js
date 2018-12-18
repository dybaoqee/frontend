import React from 'react'
import FilterButton from 'components/listings/shared/ListingFilter/components/FilterButton'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

describe('<FilterButton/>', () => {
  it('should render component', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <FilterButton
          value={1}
          active={false}
          onClick={() => {}}
        />
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
