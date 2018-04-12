import {Component, Fragment} from 'react'
import Link from 'next/link'
import EmCasaButton from 'components/shared/Common/Buttons'
import Head from 'next/head'
import Layout from 'components/shared/Shell'
import Topics from 'components/shared/Common/Topics'
import Container, {
  Header,
  BenefitsContainer,
  Benefit,
  CardContainer,
  Card
} from './styles'

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
            <h2>Benefícios da EmCasa</h2>
            <BenefitsContainer>
              <Benefit>
                <div />
                <p>Anuncie e Venda seu Imóvel com a EmCasa.</p>
              </Benefit>
              <Benefit>
                <div />
                <p>Tenha acesso imediato à milhares de compradores.</p>
              </Benefit>
              <Benefit>
                <div />
                <p>
                  Ganhe um Tour Virtual em 3D e atraia mais atenção ao seu
                  imóvel.
                </p>
              </Benefit>
              <Benefit>
                <div />
                <p>
                  Economize tempo e evite visitas desnecessárias em sua casa.
                </p>
              </Benefit>
              <Benefit>
                <div />
                <p>Economize dinheiro com nossa comissão reduzida de 3%.</p>
              </Benefit>
              <Benefit>
                <div />
                <p>Receba um relatório de visitas e interesse do seu imóvel.</p>
              </Benefit>
              <Benefit>
                <div />
                <p>Suporte em Financiamento e retirada de FGTS.</p>
              </Benefit>
              <Benefit>
                <div />
                <p>Assistência jurídica grátis com documentação e processos.</p>
              </Benefit>
            </BenefitsContainer>
            <Link href={'/listings/new'} as={'/imoveis/adicionar'}>
              <EmCasaButton>Anuncie agora</EmCasaButton>
            </Link>
          </Container>
          <Container>
            <h2>Como funciona</h2>
            <h3>
              Faça um rápido cadastro e cadastre seu imóvel em menos de 5
              minutos.
            </h3>
            <Topics showNumbers>
              <div>
                <h4>Faça seu cadastro online</h4>
              </div>
              <div>
                <h4>Envie as fotos do imóvel</h4>
              </div>
              <div>
                <h4>
                  Envie os documentos<span>
                    (Apenas para validação interna)
                  </span>
                </h4>
              </div>
            </Topics>
            <p className="warning">
              <strong>Pronto!</strong> Seu imóvel estará no ar e nossa equipe
              iniciará o processo de anuncio e venda de seu apartamento ou casa.
              Agora é aguardar nosso contato para agendamento das visitas com os
              interessados em comprar o seu imóvel
            </p>
            <Link href={'/listings/new'} as={'/imoveis/adicionar'}>
              <EmCasaButton>Anuncie agora</EmCasaButton>
            </Link>
          </Container>
          <Container>
            <h2>Aproveite também</h2>
            <CardContainer>
              <Card>
                <div />
                <div>
                  <h5>Avaliação de imóvel gratuita</h5>
                  <p>
                    Responda um Questionário e faremos uma avaliação do valor de
                    venda gratuitamente
                  </p>
                </div>
              </Card>
              <Card>
                <div />
                <div>
                  <h5>Ganhe o Tour Virtual em 3D</h5>
                  <p>
                    Faça o agendamento online e receba nossa equipe uma visita
                    de aprox. 45 min. Nesta visita tiraremos fotos profissionais
                    e produziremos o Tour Virtual
                  </p>
                </div>
              </Card>
            </CardContainer>
          </Container>
        </Fragment>
      </Layout>
    )
  }
}
