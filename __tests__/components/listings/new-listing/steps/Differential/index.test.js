import React from 'react'
import Differential from 'components/listings/new-listing/steps/Differential'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Differential />
    </ThemeProvider>).toJSON()
  expect(tree).toMatchSnapshot()
})
