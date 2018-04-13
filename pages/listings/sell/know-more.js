import {Component, Fragment} from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faGlobe from '@fortawesome/fontawesome-pro-light/faGlobe'
import faGift from '@fortawesome/fontawesome-pro-light/faGift'
import faBolt from '@fortawesome/fontawesome-pro-light/faBolt'
import faCoin from '@fortawesome/fontawesome-pro-light/faUsdCircle'
import faPaste from '@fortawesome/fontawesome-pro-light/faPaste'
import faGavel from '@fortawesome/fontawesome-pro-light/faGavel'
import Link from 'next/link'
import EmCasaButton from 'components/shared/Common/Buttons'
import Head from 'next/head'
import Layout from 'components/shared/Shell'
import Topics from 'components/shared/Common/Topics'
import Container, {Header, BenefitsContainer, Benefit} from './styles'

export default class SellKnowMore extends Component {
  render() {
    const {authenticated, isAdmin} = this.props
    const seoImg =
      'https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg'
    const seoTitle = 'EmCasa | Venda seu imóvel com a EmCasa'
    const seoDescription =
      'Anuncie seu Apartamento ou Casa de forma simples e transparente'

    return (
      <Layout
        authenticated={authenticated}
        isAdmin={isAdmin}
        renderFooter={true}
      >
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
              src="http://res.cloudinary.com/emcasa/image/upload/v1523560574/header-sell_tc02gl.png"
              alt="Venda seu imóvel na EmCasa"
            />
            <h1>Venda seu imóvel na EmCasa</h1>
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
                <p>
                  Economize tempo e evite visitas desnecessárias em sua casa.
                </p>
              </Benefit>
              <Benefit>
                <FontAwesomeIcon icon={faCoin} />
                <p>Economize dinheiro com nossa comissão reduzida de 3%.</p>
              </Benefit>
              <Benefit>
                <FontAwesomeIcon icon={faPaste} />
                <p>Suporte em financiamento e retirada de FGTS.</p>
              </Benefit>
              <Benefit>
                <FontAwesomeIcon icon={faGavel} />
                <p>Assistência jurídica grátis com documentação e processos.</p>
              </Benefit>
            </BenefitsContainer>
            <Link href={'/listings/new'} as={'/imoveis/adicionar'}>
              <EmCasaButton light>Anuncie agora</EmCasaButton>
            </Link>
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
            <Link href={'/listings/new'} as={'/imoveis/adicionar'}>
              <EmCasaButton light>Anuncie agora</EmCasaButton>
            </Link>
          </Container>
        </Fragment>
      </Layout>
    )
  }
}
