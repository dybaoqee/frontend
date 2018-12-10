import React from 'react'
import NeighborhoodAutoComplete from 'components/shared/NeighborhoodAutoComplete'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'
import { MockedProvider } from 'react-apollo/test-utils'
import { districts } from '__mocks__/districts'
import { isMobile } from 'lib/mobile'

jest.mock('lib/mobile')
isMobile.mockImplementation(() => true)

describe('<NeighborhoodAutoComplete/>', () => {
  it('should render component on mobile', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={districts}>
          <NeighborhoodAutoComplete
            onBackPressed={() => {}}
            onSelectAddress={() => {}}
          />
        </MockedProvider>
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
