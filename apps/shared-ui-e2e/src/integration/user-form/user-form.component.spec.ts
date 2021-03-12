describe('shared-ui UserFormComponent', () => {
  beforeEach(() => cy.visit('/iframe.html?id=userformcomponent--primary&knob-allUsers&knob-formState'));

  it('should render the component', () => {
    cy.get('ngf-user-form').should('exist');
  });

  it('should have propre fields and buttons', () => {
    cy.get('input[formcontrolname="name"]').should('have.value', '');
    cy.get('input[formcontrolname="age"]').should('have.value', '');
    cy.get('input[formcontrolname="weight"]').should('have.value', '');
    cy.get('input[formcontrolname="friendNameInput"]').should('have.value', '');

    cy.get('mat-chip').should('not.exist');

    cy.get('mat-card-actions button').contains('Add User').should('exist');
    cy.get('mat-card-actions button').contains('Add User').parent('button').should('be.disabled');
    cy.get('mat-card-actions button').contains('Populate Random Data').should('exist');
    cy.get('mat-card-actions button').contains('Reset').should('exist');
  });

  it('should enter user details by typing', () => {
    cy.get('input[formcontrolname="name"]').type('Ted').should('have.value', 'Ted');
    cy.get('input[formcontrolname="age"]').type('43').should('have.value', '43');
    cy.get('input[formcontrolname="weight"]').type('200').should('have.value', '200');
    cy.get('input[formcontrolname="friendNameInput"]').type('ab').should('have.value', 'ab');
    cy.get('mat-option span').contains('ab').click(); // select auto-complete option
    cy.get('input[formcontrolname="friendNameInput"]').should('have.value', ''); // should clear input

    cy.get('mat-chip').eq(0).should('contain', 'abc');
  });

  it('should enter user details via "Populate Random Data" button', () => {
    cy.get('mat-card-actions button').contains('Populate Random Data').click();

    cy.get('input[formcontrolname="name"]').should('not.have.value', '');
    cy.get('input[formcontrolname="age"]').should('not.have.value', '');
    cy.get('input[formcontrolname="weight"]').should('not.have.value', '');
  });

  it('should reset user details via "Reset" button', () => {
    cy.get('mat-card-actions button').contains('Populate Random Data').click();
    cy.get('mat-card-actions button').contains('Reset').click();

    cy.get('input[formcontrolname="name"]').should('have.value', '');
    cy.get('input[formcontrolname="age"]').should('have.value', '');
    cy.get('input[formcontrolname="weight"]').should('have.value', '');
    cy.get('input[formcontrolname="friendNameInput"]').should('have.value', '');
    cy.get('mat-card-actions button').contains('Add User').parent('button').should('be.disabled');
  });

});
