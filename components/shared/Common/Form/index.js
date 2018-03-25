import Form from './styles'

export default ({children, onSubmit, ...props}) => (
  <Form onSubmit={onSubmit} {...props}>
    {children}
  </Form>
)
