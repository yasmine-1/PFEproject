/// <reference types="Cypress" />
/// <reference types="cypress-xpath"/> 
describe('I am on the login page', () => {
  before(() => {
    cy.visit("http://localhost:4200");
  })
  const tests = require('../../fixtures/xlsxDataStylesLogin.json');
  ['Color', 'Width', 'Height'].forEach(property => {
    tests.forEach(test => {
      it(`check element by xpath for ${property}`, () => {
        if (!Object.values(test).includes(null)) {
          if (property == 'Color') {
            cy.xpath(test.xPath).should('have.css', 'background-color').and('eq', test[property])
          }
          else if (property == 'Width') {
            cy.xpath(test.xPath).should('have.css', 'width').and('eq', test[property])
          }
          else {
            cy.xpath(test.xPath).should('have.css', 'height').and('eq', test[property])
          }
        }
        else {
          console.log("row contains null element")
        }
      });
    });
  })
})