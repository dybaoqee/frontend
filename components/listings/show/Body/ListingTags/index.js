import React, {Component} from 'react'
import PropTypes from 'prop-types'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import TagButton from '@emcasa/ui-dom/components/TagInput/Button'

class ListingTags extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        nameSlug: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
      })
    )
  }

  render () {
    const {tags} = this.props
    return (
      <View mb={2} mt={2}>
        <Row flexWrap="wrap">
          {tags.map(({name, uuid}) => (
            <TagButton
              ml={0}
              mr={2}
              mt={1}
              mb={1}
              height="small"
              key={uuid}>
              {name}
            </TagButton>
          ))}
        </Row>
      </View>
    )
  }
}

export default ListingTags
