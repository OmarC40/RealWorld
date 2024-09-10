describe('Test ', () => {
  beforeEach('login to app',()=>{
    cy.loginApp()
  })
  it('passes', () => {
    cy.log('Nos logeamos :D')
  })
})