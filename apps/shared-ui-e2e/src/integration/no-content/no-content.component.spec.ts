describe('shared-ui NoContentComponent', () => {
  beforeEach(() => cy.visit('/iframe.html?id=nocontentcomponent--primary'));

  it('should render the component', () => {
    cy.get('ngf-no-content').should('exist');
  });

  it('should show 404 message', () => {
    cy.get('ngf-no-content').should('contain.text', '404: page missing');
  });

});
