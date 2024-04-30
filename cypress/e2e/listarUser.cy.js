describe('Listas usuários', () => {
  beforeEach( function () {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users')
  })

  it('Deve listar todos os usuários cadastrados no sistema.', () => {  
   cy.get("#listaUsuarios").should("be.visible");
   cy.get('#listaUsuarios').should('have.length.gt', 0);
});


  it('Deve existir uma opção para cadastrar um usuário quando não houver usuários cadastrados', () => {
    cy.wait(2000);
    cy.intercept("GET", "api/v1/users", {statusCode:200,body:[]})
    cy.get(".sc-gsFSXq.mUpIH").type("email@semcad.com")
    cy.contains('Cadastre um novo usuário').should('be.visible');
  });
});
