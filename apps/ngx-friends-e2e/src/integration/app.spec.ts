import { getGreeting } from '../support/app.po';

describe('ngx-friends', () => {
  describe('Valid pages', () => {
    beforeEach(() => cy.visit('/'));

    it('should display welcome message', () => {
      // Function helper example, see `../support/app.po.ts` file
      getGreeting().contains('NGX Friends');
    });
  });

  describe('Invalid pages', () => {
    it('should display 404 page', function() {
      cy.visit('/invalid-route');
      getGreeting().contains('404: page missing');
    });
  });
});
