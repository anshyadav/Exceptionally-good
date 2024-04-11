/// <reference types="cypress" />
const NAME_ANSH = "Ansh Yadav";
const EMAIL_ANSH = "yadavansh04@gmail.com";
const PHONE_NUMBER_ANSH = "0892044873";
const MESSAGE_ANSH_2BED = "Hello,\nHope you are doing great. Thanks for posting such a beautiful house, we are highly interested in viewing and renting it. Also, We are ready to move in immediately.\n" + 
                    "Let me tell you about ouserselves:\nWe both are working professionals about to hit 30s. We are clean, quiet and non-party people which don't smoke as well. We have no pets or children." + 
                    " Since offices are re-opening, we are asked to come offices and therefore moving to Dublin. We all are currently staying together in Galway.\n" + 
                    "Please let me know if you require any further information or documents.\n" + 
                    "Kind Regards,\nAnsh Yadav\n0892044873";
const MESSAGE_ANSH_3BED = "Hello,\nHope you are doing great. Thanks for posting such a beautiful house, we are highly interested in viewing and renting it. Also, We are ready to move in immediately.\n" + 
                    "Let me tell you about ouserselves:\nWe three are working professionals about to hit 30s. We are clean, quiet and non-party people which don't smoke as well. We have no pets or children." + 
                    " Since offices are re-opening, we are asked to come offices and therefore moving to Dublin. We all are currently staying together in Galway.\n" + 
                    "Please let me know if you require any further information or documents.\n" + 
                    "Kind Regards,\nAnsh Yadav\n0892044873";
const MESSAGE_ANSH_45BED = "Hello,\nHope you are doing great. Thanks for posting such a beautiful house, we are highly interested in viewing and renting it. Also, We are ready to move in immediately.\n" + 
                    "Let me tell you about ouserselves:\nWe are four working professionals about to hit 30s. We are clean, quiet and non-party people which don't smoke as well. We have no pets or children." + 
                    "   Since offices are re-opening, we are asked to come offices and therefore moving to Dublin. We all are currently staying together in Galway.\n" + 
                    "Please let me know if you require any further information or documents.\n" + 
                    "Kind Regards,\nAnsh Yadav\n0892044873";

const DATE = new Date().toLocaleDateString('en-GB');
const TIME = new Date().toLocaleTimeString('en-GB');

export class ApplyForRentProperties{

    navigateAndSetCookies(){
        cy.viewport('macbook-15');
        cy.visit('https://www.daft.ie/');
        cy.wait(2000);
        cy.get('body').then(body => {
            if(body.find('[data-tracking="cc-settings"]').length > 0){
                cy.get('[data-tracking="cc-settings"]').click();
                cy.get('[data-tracking="cc-save-and-exit"]').click();
                cy.wait(500)
            }
        })
    }

    login(){
        cy.get('[data-testid="nav-item-signin"]').click();
        cy.get('[id="username"]').type('yadavansh04@gmail.com');
        cy.get('[id="password"]').type('yadavansh04');
        cy.get('[value="SIGN IN"]').click();
        cy.get('[data-testid="nav-item-mydaft"]').should('be.visible');
        cy.wait(2000);
    }

    loadPropertiesFromSavedSearches(savedSearchIndex){
        cy.visit('https://www.daft.ie/mydaft/saved-searches');
        cy.get('ul[data-testid="results"]>li').should('have.length', 5);
        cy.get('[data-tracking="saved-search-run"]').eq(savedSearchIndex).click({force:true});
        cy.wait(3000);
    }

    applyForProperties(){
        cy.get('button[aria-label="Map"]').should('be.visible');
        cy.get('body').then($body => {
            if($body.find('img[data-testid="zero-results-img"]').length > 0){
                cy.writeFile('cypress/fixtures/logs.txt', 'No properties Found\n', {flag: 'a+'});
            }
            else{
                cy.writeFile('cypress/fixtures/logs.txt', 'We got some properties published today\n', {flag: 'a+'});
                cy.get('ul[data-testid="results"]>li>a').each(($property) => {
                    let link = $property.attr('href');
                    let cleanLink = 'https://www.daft.ie' + link.trim().toString();
                    cy.readFile('cypress/fixtures/address.txt').then(str =>{
                        if(str.includes(cleanLink)){
                            cy.writeFile('cypress/fixtures/logs.txt', 'Applied already, skipping this:\n' + cleanLink + '\n', {flag: 'a+'});
                        }
                        else{
                            cy.writeFile('cypress/fixtures/logs.txt', 'Not applied till now, applying now\n', {flag: 'a+'});
                            cy.visit(cleanLink);
                            cy.get('[aria-label="Satellite View"]').should('exist');
                            cy.get('[aria-label="Street View"]').should('exist');
                            cy.get('[data-testid="map"]').should('exist');
                            cy.get('[data-testid="message-btn"],[data-tracking="email-btn"]').should('exist').then(button => {
                                cy.get('[data-testid="beds"],[data-testid="alt-info"]').then(beds => {
                                    let noOfBeds = beds.text();
                                    cy.log(noOfBeds);
                                    cy.get('[data-testid="message-btn"],[data-tracking="email-btn"]').click({force: true});
                                    cy.get('[aria-label="Send"][data-testid="submit-button"]').should('exist');
                                    cy.wait(5500);
                                    this.enterUserDetails(noOfBeds);
                                })
                                cy.get('[aria-label="Send"][data-testid="submit-button"]').should('be.visible').click();
                                cy.get('[data-testid="alert-message-wrapper"]').should('contain.text', 'Your enquiry has been sent');
                                cy.get('[data-testid="close-modal-button"]').click();
                                cy.writeFile('cypress/fixtures/logs.txt', 'Applied for this property: ' + cleanLink + "\n", {flag: 'a+'});
                                cy.writeFile('cypress/fixtures/address.txt', cleanLink + '\n', { flag: 'a+' });
                            })
                        }
                      })
                  });
            }
        })
    }

    startLogging(){
        let formattedTime = DATE + " " + TIME;
        cy.writeFile('cypress/fixtures/logs.txt', '\n\n\n\n*************************************************' + formattedTime + '*************************************************\n', {flag: 'a+'});
    }

    enterUserDetails(noOfBeds){
        cy.get('input[aria-label="name"]').should('be.visible').click({force:true}).then(nameField => {
            cy.wrap(nameField).type(NAME_ANSH, {delay:200}) 
        });
        cy.get('input[aria-label="email"]').type(EMAIL_ANSH, {delay:200});
        cy.get('input[aria-label="phone"]').type(PHONE_NUMBER_ANSH, {delay:200});
        cy.get('input[aria-label="name"]').should('have.value', NAME_ANSH);
        cy.get('input[aria-label="email"]').should('have.value', EMAIL_ANSH);
        cy.get('input[aria-label="phone"]').should('have.value', PHONE_NUMBER_ANSH);

        if(noOfBeds.includes('2')){
            cy.get('textarea[aria-label="message: "]').type(MESSAGE_ANSH_2BED, {delay:50});
            cy.get('textarea[aria-label="message: "]').should('have.text', MESSAGE_ANSH_2BED);
        }
        else if(noOfBeds.includes('3')){
            cy.get('textarea[aria-label="message: "]').type(MESSAGE_ANSH_3BED, {delay:50});
            cy.get('textarea[aria-label="message: "]').should('have.text', MESSAGE_ANSH_3BED);
        }
        else{
            cy.get('textarea[aria-label="message: "]').type(MESSAGE_ANSH_45BED, {delay:50});
            cy.get('textarea[aria-label="message: "]').should('have.text', MESSAGE_ANSH_45BED);
        }
    }
}