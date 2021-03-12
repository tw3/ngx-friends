describe('chart-cards-ui HorizontalBarChartCardComponent', () => {
  beforeEach(() => cy.visit('/iframe.html?id=horizontalbarchartcardcomponent--primary'));

  it('should render the component', () => {
    cy.get('ngf-horizontal-bar-chart-card').should('exist');
  });

  it('should have proper card title', () => {
    cy.get('mat-card-title').should('contain.text', 'User Weights');
  });

});
