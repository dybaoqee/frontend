import Container, {Title, TopicsContainer} from './styles'
export default ({title, children, showNumbers}) => (
  <Container>
    {title && <Title>{title}</Title>}
    <TopicsContainer
      numbers={showNumbers ? [...Array(children.length).keys()] : []}
    >
      {children}
    </TopicsContainer>
  </Container>
)
