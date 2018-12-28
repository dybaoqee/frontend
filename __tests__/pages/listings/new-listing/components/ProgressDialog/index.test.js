import React from 'react'
import ProgressDialog from 'pages/listings/new-listing/components/ProgressDialog'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'

describe('<ProgressDialog/>', () => {
  it('should render component', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <ProgressDialog
          address="Rua tal"
          onReset={() => {}}
          onResume={() => {}}
        />
      </ThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
