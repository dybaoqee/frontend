import React from 'react'
import ButtonGroupFilter from 'components/listings/shared/ListingFilter/components/ButtonGroupFilter'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from 'config/theme'
import { ThemeProvider } from 'styled-components'

describe('<ButtonGroupFilter/>', () => {
  it('should render component', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <ButtonGroupFilter
          initialValue={0}
          userValue={1}
          onChange={(value) => {}}
          values={[
            {value: 0, label: 'Sem vagas'},
            {value: 1, label: '1'},
            {value: 2, label: '2'},
            {value: 3, label: '3'},
            {value: 4, label: '4'},
            {value: 5, label: '+'},
          ]}
        />
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
