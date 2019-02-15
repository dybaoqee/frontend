import React from 'react'
import Pricing from 'components/listings/new-listing/steps/Pricing'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from 'config/theme'
import { ThemeProvider } from 'styled-components'

// react-text-mask currently breaks snapshot tests. This is a workaround.
// https://github.com/text-mask/text-mask/issues/427
jest.mock('react-text-mask', () => props => <input type="text" {...{ ...props }} />);

it('renders editing price state', () => {
  const pricing = {
    suggestedPrice: 1000,
    userPrice: 1100,
    editingPrice: true
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
