

//clicking on the expand/collapse icon
Cypress.Commands.add('clickArrowNearNode', (node) => {
    cy.get('[data-testid="TreeSelection__node-header-' + node + '"]').find('[role="button"]').click()
})


// verify if node is expanded or collapsed
Cypress.Commands.add('verifyNodeArrowState', (node, state) => {
    cy.get('[data-testid="TreeSelection__node-header-' + node + '"]').find('.TreeNode').should('have.class', 'TreeNode--' + state)
    //verify icon is present
    cy.get('[data-testid="TreeSelection__node-header-' + node + '"]').find('.TreeNodeExpandIcon__icon').should('be.visible')
})


//TreeNodeExpandIcon__icon

// validate only one node is selected
Cypress.Commands.add('validateNumberSelected', () => {
    cy.get('.TreeContainer').find('[data-testid="TreeSelection__selected-node"]').its('length').should('eq', 1)
})

//open DropdownTree
Cypress.Commands.add('openDropDown', () => {
    cy.get('.DropdownTree__search-box').click()
    cy.get('.TreeContainer').should('be.visible')
})

//select node
Cypress.Commands.add('selectSpecificNode', (node) => {
    cy.get('.TreeContainer').find('[data-testid="TreeSelection__node-header-' + node + '"]').first().click()
})

//check if given node is selected
Cypress.Commands.add('verifyNodeIsSelected', (node) => {
    cy.get('.TreeContainer').find('[data-testid="TreeSelection__node-header-' + node + '"]').children('.TreeNode--selected')
})


// expand node with children and verify new nodes were added after expand
Cypress.Commands.add('expandNodeWithChildren', (node) => {
    let beforeClickDivCount = 0;
cy.get('.TreeContainer').find('.TreeNode__main').then(($node) => {
    beforeClickDivCount = $node.length
})
cy.clickArrowNearNode(node, 'expanded').then(() => {
    cy.get('.TreeNode__main').its('length').should('be.gt', beforeClickDivCount)
})
})


// collapse node with children and verify new nodes were subtracted after collapse
Cypress.Commands.add('collapsedNodeWithChildren', (node) => {
    let beforeClickDivCount = 0;
cy.get('.TreeContainer').find('.TreeNode__main').then(($node) => {
    beforeClickDivCount = $node.length
})
cy.clickArrowNearNode(node, 'collapsed').then(() => {
    cy.get('.TreeNode__main').its('length').should('not.be.gt', beforeClickDivCount)
})
})




