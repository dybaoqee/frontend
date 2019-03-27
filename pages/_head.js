import {Head} from 'next/document'
import {readFileSync} from 'fs'
import {join} from 'path'
import React from 'react'

/**
 We are overriding the default Head from next/document component behavior, that
 includes the static .js files with rel=preload on <head> tag at html document.
 We do that because we want the static .js files to be loaded after the HTML
 and CSS are loaded and parsed.
 The overridden methods are: getPreloadDynamicChunks and getPreloadMainLinks
**/

const exportDir = 'dist'
export default class NextHeadWithInlineCss extends Head {
  getCssLinks() {
    const {assetPrefix, files} = this.context._documentProps
    if (!files || files.length === 0) return null

    if (this.context._documentProps.dev) {
      return super.getCssLinks()
    }

    // Inline CSS
    return files.filter((file) => /\.css$/.test(file)).map((file) => (
      <style
        key={file}
        nonce={this.props.nonce}
        data-href={`${assetPrefix}/_next/${file}`}
        dangerouslySetInnerHTML={{
          __html: readFileSync(
            join(process.cwd(), exportDir, '_next', file),
            'utf-8'
          )
        }}
      />
    ))
  }

  // Disable preload stuffs
  getPreloadDynamicChunks() {
    return null
  }

  getPreloadMainLinks() {
    return null
  }

  render() {
    const {head, styles} = this.context._documentProps

    let children = this.props.children
    // show a warning if Head contains <title> (only in development)
    if (process.env.NODE_ENV !== 'production') {
      children = React.Children.map(children, (child) => {
        if (child && child.type === 'title') {
          // eslint-disable-next-line no-console
          console.warn(
            'Warning: <title> should not be used in _document.js <Head>. https://err.sh/next.js/no-document-title'
          )
        }
        return child
      })
    }

    return (
      <head {...this.props}>
        {head}
        {this.getCssLinks()}
        {styles || null}
        {children}
      </head>
    )
  }
}
