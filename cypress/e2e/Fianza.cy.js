describe('Testes Fianza', function() {

  this.beforeEach(function(){
    cy.visit('fianza.com.br')
  })

  it('Manipulação aba Estoque', function(){
    cy.clickAbaEstoque()

    // Seleciona todos os itens clicáveis
    cy.get('#cps_ajax_search_results > .hideOnSearch > .result-car')
    .should('have.length', 10)
    .each(($el, index, $list) => {
      // Para cada elemento, você pode verificar o nome
      // Suponha que o nome esteja dentro de um span com a classe 'item-name'
      
      cy.wrap($el).within(() => {
        cy.get('mini-hide')
        .contains('Ford Ecosport')
        .invoke('row')
        .then((text) => {
          // Verifique se o nome corresponde ao esperado
          // Aqui você pode usar uma array de nomes esperados ou outra lógica
          const expectedNames = ['Item 1', 'Item 2', 'Item 3']; // Exemplo de nomes esperados
          expect(text.trim()).to.equal(expectedNames[index]);
        });

        // Verifica se o elemento é clicável
        cy.wrap($el).should('be.visible').click();
        // Adicione aqui o que deve acontecer após o clique, se necessário
      });
    });
    
  })

  



})
  
