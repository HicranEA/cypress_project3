/// <reference types="cypress"/>

import BookingPage from '../../pages/BookingPage'

describe('Project03 - Booking Function', () => {

  const bookingPage = new BookingPage()

    beforeEach(() => { 
      cy.visit('https://techglobal-training.com/frontend/project-3');
    
    });

   it('Test Case 01 - Validate the default Book your trip form', () => {

    bookingPage.getTripTypeRadioButtons().each(($el, index) => {
        cy.wrap($el).should('be.visible').and('be.enabled');
    });

    bookingPage.getOneWayButton().should('be.checked');
    bookingPage.getRoundTripButton().should('not.be.checked');

    bookingPage.getLabels().each(($el, index) => {
        cy.wrap($el).should('be.visible').next().should('be.visible');
    
      if($el.text().includes('Return')) cy.wrap($el).next().find('input').should('have.attr', 'disabled');
      if ($el.text().includes('Number of passengers')) cy.wrap($el).next().find('option').should('have.value', '1');
      if ($el.text().includes('Passenger 1')) cy.wrap($el).next().find('option').should('have.value', 'Adult (16-64)');
    })
    
    bookingPage.getBookButton().should('be.visible').and('be.enabled');    

    });
    

    it('Test Case 02 - Validate the Book your trip form when Round trip is selected', () => {

    bookingPage.getRoundTripButton().click().should('be.checked');
    bookingPage.getOneWayButton().should('not.be.checked');


    bookingPage.getLabels().each(($el, index) => {
      cy.wrap($el).should('be.visible').next().should('be.visible');

     if ($el.text().includes('Number of passengers')) cy.wrap($el).next().find('option').should('have.value', '1');
     if ($el.text().includes('Passenger 1')) cy.wrap($el).next().find('option').should('have.value', 'Adult (16-64)');
  })

    bookingPage.getBookButton().should('be.visible').and('be.enabled');    

    })

    it('Test Case 03 - Validate the booking for 1 passenger and one way', () => {

      bookingPage.getOneWayButton().click();

      const dropdowns = ['Business', 'Illinois', 'Florida', '1', 'Senior (65+)']

      bookingPage.getSelection().each(($el, index) => {
        cy.wrap($el).select(dropdowns[index])
      })

      const today = new Date();
      const departDate = new Date(today.setDate(today.getDate() + 7)).toLocaleDateString('en-US', {year:'2-digit', month:'2-digit', day:'2-digit'});
      
      cy.get('.react-datepicker__input-container').first().clear().click().type(`${departDate}{enter}`);

      bookingPage.getBookButton().click();

      cy.get('.ml-3 h1').should('have.text', "DEPART");
      cy.get('.ml-3 h3').should('have.text', "IL to FL");

      const newFormat = new Date(departDate).toDateString();
  
      const bookingInfoOutput = [newFormat, `Number of Passengers: ${dropdowns[3]}`, `Passenger 1: ${dropdowns[4]}`, `Cabin class: ${dropdowns[0]}`]

      bookingPage.getBookingInfo().each(($el, index) => {
        cy.wrap($el).should('have.text', bookingInfoOutput[index]);
      });

    });

    it('Test Case 04 - Validate the booking for 1 passenger and round trip', () => {

        bookingPage.getRoundTripButton().click();
  
        const dropdowns = ['First', 'California', 'Illinois', '1', 'Adult (16-64)']
  
        bookingPage.getSelection().each(($el, index) => {
          cy.wrap($el).select(dropdowns[index])
        })
  
        const today = new Date();
        const departDate = new Date(today.setDate(today.getDate() + 7)).toLocaleDateString('en-US', {year:'2-digit', month:'2-digit', day:'2-digit'});
        const returnDate = new Date(today.setDate(today.getDate() + 30)).toLocaleDateString('en-US', {year:'2-digit', month:'2-digit', day:'2-digit'});
  
        cy.get('.react-datepicker__input-container input').first().clear().click().type(`${departDate}{enter}`);
        cy.get('.react-datepicker__input-container input').last().clear().click().type(`${returnDate}{enter}`);
  
        bookingPage.getBookButton().click();
  
        cy.get('.ml-3 h1').first().should('have.text', "DEPART");
        cy.get('.ml-3 h1').last().should('have.text', "RETURN");
        cy.get('.ml-3 h3').first().should('have.text', "CA to IL");
        cy.get('.ml-3 h3').last().should('have.text', "IL to CA");
  
        const newFormat1 = new Date(departDate).toDateString();
        const newFormat2 = new Date(returnDate).toDateString();
    
        const bookingInfoOutput = [newFormat1, newFormat2, `Number of Passengers: ${dropdowns[3]}`, `Passenger 1: ${dropdowns[4]}`, `Cabin class: ${dropdowns[0]}`]
  
        bookingPage.getBookingInfo().each(($el, index) => {
          cy.wrap($el).should('have.text', bookingInfoOutput[index])
        })  
    })

    it('Test Case 05 - Validate the booking for 2 passengers and one way', () => {

      bookingPage.getOneWayButton().click();

      const dropdowns = ['Premium Economy', 'New York', 'Texas', '2', 'Adult (16-64)', 'Child (2-11)']

      bookingPage.getSelection().eq(3).select(dropdowns[3]);

      bookingPage.getSelection().each(($el, index) => {
        cy.wrap($el).select(dropdowns[index])
      })

      const today = new Date();
      const departDate = new Date(today.setDate(today.getDate() + 1)).toLocaleDateString('en-US', {year:'2-digit', month:'2-digit', day:'2-digit'});
      
      cy.get('.react-datepicker__input-container').first().clear().click().type(`${departDate}{enter}`);

      bookingPage.getBookButton().click();

      cy.get('.ml-3 h1').should('have.text', "DEPART");
      cy.get('.ml-3 h3').should('have.text', "NY to TX");

      const newFormat = new Date(departDate).toDateString();
  
      const bookingInfoOutput = [newFormat, `Number of Passengers: ${dropdowns[3]}`, `Passenger 1: ${dropdowns[4]}`, `Passenger 2: ${dropdowns[5]}`, `Cabin class: ${dropdowns[0]}`]

      bookingPage.getBookingInfo().each(($el, index) => {
        cy.wrap($el).should('have.text', bookingInfoOutput[index]);
      });

    });
  })

