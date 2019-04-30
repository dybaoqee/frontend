import React, {Component} from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import TagButton from '@emcasa/ui-dom/components/TagInput/Button'
import {buildNeighborhoodSlug} from 'lib/listings'

class ListingTags extends Component {
  static propTypes = {
    address: PropTypes.object,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        nameSlug: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
      })
    )
  }

  render () {
    const {tags, address} = this.props
    const baseUrl = buildNeighborhoodSlug({address})

    return (
      <View mb={2} mt={2}>
        <Row flexWrap="wrap">
          {tags.map(({name, nameSlug, uuid}) => {
            const url = `${baseUrl}/${nameSlug}`
            return (
              <Link passHref href={url} key={uuid}>
                <TagButton
                  ml={0}
                  mr={2}
                  mt={1}
                  mb={1}
                  height="small">
                  {name}
                </TagButton>
              </Link>
            )
            }
          )}
        </Row>
      </View>
    )
  }
}

export default ListingTags
