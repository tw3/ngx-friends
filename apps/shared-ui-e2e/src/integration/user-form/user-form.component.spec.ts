describe('shared-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=userformcomponent--primary&knob-allUsers&knob-formState'));

  it('should render the component', () => {
    cy.get('ngf-user-form').should('exist');
  });
});
