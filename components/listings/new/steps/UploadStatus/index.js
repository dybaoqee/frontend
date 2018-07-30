import {Fragment} from 'react'
import Container from './styles'
import EmCasaButton from 'components/shared/Common/Buttons'
import Link from 'next/link'
export default ({submitting, listingId, editing}) => (
  <Container>
    {submitting || editing ? (
      <Fragment>
        <h3>Estamos {editing ? 'editando' : 'enviando'} seu imóvel</h3>
        <p>Aguarde, por favor...</p>
      </Fragment>
    ) : (
      <Fragment>
        <h3>Seu imóvel foi encaminhado para um agente da EmCasa</h3>
        <p>
          Entraremos em contato por telefone ou whatsapp dentro de alguns
          minutos
        </p>
        <p>
          Já tirou fotos do seu imóvel? Faça o upload para acelerar a
          publicação.
        </p>
        <Link
          href={`/listings/images?listingId=${listingId}`}
          as={`/imoveis/${listingId}/imagens`}
          prefetch
        >
          <EmCasaButton secondary>Adicionar fotos</EmCasaButton>
        </Link>
        <Link
          href="/listings/sell/know-more"
          as="/saiba-mais-para-vender"
          prefetch
        >
          <a>Veja o quanto você pode economizar com a EmCasa</a>
        </Link>
      </Fragment>
    )}
  </Container>
)
