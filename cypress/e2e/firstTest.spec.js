describe('Test ', () => {
  beforeEach('login to app',()=>{
    cy.intercept('GET','https://conduit-api.bondaracademy.com/api/tags',{fixture:'tags.json'})
    cy.loginApp()
  })
  it('passes', () => {
    cy.log('Nos logeamos :D')
  })
  it('verifyapi',()=>{

    cy.intercept('POST','https://conduit-api.bondaracademy.com/api/articles/').as('postArticles')
    


    
    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type('Esto es un titulo')
    cy.get('[formcontrolname="description"]').type('Esto una descripcion')
    cy.get('[formcontrolname="body"]').type('Esto es el texto del articulo')
    cy.contains('Publish Article ').click()

    cy.wait('@postArticles')
    cy.get('@postArticles').then(xhr=>{
      console.log(xhr)
      //expect(xhr.response.statuscode).to.equal(200)
      expect(xhr.request.body.article.body).to.equal('Esto es el texto del articulo')
      expect(xhr.response.body.article.description).to.equal('Esto una descripcion')
    })
    
  })
  it('verify tags',()=>{
    cy.get('.tag-list')
    .should('contain','Tiktok')

  })


  it.only('verify likes',()=>{
    cy.intercept('GET','https://conduit-api.bondaracademy.com/api/articles/feed*',{"articles":[],"articlesCount":0})
    cy.intercept('GET','https://conduit-api.bondaracademy.com/api/articles*',{fixture:'articles.json'})
    cy.contains('Global Feed').click()
    cy.get('app-article-list button').then(hearthlist=>{
      expect(hearthlist[0]).to.contain('10000')
      expect(hearthlist[1]).to.contain('-120')
    })
    cy.fixture('articles.json').then(file=>{
      const articleLink=file.articles[1].slug
      file.articles[1].favoritesCount=-119
      cy.intercept('POST','https://conduit-api.bondaracademy.com/api/articles/'+articleLink+'/link')

    })

    cy.get('app-article-list button').eq(1).click().should('contain','-119')
  })
})