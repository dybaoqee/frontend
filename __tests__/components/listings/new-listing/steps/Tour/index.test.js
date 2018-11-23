import React from 'react';
import Tour from 'components/listings/new-listing/steps/Tour';
import renderer from 'react-test-renderer';
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Tour
        services={{
          tourOptions: [
            '2018-11-16T09:15:57.739175',
            '2018-11-16T17:15:57.739175',
            '2018-11-15T09:15:57.739175',
            '2018-11-15T17:15:57.739175',
            '2018-11-14T09:15:57.739175',
            '2018-11-14T17:15:57.739175',
            '2018-11-13T09:15:57.739175',
            '2018-11-13T17:15:57.739175',
            '2018-11-12T09:15:57.739175',
            '2018-11-12T17:15:57.739175'
          ]
      }}
      />
    </ThemeProvider>).toJSON()
  expect(tree).toMatchSnapshot()
})
