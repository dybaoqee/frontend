import React from 'react'
import NeighborhoodAutoComplete from 'components/shared/NeighborhoodAutoComplete'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from 'config/theme'
import { ThemeProvider } from 'styled-components'
import { MockedProvider } from 'react-apollo/test-utils'
import { districts } from '__mocks__/districts'

describe('<NeighborhoodAutoComplete/>', () => {
  it('should render component', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={districts}>
          <NeighborhoodAutoComplete
            mountWithVisiblePredictions={true}
            onBackPressed={() => {}}
            onSelectAddress={() => {}}
          />
        </MockedProvider>
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
