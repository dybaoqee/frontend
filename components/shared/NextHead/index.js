import Head from 'next/head'
import {Fragment} from 'react'

const NextHead = (props) => {
  const {title, description, imageSrc, imageWidth, imageHeight, url, canonical} = props

  return (
    <Head>
      {title && (
        <Fragment>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </Fragment>
      )}

      {description && (
        <Fragment>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </Fragment>
      )}

      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="EmCasa" />
      <meta property="og:locale" content="pt_BR" />

      {url && (
        <Fragment>
          <meta property="og:url" content={url} />
          <meta name="twitter:url" content={url} />
        </Fragment>
      )}

      <meta name="twitter:card" content="summary" />

      {imageSrc && (
        <Fragment>
          <link rel="image_src" href={imageSrc} />
          <meta property="og:image" content={imageSrc} />
          <meta name="twitter:image" content={imageSrc} />
        </Fragment>
      )}

      {imageWidth && <meta property="og:image:width" content={imageWidth} />}
      {imageHeight && <meta property="og:image:height"content={imageHeight} />}
    </Head>
  )
}

export default NextHead
