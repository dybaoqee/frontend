import {Component} from 'react'
import PropTypes from 'prop-types'
import {Query} from 'react-apollo'
import {GET_LISTINGS} from 'graphql/listings/queries'
import Link from 'next/link'
import {buildNeighborhoodSlug} from 'lib/listings'
import Text from '@emcasa/ui-dom/components/Text'
import ListingCard from 'components/listings/shared/ListingCard'
import {ListContainer} from 'components/shared/ListingInfiniteScroll/styles'
import {
  Wrapper,
  Container,
  MoreButtonWrapper,
  MoreButton
} from './styles'

class ListingFeed extends Component {
  render() {
    const {currentUser, currentListing, listings, variables} = this.props
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
                <Text as="h3" color="grey" fontWeight="bold">Outros imóveis no bairro</Text>
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
                  <Link
                    href={`/listings`}
                    as={buildNeighborhoodSlug(currentListing)}
                    passHref
                  >
                    <MoreButton as="a" height="tall">Ver mais imóveis</MoreButton>
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
