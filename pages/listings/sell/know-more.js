import {Component, Fragment} from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faGlobe from '@fortawesome/fontawesome-pro-light/faGlobe'
import faGift from '@fortawesome/fontawesome-pro-light/faGift'
import faBolt from '@fortawesome/fontawesome-pro-light/faBolt'
import faCoin from '@fortawesome/fontawesome-pro-light/faUsdCircle'
import faPaste from '@fortawesome/fontawesome-pro-light/faPaste'
import faGavel from '@fortawesome/fontawesome-pro-light/faGavel'
import Link from 'next/link'
import Head from 'next/head'
import {imageUrl} from 'utils/image_url'
import EmCasaButton from 'components/shared/Common/Buttons'
import Topics from 'components/shared/Common/Topics'
import Container, {Header, BenefitsContainer, Benefit} from './styles'

import PriceEstimate from 'components/shared/PriceEstimate'

export default class SellKnowMore extends Component {
  render() {
    const seoImg = imageUrl(
      'emcasa-saiba-mais-para-vender-share-centered-2.jpg'
    )
    const seoTitle = 'Anuncie e Venda seu imóvel no Rio de Janeiro | EmCasa'
    const seoDescription =
      'Anuncie e venda seu imóvel no Rio de Janeiro de forma simples e transparente com a EmCasa que tem sistema exclusivo de Tour Virtual 3D para aumentar suas chances de venda'

    return (
      <Fragment>
        <Head>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:image" content={seoImg} />
          <meta property="og:image:height" content="838" />
          <meta property="og:image:width" content="1476" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoTitle} />
          <meta name="twitter:description" content={seoDescription} />
          <meta name="twitter:image" content={seoImg} />
        </Head>
        <Fragment>
          <Header>
            <img
              src={imageUrl('listings_new_header.png')}
              alt="Venda seu imóvel na EmCasa"
            />
            <h1>Anuncie e Venda seu imóvel no Rio de Janeiro com a EmCasa</h1>
          </Header>
          <Container>
            <BenefitsContainer>
              <Benefit>
                <FontAwesomeIcon icon={faGlobe} />
                <p>Tenha acesso imediato a milhares de compradores.</p>
              </Benefit>
              <Benefit>
                <FontAwesomeIcon icon={faGift} />
                <p>
                  Ganhe um Tour Virtual em 3D e atraia mais atenção para o seu
                  imóvel.
                </p>
              </Benefit>
              <Benefit>
                <FontAwesomeIcon icon={faBolt} />
                <p>Evite visitas desnecessárias em sua casa.</p>
              </Benefit>
              <Benefit>
                <FontAwesomeIcon icon={faCoin} />
                <p>Assistência jurídica grátis com documentação e processos.</p>
              </Benefit>
              <Benefit>
                <FontAwesomeIcon icon={faPaste} />
                <p>Suporte em financiamento e retirada de FGTS.</p>
              </Benefit>
              <Benefit>
                <FontAwesomeIcon icon={faGavel} />
                <p>Economize tempo e venda seu imóvel mais rápido.</p>
              </Benefit>
            </BenefitsContainer>
            <Link passHref href="/listings/new-listing" as="/vender/imovel">
              <a>
                <EmCasaButton light>Anuncie agora</EmCasaButton>
              </a>
            </Link>
          </Container>
          <Container id="precificador">
            <PriceEstimate />
          </Container>
          <Container>
            <h3>Cadastre seu imóvel em menos de 5 minutos</h3>
            <Topics showNumbers>
              <div>
                <h4>
                  Cadastre-se na plataforma e preencha as informações básicas do
                  seu imóvel
                </h4>
              </div>
              <div>
                <h4>
                  Envie as fotos do imóvel e agende o nosso Tour Virtual 3D
                </h4>
              </div>
              <div>
                <h4>
                  Envie os documentos e receba uma avaliação gratuita do seu
                  imóvel
                </h4>
              </div>
            </Topics>
            <p className="warning">
              <strong>Pronto!</strong> Seu imóvel estará no ar e nossa equipe
              iniciará o processo de anúncio e venda de seu apartamento ou casa.
              Agora é aguardar nosso contato para agendamento das visitas com os
              interessados em comprar o seu imóvel.
            </p>
            <Link passHref href="/listings/new-listing" as="/vender/imovel">
              <a>
                <EmCasaButton light>Anuncie agora</EmCasaButton>
              </a>
            </Link>
          </Container>
        </Fragment>
      </Fragment>
    )
  }
}
