import Form from './styles'

export default ({children, onSubmit}) => (
  <Form onSubmit={onSubmit}>{children}</Form>
)
