describe('shared-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=nocontentcomponent--primary'));

  it('should render the component', () => {
    cy.get('ngf-no-content').should('exist');
  });
});
