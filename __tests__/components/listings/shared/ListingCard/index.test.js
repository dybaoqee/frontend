import React from 'react'
import ListingCard from 'components/listings/shared/ListingCard'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import theme from '@emcasa/ui'
import { ThemeProvider } from 'styled-components'
import { MockedProvider } from 'react-apollo/test-utils'

describe('<ListingCard/>', () => {
  it('should render component', () => {
    const tree = renderer.create(
      <MockedProvider>
      <ThemeProvider theme={theme}>
        <ListingCard
          listing={{
            price: 1000000,
            address: {
              city: 'Rio de Janeiro',
              state: 'RJ',
              neighborhood: 'Bairro',
              street: 'Rua tal'
            },
            images: []
          }}
          favorited={[]}
        />
      </ThemeProvider></MockedProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
