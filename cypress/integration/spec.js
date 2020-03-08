describe('Drop down component tests', () => {
  beforeEach(() => {
  cy.visit('http://storybook.b360-dev.autodesk.com/current/iframe.html?id=dropdowntree--default');
  cy.get('.DropdownTree__input-text > span').as('inputBox')
})

it('The select functionality', () => {
  cy.openDropDown()

  //clicking node1
  cy.selectSpecificNode('node1')
  cy.openDropDown()
  cy.verifyNodeArrowState('node1', 'collapsed')
  cy.verifyNodeIsSelected('node1')
  cy.validateNumberSelected()

  cy.clickArrowNearNode('node1')
  cy.selectSpecificNode('node2')
  cy.openDropDown()
  cy.verifyNodeArrowState('node2', 'collapsed')
  cy.verifyNodeIsSelected('node2')
  cy.validateNumberSelected()
  cy.clickArrowNearNode('node2')

  cy.selectSpecificNode('node4')
  cy.openDropDown()
  cy.verifyNodeIsSelected('node4')
  cy.validateNumberSelected()



})


it('The collapse expand functionality', () => {
  cy.openDropDown()
  cy.expandNodeWithChildren('node1')
  cy.verifyNodeArrowState('node1', 'expanded')
  cy.expandNodeWithChildren('node2')
  cy.verifyNodeArrowState('node2', 'expanded')

  cy.collapsedNodeWithChildren('node2')
  cy.verifyNodeArrowState('node2', 'collapsed')
})


it('The clear button functionality', () => {
  cy.openDropDown()
  cy.get('.DropdownMenu').find('.Tree__clear').should('be.disabled')
  cy.selectSpecificNode('node1')
  cy.openDropDown()
  cy.get('.DropdownMenu').find('.Tree__clear').should('not.be.disabled').click()
  cy.get('@inputBox').should('contain', '')
  cy.openDropDown()
  cy.get('.TreeContainer').find('[data-testid="TreeSelection__selected-node"]').should('not.exist');

})


it('The cancel button functionality', () => {
  cy.openDropDown()
  cy.selectSpecificNode('node1')
  cy.openDropDown()
  cy.get('.Tree__cancel').click()
  cy.get('.TreeContainer').should('not.be.visible')
  cy.get('@inputBox').contains('Node 1')
})

})