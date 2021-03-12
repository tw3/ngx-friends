describe('chart-cards-ui ForceDirectedGraphCardComponent', () => {
  beforeEach(() => cy.visit('/iframe.html?id=forcedirectedgraphcardcomponent--primary'));

  it('should render the component', () => {
    cy.get('ngf-force-directed-graph-card').should('exist');
  });

  it('should have proper card title', () => {
    cy.get('mat-card-title').should('contain.text', 'Friends Network');
  });

});
