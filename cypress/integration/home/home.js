/// <reference types="Cypress" />
/// <reference types="cypress-xpath"/>

const { Console } = require("console");
const { Before, After, Given, Then, When } = require("cypress-cucumber-preprocessor/steps");
describe('I am on the login page', () => {
  before(() => {
    cy.visit("http://localhost:4200");
    // S’exécute avant chaque test
  })
  let testsItems;
  beforeEach(() => {
    cy.fixture('xlsxDataHome.json').then((items) => {
      console.log("before Each", testsItems);
      testsItems = items;
    });
  });

  it("I enter my email and password", () => {
    let i = 0;
    while (i < 2) {
      console.log("testsItems[i] : ", testsItems[i])
      cy.xpath(testsItems[i].xPath).type(testsItems[i].English)
      i++
    }
    // click on login btn
    cy.xpath(testsItems[1].actions).click({ force: true });
  });

  const tests = require('../../fixtures/xlsxDataHome.json');
  ['English', 'Français'].forEach(lang => {
      tests.slice(2).forEach(test => {
        it(`check element by xpath for language ${lang} and ${test.Information}`, () => {
          cy.get('mat-select').then(element => {
            if (element.text() !== lang) {
              cy.get('mat-select').click({ force: true }).get('mat-option').contains(lang).click({ force: true });
            }
          });
          if (test.actions) {
            const closeActions = test.EndActions.split(';');
            test.actions.split(';').forEach((action, index) => {
              // open popup
              cy.xpath(action).click({ force: true });
              cy.wait(1000);
              // check element
              if (test.xPath) {
                cy.xpath(test.xPath).should('have.text', test[lang]);
              } 
              else {
                cy.get(test.id).should('have.text', test[lang]);
              }
              // close
              cy.xpath(closeActions[index]).click({ force: true });
              cy.wait(1000);
              console.log("close ", test.Information, test.xpath);
            });
          } 
          else {
            // check element
            if (test.xPath) {
              cy.xpath(test.xPath).should('have.text', test[lang]);
            } else {
              cy.get(test.id).should('have.text', test[lang]);
            }
          }
        });
      });
    })
})