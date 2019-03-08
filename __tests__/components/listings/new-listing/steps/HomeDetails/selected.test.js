import React from 'react'
import HomeDetails from 'components/listings/new-listing/steps/HomeDetails'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from 'config/theme'
import { ThemeProvider } from 'styled-components'
import { HOME_TYPES } from 'components/listings/new-listing/steps/HomeDetails/constants'

it('renders with an already selected home type', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <HomeDetails
        type={HOME_TYPES.house}
      />
    </ThemeProvider>).toJSON()
  expect(tree).toMatchSnapshot()
})
