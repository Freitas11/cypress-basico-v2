Cypress.Commands.add('clickAbaEstoque', function(){
    cy.get('#menu-item-21 > a')
   .click({force: true})
})