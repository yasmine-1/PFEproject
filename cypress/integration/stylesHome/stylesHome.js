/// <reference types="Cypress" />
/// <reference types="cypress-xpath"/>
const { Before, After, Given, Then, When,And } = require("cypress-cucumber-preprocessor/steps");

When('test home pages',()=>{
  
    cy.visit("http://localhost:4200");
    // S’exécute avant chaque test
  })
  let testsLogin;
  When('home page is tested',()=>{
    
    cy.fixture('xlsxDataStylesHome.json').then((items) => {
      testsLogin = items;
    });
  
  });
  Then('log', () => {
    let i = 0;
    while (i < 2) {
      cy.xpath(testsLogin[i].xPath).type(testsLogin[i].Color)
      i++
    }
    // click on login button
    cy.xpath(testsLogin[1].actions).click({ force: true });
  });
 
  const tests = require('../../fixtures/xlsxDataStylesHome.json');
  When('logging', () => {
  ['Color', 'Width', 'Height'].forEach(style => {
    
    tests.slice(2).forEach(test => {
        
        if (test.actions) {
          const closeActions = test.EndActions.split(';');
          test.actions.split(';').forEach((action, index) => {
            // open popup
            cy.xpath(action).click({ force: true });
            cy.wait(1000);
            // check properties
            if (style == 'Color') {
              cy.xpath(test.xPath).should('have.css', 'background-color').and('eq', test[style])
            }
            else if (style == 'Width') {
              cy.xpath(test.xPath).should('have.css', 'width').and('eq', test[style])
            }
            else {
              cy.xpath(test.xPath).should('have.css', 'height').and('eq', test[style])
            }
            // close
            cy.xpath(closeActions[index]).click({ force: true });
            cy.wait(1000);
            console.log("close ", test.Information, test.xpath);
          });
        }
        else {
          // check styles
          if (style == 'Color') {
            cy.xpath(test.xPath).should('have.css', 'background-color').and('eq', test[style])
          }
          else if (style == 'Width') {
            cy.xpath(test.xPath).should('have.css', 'width').and('eq', test[style])
          }
          else {
            cy.xpath(test.xPath).should('have.css', 'height').and('eq', test[style])
          }
        }
      });
    });
  })

