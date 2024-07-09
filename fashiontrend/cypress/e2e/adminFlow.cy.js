describe('Admin Flow', () => {
  it('permite a un administrador añadir un producto del inventario', () => {
    // Add client
    cy.visit('/producto/listado');
    cy.findByText('Crear Producto').click();
    cy.get('label:contains("Nombre")').next('input').type('Test Product');
    cy.get('label:contains("Talla")').next('input').type('M');
    cy.get('label:contains("Descripción")').next('textarea').type('Falda azul mujer');
    cy.get('label:contains("Color")').next('input').type('Azul');
    cy.get('label:contains("Categoría")').next('input').type('Shorts y falda');
    cy.get('label:contains("Tipo")').next('input').type('Femenino');
    cy.get('label:contains("Precio")').next('input').type('25000');
    cy.get('label:contains("Stock")').next('input').type('20');
    cy.get('button[type="submit"].text-white.bg-blue-700').click();
    cy.contains('Producto creado exitosamente', {timeout: 15000}).should('be.visible'); // Assert that the toast message appears
  });

  it('permite a un administrador editar un producto del inventario', () => {
    // Edit product
    // Edita al primer producto que encuentra
    cy.visit('/producto/listado');
    cy.get('a[href*="/producto/"][href*="/editar"]').first().click();
    cy.get('label:contains("Nombre")').next('input').type('Test Product Edit');
    cy.get('label:contains("Talla")').next('input').type('M');
    cy.get('label:contains("Descripción")').next('textarea').type('Falda azul mujer');
    cy.get('label:contains("Color")').next('input').type('Azul');
    cy.get('label:contains("Categoría")').next('input').type('Shorts y falda');
    cy.get('label:contains("Tipo")').next('input').type('Femenino');
    cy.get('label:contains("Precio")').next('input').type('25000');
    cy.get('label:contains("Stock")').next('input').type('20');
    cy.get('button[type="submit"].text-white.bg-blue-700').click();
    cy.contains('Producto editado exitosamente').should('be.visible'); // Assert that the toast message appears
  });

  it('permite a un administrador borrar un producto del inventario', () => {
    // Delete client
    cy.visit('/producto/listado');
// Click on the delete button of the first product
    cy.get('button:contains("Eliminar Producto")').eq(0).click();
    cy.contains('Producto eliminado exitosamente').should('be.visible'); // Assert that the toast message appears
  });
});
