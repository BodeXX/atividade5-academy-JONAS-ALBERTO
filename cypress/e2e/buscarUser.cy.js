describe('Pesquisar usuário', () => {
    const nome = "Maria José";
    const email = "maria@jose.com";
  
    beforeEach(() => {
        cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');
        cy.get('#name').type(nome);
        cy.get('#email').type(email);
        cy.contains('button', 'Salvar').click();
      
        cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
    });
  
    it('Deve pesquisar usuário por nome', () => {
        cy.get('.sc-gsFSXq.mUpIH').type(nome);
        cy.contains('Ver detalhes').click();
        cy.get('.sc-dLMFU.Mcjyi').should('exist');
        cy.get('#userName').should('exist');
        cy.get('#userEmail').should('exist');
    });
  
    it('Deve pesquisar usuário por e-mail', () => {
        cy.get('.sc-gsFSXq.mUpIH').type(email);
        cy.contains('Ver detalhes').click();
        cy.get('.sc-dLMFU.Mcjyi').should('exist');
        cy.get('#userName').should('exist');
        cy.get('#userEmail').should('exist');
    });
        
    });
