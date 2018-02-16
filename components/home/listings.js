import ListingFeed from 'components/shared/ListingFeed'
import {getFeaturedListings} from 'services/listing-api'

export default class HomeListings extends ListingFeed {
  static async getInitialProps({query}) {
    return {
      listings: (await getFeaturedListings(query)).data.listings
    }
  }
}
