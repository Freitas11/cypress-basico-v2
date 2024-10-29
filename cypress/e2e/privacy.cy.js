it.only('Teste pagina privacy de CAC-TAT', function() {

    cy.visit('./src/privacy.html')
    .contains('Talking About Testing')
    .should('be.visible')

})