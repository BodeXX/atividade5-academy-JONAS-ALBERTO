
describe('Criar usuário', () => {
  const nome = "Maria José";
  const nome2 = "maria2"
  const email = "maria@jose.com";
    
  beforeEach(() => {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');
  });

  after(() =>{
   cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
   cy.intercept("GET", "api/v1/users", {statusCode:200,body:[]})
   cy.get(".sc-gsFSXq.mUpIH").type(email);
   cy.get('[data-test=userDataDelete]').click();
   cy.get(".sc-lcIPJg.eIYdvr").click();
  })


  it('Deve cadastrar um usuário com nome e email válidos', () => {
    cy.wait(2000);
    cy.get('#name').type(nome);
    cy.get('#email').type(email);
    cy.contains('button', 'Salvar').click()
  });

  it('Deve cancelar o cadastro se o email for inválido', () => {
    const emailInvalido = "emailinvalido";

    cy.get('#name').type(nome);
    cy.get('#email').type(emailInvalido);
    cy.contains('button', 'Salvar').click();
    cy.contains('Formato de e-mail inválido').should('exist');
  });

  it('Não deve ser possível cadastrar um usuário com e-mail já utilizado', () => {
    cy.get('#name').type(nome);
    cy.get('#email').type(email);
    cy.contains('button', 'Salvar').click();
    cy.wait(2000);
    cy.contains('Este e-mail já é utilizado por outro usuário.').should('exist');
  });

  it('Não deve ser possível cadastrar um nome com mais de 100 caracteres', () => {
    const nomeLongo = "a".repeat(101);

    cy.get('#name').type(nomeLongo);
    cy.get('#email').type(email);
    cy.contains('button', 'Salvar').click();
    cy.contains('Informe no máximo 100 caracteres para o nome').should('exist');
  });

  it('Não deve ser possível cadastrar um e-mail com mais de 60 caracteres', () => {
    const emailLongo = "a".repeat(61) + '@email.com';

    cy.get('#name').type(nome);
    cy.get('#email').type(emailLongo);
    cy.contains('button', 'Salvar').click();
    cy.contains('Informe no máximo 60 caracteres para o e-mail').should('exist');
  });
});
