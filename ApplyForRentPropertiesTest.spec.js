/// <reference types="cypress" />

import {ApplyForRentProperties} from '../delegates/ApplyForRentProperties';

const applyForRentProperty = new ApplyForRentProperties();

// Jenkins: http://localhost:8080/
describe('ApplyForRentalProperties', () => {


  it('Apply For Rental Properties From Ansh Account', () => {

    applyForRentProperty.navigateAndSetCookies();
    applyForRentProperty.login();
    applyForRentProperty.startLogging();
    applyForRentProperty.loadPropertiesFromSavedSearches(0);
    applyForRentProperty.applyForProperties();
    applyForRentProperty.loadPropertiesFromSavedSearches(1);
    applyForRentProperty.applyForProperties();
    applyForRentProperty.loadPropertiesFromSavedSearches(2);
    applyForRentProperty.applyForProperties();
    applyForRentProperty.loadPropertiesFromSavedSearches(3);
    applyForRentProperty.applyForProperties();
    applyForRentProperty.loadPropertiesFromSavedSearches(4);
    applyForRentProperty.applyForProperties();
    })

})
