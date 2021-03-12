describe('chart-cards-ui BubbleChartCardComponent', () => {
  beforeEach(() => cy.visit('/iframe.html?id=bubblechartcardcomponent--primary'));

  it('should render the component', () => {
    cy.get('ngf-bubble-chart-card').should('exist');
  });

  it('should have proper card title', () => {
    cy.get('mat-card-title').should('contain.text', 'Age vs Weight (# Friends)');
  });

});
