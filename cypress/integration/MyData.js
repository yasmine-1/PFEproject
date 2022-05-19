describe('Using EXCEL file of my labels of my login page', () => {
    it('read data from EXCEL and convert it into JSON file', () =>{ 
        cy.task('parseExcel','cypress/fixtures/loginExcel.xlsx').then( (jsonData) =>{ 
            const rowLength = Cypress.$(jsonData[0].data).length
            const data = jsonData[0].data ;
            const outputJson =[];
            for (let index = 1; index < data.length; index++){  
                console.log('test', JSON.stringify(data[index]));
                outputJson.push({ id:data[index][0],English:data[index][1],Français:data[index][2]});   
            }
            cy.writeFile("cypress/fixtures/xlsxDataLogin.json", outputJson) 
        })
   })
}) 

describe('using EXCEL file of the styles of my login page', () => { 
    it('read data from xcel', () =>{ 
      cy.task('parseExcel','cypress/fixtures/StylesLoginPage.xlsx').then( (jsonData) =>{ 
        const rowLength = Cypress.$(jsonData[0].data).length
        const data = jsonData[0].data ;
        const outputJson =[];
        for (let index = 1; index < data.length; index++){  
            console.log('test', JSON.stringify(data[index]));
            outputJson.push({ Information:data[index][0],xPath:data[index][1],Color:data[index][2],Width:data[index][3],Height:data[index][4]});
            
        }
        cy.writeFile("cypress/fixtures/xlsxDataStylesLogin.json", outputJson) 
      })
   })
})

describe('Reading excel file of my labels of my home page', () => {
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

describe('convert excel file of the styles of my home page', () => { 
    it('read data from Excel and convert it into json file', () =>{ 
        cy.task('parseExcel','cypress/fixtures/StylesHomePage.xlsx').then( (jsonData) =>{ 
            const rowLength = Cypress.$(jsonData[0].data).length
            const data = jsonData[0].data ;
            const outputJson =[];
            for (let index = 1; index < data.length; index++){  
                console.log('test', JSON.stringify(data[index]));
                outputJson.push({ Information:data[index][0],Color:data[index][1],Width:data[index][2],Height:data[index][3],xPath:data[index][4],actions:data[index][5],EndActions:data[index][6]});
            }
            cy.writeFile("cypress/fixtures/xlsxDataStylesHome.json", outputJson) 
        })
    })
}) 


