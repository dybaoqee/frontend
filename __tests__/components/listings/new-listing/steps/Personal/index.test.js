import React from 'react'
import Personal from 'components/listings/new-listing/steps/Personal'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Personal />
    </ThemeProvider>).toJSON()
  expect(tree).toMatchSnapshot()
})
