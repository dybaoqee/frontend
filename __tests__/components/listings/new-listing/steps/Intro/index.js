import React from 'react';
import Intro from 'components/listings/new-listing/steps/Intro';
import renderer from 'react-test-renderer';
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Intro />
    </ThemeProvider>).toJSON()
  expect(tree).toMatchSnapshot()
})
