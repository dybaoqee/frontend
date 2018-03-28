import startServer from '../../server'
describe('Smoke test', () => {
  before(async function() {
    //const server = await startServer()
    //console.log(server)
    // runs before all tests in this block
  })
  it('should load and have the right title', () => {
    cy.visit('http://localhost:3000/')

    cy.title().should('equal', 'EmCasa')
  })
})
