import {Component} from 'react'
import PropTypes from 'prop-types'
import {Query} from 'react-apollo'
import {GET_LISTINGS} from 'graphql/listings/queries'
import Link from 'next/link'
import Text from '@emcasa/ui-dom/components/Text'
import ListingCard from 'components/listings/shared/ListingCard'
import {
  Wrapper,
  Container,
  MoreButtonWrapper,
  MoreButton
} from './styles'
import {ListContainer} from 'components/shared/ListingInfiniteScroll/styles'

class ListingFeed extends Component {
  render() {
    const {currentUser, listings, variables} = this.props
    return (
      <Query
        query={GET_LISTINGS}
        variables={variables}
        ssr={true}
      >
        {({error, data}) => {
          if (!data) {
            return null
          }
          if (error) {
            return `Error!: ${error}`
          }
          return (
            <Wrapper>
              <Container>
                <Text as="h3" color="grey" fontWeight="bold">Veja também</Text>
                <ListContainer>
                  {data.listings.listings.map((listing) => {
                    return (
                      <ListingCard
                        key={listing.id}
                        listing={listing}
                        currentUser={currentUser}
                        favorited={[]}
                        related
                      />
                    )
                  })}
                </ListContainer>
                <MoreButtonWrapper>
                  <Link passHref href="/listings" as="/imoveis">
                    <MoreButton as="a" height="tall">Explorar mais imóveis</MoreButton>
                  </Link>
                </MoreButtonWrapper>
              </Container>
            </Wrapper>
          )
        }}
      </Query>
    )
  }
}

ListingFeed.propTypes = {
  listings: PropTypes.array,
  currentUser: PropTypes.object
}

export default ListingFeed
