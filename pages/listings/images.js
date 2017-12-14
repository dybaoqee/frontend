
import { editListing, updateListing } from '../../services/listing-api'

import Layout from '../../components/main-layout'

export default class ListingImages extends Component {
  static async getInitialProps(context) {
    if (redirectIfNotAuthenticated(context)) {
      return {}
    }

    return {}
  }
  render() {
    return (
      <Layout>
        <div>
          <h1>Editar Imagens</h1>
        </div>
      </Layout>
    )
  }
}
