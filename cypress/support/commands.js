Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Renick')
    cy.get('#lastName').type('Freitas')
    cy.get('#email').type('teste@totvs.com')
    cy.get('#open-text-area').type('texto longo', {delay: 10})
    
})

Cypress.Commands.add('Enviar', function(){
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('clickAbaEstoque', function(){
    cy.get('#menu-item-21 > a')
    .click()
})

Cypress.Commands.add('clickAbaInicio', function(){
    cy.get('#menu-item-20 > a')
    .click()
    .should('be.visible')
  })