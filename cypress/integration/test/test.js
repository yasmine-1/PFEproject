import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
 
Given('visit baidu', () => {
    cy.visit('http://localhost:4200/')
})
 
When('search cypress-test via baidu', ()=>{
    cy.get('select').select('English').should('have.value','English')
})
Then('the title should contain cypress-test',()=>{
    cy.get('select').select('Français').should('have.value','Français')
}) 
          