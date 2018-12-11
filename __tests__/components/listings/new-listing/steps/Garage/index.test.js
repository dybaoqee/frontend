import React from 'react'
import Garage from 'components/listings/new-listing/steps/Garage'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Garage />
    </ThemeProvider>).toJSON()
  expect(tree).toMatchSnapshot()
})
