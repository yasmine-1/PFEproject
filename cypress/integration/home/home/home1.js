/// <reference types="Cypress" />
/// <reference types="cypress-xpath"/>

const { Console } = require("console");
const { Before, After, Given, Then, When } = require("cypress-cucumber-preprocessor/steps");
describe('Reading data from excel file', () => {
  it('My excel file', () => {
    cy.task('parseExcel', 'cypress/fixtures/homeExcel.xlsx').then((jsonData) => {
      const rowLength = Cypress.$(jsonData[0].data).length
      const data = jsonData[0].data;
      const outputJson = [];
      for (let index = 1; index < data.length; index++) {
        console.log('test', JSON.stringify(data[index]));
        outputJson.push({ Information: data[index][0], English: data[index][1], Français: data[index][2], xPath: data[index][3], id: data[index][4], actions: data[index][5], EndActions: data[index][6] });
      }
      cy.writeFile("cypress/fixtures/xlsxDataHome.json", outputJson)
    })
  })
})

describe('I am on the login page', () => {
  before(() => {
    cy.visit("http://localhost:4200");
    // S’exécute avant chaque test
  })
  
  let tests;
  beforeEach(() => {
    cy.fixture('xlsxDataHome.json').then((items) => {
      console.log("before Each", tests);
      tests = items;
    });
  });

  it("I enter my email and password", () => {
    let i = 0;
    while (i < 2) {
      console.log("tests[i] : ", tests[i])
      cy.xpath(tests[i].xPath).type(tests[i].English)
      i++
    }
    // click on login btn
    cy.xpath(tests[1].actions).click({ force: true });
    // TODO missing assert that login is successfull
  });
});

describe('Home test suite', () => {
  const tests = require('../../../fixtures/xlsxDataHome.json');
    ['English', 'Français'].forEach(lang => {
      tests.slice(2).forEach(test => {
        it(`check elemnt by xpath for language ${lang} and ${test.Information}`, () => {
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
              } else {
                cy.get(test.id).should('have.text', test[lang]);
              }
              // close
              cy.xpath(closeActions[index]).click({ force: true });
              cy.wait(1000);
              console.log("close ", test.Information, test.xpath);
            });
          } else {
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



