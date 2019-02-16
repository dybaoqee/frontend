import React from 'react'
import MobileAddressButton from 'components/shared/MobileAddressButton'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from 'config/theme'
import {ThemeProvider} from 'styled-components'
import {mockBreakpoint} from '@emcasa/ui-dom/components/Breakpoint'

mockBreakpoint.phone()

describe('<MobileAddressButton/>', () => {
  it('should render component on mobile', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <MobileAddressButton onClick={() => {}} />
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
