import { Given, When } from "cypress-cucumber-preprocessor/steps";
/// <reference types="Cypress" />
/// <reference types="cypress-xpath"/>

describe('I am on the login page', () => {
  before(() => {
    cy.visit("http://localhost:4200");
  })
  const tests = require('../../fixtures/xlsxDataLogin.json');
  ['English', 'Français'].forEach(lang => {
    tests.forEach(test => {
      it(`check element by xpath for language ${lang}`, () => {
        if (cy.get('select') != lang) {
          cy.get('select').select(lang).should('have.value', lang)
        }
        if (!Object.values(test).includes(null)) {
          if (!test.id.includes('/input')) {
            cy.xpath(test.id).should('have.text', test[lang]);
          }
          else {
            cy.xpath(test.id).invoke('attr', 'placeholder').should('equal', test[lang])
          }
        }
        else {
          console.log("row contains null element")
        }
      });
    });
  })
})

