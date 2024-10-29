/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    this.beforeEach(function(){
        cy.visit('./src/index.html')
   })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatorio e envia o formulario', function(){
        const LongText = 'Validação de um texto longo no momento da escrita, sendo preciso verificar o ex 2'
        cy.get('#firstName').type('Renick')
        cy.get('#lastName').type('Freitas')
        cy.get('#email').type('teste@totvs.com')
        cy.get('#open-text-area').type(LongText, {delay: 10})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('Renick')
      cy.get('#lastName').type('Freitas')
      cy.get('#email').type('teste@totvs')
      cy.get('#open-text-area').type('teste')
      cy.get('button[type="submit"]').click()
      
      cy.get('.error').should('be.visible')
    })

    it('Validar input no cmapo telefone se permite colocar letras', function(){
      cy.get('#phone')
      .type('abcd')
      .should('have.value','')
    })

    it('Validar mensagem de texto quando telefone for obrigatorio ao marcar checkbox', function(){
      const LongText = 'Validação de um texto longo no momento da escrita, sendo preciso verificar o ex 2'
      cy.get('#firstName').type('Renick')
      cy.get('#lastName').type('Freitas')
      cy.get('#email').type('teste@totvs.com')
      cy.get('#phone-checkbox').check().should('be.checked')
      cy.get('#open-text-area').type(LongText, {delay: 10})
      cy.Enviar()

      cy.get('.error').should('be.visible')
    })

    it('Preencher e limpar o campo validando se está em branco', function(){
      cy.get('#firstName').type('Renick').should('have.value','Renick').clear().should('have.value', '')
      cy.get('#lastName').type('Freitas').should('have.value','Freitas').clear().should('have.value', '')
      cy.get('#email').type('teste@totvs.com').should('have.value','teste@totvs.com').clear().should('have.value', '')
    })

    it('Exibe mensagem de erro ao clicar em enviar sem os campos obrigatorios',function(){
      cy.Enviar()

      cy.get('.error').should('be.visible')
    })

    it('Utilizando comando customizado criado em support/commands', function(){
      cy.fillMandatoryFieldsAndSubmit()
      cy.Enviar()

      cy.get('.success').should('be.visible')
    })

    it('Selecione um produto (Youtube) por seu texto', function(){
      cy.get('select').select('YouTube').should('have.value', 'youtube')
      
    })

    it('Selecione um produto (mentoria) por seu valor (value)', function(){
      cy.get('select').select('mentoria').should('have.value', 'mentoria')
      
    })

    it('Selecione um produto (Blog) por seu indice', function(){
      cy.get('select').select(1).should('have.value', 'blog')
      
    })

    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
      cy.get('input[type="radio"]')
      .check('feedback')
      .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($box){
        cy.wrap($box).check()
        cy.wrap($box).should('be.checked')
      })
    })

    it('marca ambos checkboxes, depois desmarcar o ultimo', function(){
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
      
    })

    it('selecionar arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('Seleciona um arquivosimulando um drag-and-drop (arrastar e soltar', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('Selciona um arquivo utilizando uma fisture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('Talking About Testing').should('be.visible')
    })
  })