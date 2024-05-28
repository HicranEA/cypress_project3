import BasePage from './BasePage'

class BookingPage extends BasePage {

  getTripTypeRadioButtons() {
    return cy.get('label.radio input');
  }

  getOneWayButton() {
    return cy.get('[value="One way"]');
  }

  getRoundTripButton() {
    return cy.get('[value="Round trip"]');
  }

  getLabels() {
    return cy.get('.field .label');
  }

  getBookButton() {
    return cy.get('.Button_c_button__TmkRS');
  }

  getSelection() {
    return cy.get('.select > select');
  }

  getBookingInfo() {
    return cy.get('.ml-3 p');
  }
}

export default BookingPage