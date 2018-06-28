import Slider from 'components/shared/Common/Slider'
import NumberFormat from 'react-number-format'
import Container, {
  SliderContainer,
  Description,
  InfoContainer,
  Info,
  Table,
  DescriptionColumn,
  Column
} from './styles'
export default () => (
  <Container>
    <h3>Veja quanto você pode economizar com a EmCasa</h3>
    <Description>
      Confira sua economia desfrutando do serviço excepcional <br /> EmCasa e
      economize milhares de reais em taxas.
    </Description>
    <InfoContainer>
      <Info>
        <p>Economia para quem vende</p>
        <NumberFormat
          value={43400}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
        />
      </Info>
      <Info secondary>
        <p>Valor do imóvel</p>
        <NumberFormat
          value={43400}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
        />
      </Info>
      <Info>
        <p>Economia para quem compra</p>
        <NumberFormat
          value={43400}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
        />
      </Info>
    </InfoContainer>
    <SliderContainer>
      <Slider min={400000} max={4000000} />
    </SliderContainer>
    <Description>
      Ajuste conforme o valor do seu imóvel e confira a <br />
      economia pra quem vende e para quem compra
    </Description>
    <Table>
      <DescriptionColumn>
        <h4>Descrição</h4>
        <p>Valor do seu imóvel</p>
        <p>Corretagem Imobiliária</p>
        <p>Tour 3D</p>
        <p>Fotos profissionais</p>
        <p>Destaques nos portais de imóveis</p>
        <p>Destaque no Facebook e Google</p>
        <p>Tempo para o imóvel estar disponível</p>
        <p>Equipe disponível</p>
        <p>Assessoria jurídica e de documentação</p>
        <p>Suporte à financiamente e retirada de FGTS</p>
        <p>Valor recebido pelo proprietário</p>
      </DescriptionColumn>
      <Column secondary>
        <h4>EmCasa</h4>
        <p>R$ 1.000.000</p>
        <p>R$ 30.000*</p>
        <p>Gratuito</p>
        <p>Gratuito</p>
        <p>Gratuito</p>
        <p>Gratuito</p>
        <p>1 dia</p>
        <p>Atendimento 24 horas</p>
        <p>Gratuito</p>
        <p>Gratuito</p>
        <p>R$ 970.000 a mais!</p>
      </Column>
      <Column>
        <h4>Imobiliárias Tradicionais</h4>
        <p>R$ 1.000.000</p>
        <p>R$ 60.000**</p>
        <p>—</p>
        <p>Câmeras amadoras</p>
        <p>—</p>
        <p>—</p>
        <p>7 dias</p>
        <p>1 corretor</p>
        <p>—</p>
        <p>—</p>
        <p>R$ 950.000</p>
      </Column>
    </Table>
  </Container>
)
