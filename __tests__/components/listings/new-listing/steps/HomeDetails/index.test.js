import React from 'react'
import HomeDetails from 'components/listings/new-listing/steps/HomeDetails'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <HomeDetails />
    </ThemeProvider>).toJSON()
  expect(tree).toMatchSnapshot()
})
