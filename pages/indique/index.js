import {Component, Fragment} from 'react'
import Head from 'next/head'
import TextContainer from 'components/shared/TextContainer'
import Terms from './styles'

export default class Indique extends Component {
  render() {
    return (
      <Fragment>
        <Head>
          <title>Indique e Ganhe | EmCasa</title>
          <meta
            name="description"
            content="Indique amigos que queiram comprar ou vender um imóvel residencial e ganhe R$1000"
          />
          <meta
            property="og:description"
            content="Indique amigos que queiram comprar ou vender um imóvel residencial e ganhe R$1000"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Indique e Ganhe" />
          <meta
            name="twitter:description"
            content="Indique amigos que queiram comprar ou vender um imóvel residencial e ganhe R$1000"
          />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/home-2018-04-03_cozxd9.jpg"
          />
        </Head>

        <TextContainer>
          <h1>Indique e Ganhe</h1>

          <p>
            Conhece alguém querendo comprar ou vender um imóvel? Quer ajudar e
            ainda ganhar com isso? A EmCasa vai te pagar R$1000 caso uma
            indicação sua dê certo e leve a uma venda.
          </p>

          <br />

          <a
            href="https://docs.google.com/forms/d/1_yi64FiViwCYAeqvbmtZJ3FgW_3SMUfm35h38WulPSw"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Indique pessoas agora
          </a>

          <Terms>
            <h1>Termos e Condições</h1>

            <p>
              Termo de adesão à campanha "INDIQUE UM COMPRADOR OU VENDEDOR E
              GANHE", neste ato representada como “INDIQUE E GANHE” ou
              “Campanha”.
            </p>

            <h2>Condições Gerais</h2>

            <p>
              O presente termo tem por fim regular as condições de adesão à
              campanha "INDIQUE E GANHE", promovida pela EmCasa Negócios
              Imobiliários Ltda (“A Empresa”), para a indicação exclusiva de
              novos Compradores e Vendedores que venham a realizar uma Compra ou
              Venda de imóveis (“Clientes”) intermediada pela Empresa.
            </p>

            <p>
              A campanha "INDIQUE E GANHE" é por tempo limitado, podendo ser
              prorrogada a critério da Empresa. A adesão a esta campanha
              "INDIQUE E GANHE" é gratuita e está aberta a toda e qualquer
              pessoa, podendo participar da campanha com um número ilimitado de
              indicados.
            </p>

            <p>
              A Campanha “INDIQUE E GANHE” se aplica somente para pessoas que
              efetuem a transação imobiliária sob intermediação da EmCasa, onde
              a realização do pagamento de comissão caracteriza a transação. Não
              se aplicam à campanha Pessoas que tenham demonstrado interesse
              prévio em comprar ou vender, colocado seu apartamento à venda,
              recebido visitas, publicado no website, visitado demais
              apartamentos, realizado ou recebido ofertas ou qualquer outra
              atividade sem completar a transação imobiliária e o pagamento da
              comissão à Empresa.
            </p>

            <p>
              O pagamento do valor de R$1.000,00 (mil reais) (“Pagamento”) se
              realizará em até 30 (trinta) dias após o pagamento da comissão
              pelo Vendedor ou Comprador do Apartamento, concretizando a venda
              do apartamento.
            </p>

            <p>
              As indicações deverão ser feitas através do Formulário encontrado
              no website www.EmCasa.com/indique, onde cada indicação terá a
              validade de 6 (seis) meses a contar da data do recebimento do
              contato. Após 6 (seis) meses a contar da data do recebimento
              (“Data de Expiração”), a Indicação já não será válida. Assim,
              mesmo que a venda do Apartamento se concretize, a Pessoa que tiver
              indicado o Cliente não será mais elegível ao Pagamento. Neste
              caso, o Cliente poderá Comprar ou Vender o Apartamento e não
              haverá qualquer Indicação, sendo assim, a Empresa não efetuará
              qualquer Pagamento.
            </p>

            <p>
              A indicação deverá ser provida dos seguintes dados: Nome e
              Sobrenome do Indicado, e-mail do Indicado, telefone do Indicado,
              Nome e Sobrenome da Pessoa que estiver indicando, e-mail da Pessoa
              que estiver Indicando, CPF da Pessoa que estiver indicando, e
              telefone da Pessoa que estiver indicando.
            </p>

            <p>
              Para toda e qualquer Indicação, a EmCasa enviará um e-mail com a
              Confirmação do cadastro de Indicação, caso a Indicação seja
              válida, ou um e-mail com a Declinação do cadastro de Indicação,
              caso a Indicação seja inválida por qualquer motivo. Os motivos
              incluem mas não estão limitados à falta de informação para
              realização completa do cadastro, duplicidade de Indicação,
              Clientes que já estejam em contato com a EmCasa através de
              qualquer de nossas plataformas como website, e-mail, telefone,
              Facebook e demais mídias sociais, Clientes que já foram
              cadastrados em qualquer programa de Indicação, esteja a Indicação
              no período de validade ou não.
            </p>

            <p>
              A EmCasa reserva-se o direito de excluir participantes desta ação
              em caso de violação, de algum modo, dos termos e condições desta
              campanha bem como se comprovada má fé contra a EmCasa ou contra
              terceiros. A EmCasa reserva-se o direito de finalizar, interromper
              ou modificar esta campanha por sua livre vontade e sem qualquer
              notificação prévia e/ou de alterar os termos e condições que regem
              esta campanha, caso as circunstâncias referentes aos mesmos a isso
              o exijam, sem qualquer obrigação de indenizar os participantes. A
              Idade mínima para participar nesta campanha "INDIQUE E GANHE" é de
              18 anos.
            </p>

            <p>
              As questões não contempladas neste regulamento serão decididas
              internamente pela EmCasa. Qualquer questão ou dúvida pode ser
              enviada através do e-mail: contato@EmCasa.com.
            </p>
          </Terms>
        </TextContainer>
      </Fragment>
    )
  }
}
