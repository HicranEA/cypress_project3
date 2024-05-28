class BasePage {

    /* Locators */
    getLogo() {
      return cy.get('#logo')
    }
    
    getNavigationDropdown() {
      return cy.get('#dropdown-container')
    }
    
    getMainHeading() {
      return cy.get('#main_heading')
    }
    
    /* Methods */
    clickDropdownOption(option) {
      this.getNavigationDropdown().find('a').contains(option).realClick()
    }
  }
    
  export default BasePage