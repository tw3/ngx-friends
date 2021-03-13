describe('chart-cards-ui ForceDirectedGraphCardComponent', () => {
  beforeEach(() => cy.visit('/iframe.html?id=forcedirectedgraphcardcomponent--primary'));

  it('should render the component', () => {
    cy.get('ngf-force-directed-graph-card').should('exist');
  });

  it('should have proper card title', () => {
    cy.get('mat-card-title').should('contain.text', 'Friends Network');
  });

  it('should match visually with the previous snapshot', () => {
    cy.get('figure.dag-container')
      .parent('div.chart-container', { timeout: 15000 })
      .should('have.class', 'simulation-end');
    cy['matchImageSnapshot']();
  });

});
