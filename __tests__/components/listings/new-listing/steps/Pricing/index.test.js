import React from 'react'
import Pricing from 'components/listings/new-listing/steps/Pricing'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

it('renders an empty state', () => {
  const pricing = {
    suggestedPrice: '1000',
    userPrice: '1100',
    editingPrice: null
  }

  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Pricing
        location={{}}
        pricing={pricing}
      />
    </ThemeProvider>).toJSON()
  expect(tree).toMatchSnapshot()
})
