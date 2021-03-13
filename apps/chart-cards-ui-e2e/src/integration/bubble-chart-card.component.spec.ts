describe('chart-cards-ui BubbleChartCardComponent', () => {
  beforeEach(() => cy.visit('/iframe.html?id=bubblechartcardcomponent--primary'));

  it('should render the component', () => {
    cy.get('ngf-bubble-chart-card').should('exist');
  });

  it('should have proper card title', () => {
    cy.get('mat-card-title').should('contain.text', 'Age vs Weight (# Friends)');
  });

  it('should match visually with the previous snapshot', () => {
    cy.get('div.ngx-charts-outer', { timeout: 10000 }).should('not.have.class', 'ng-animating');
    cy['matchImageSnapshot']();
  });

});
