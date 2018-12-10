import React from 'react'
import MobileAddressButton from 'components/shared/MobileAddressButton'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

import { isMobile } from 'lib/mobile'
jest.mock('lib/mobile')
isMobile.mockImplementation(() => false)

describe('<MobileAddressButton/>', () => {
  it('should render component on desktop', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <MobileAddressButton onClick={() => {}} />
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
