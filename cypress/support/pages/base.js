export class defaultSt {
  createNewPs(psname) {
    cy.get('a span#extdd-3').rightclick()
      .should('be.visible')
      .get('span.x-menu-item-text').click()
      .get('input.x-form-text.x-form-field.x-form-invalid').click()
      .type(psname)
      .wait(1000)
    cy.get('.x-toolbar-right-row')

    // Saved new PS
    cy.get('.x-btn-text')
      .wait(5000)
      .contains('Save').click({ multiple: true })
    cy.wait(5000)
  }

  focusPS(nameps) {
    cy.contains(nameps).rightclick()
      .wait(1000)
  }

  addSlide(slideName) {
    cy.get('.x-menu-item.context-add')
      .contains('Add Slide').click()
      .wait(1000)
    cy.get('.x-form-element input#title')
      .type(slideName)
  }

  addTemplate() {
    // Choose tamplate
    cy.get(".x-window-body [method] > [tabindex='-1']:nth-child(5)").click();
    cy.get('.x-combo-list-inner div:nth-of-type(9)').contains('Fullscreen')
      .click();

    // Click save
    cy.get('.x-btn-text')
      .wait(1000)
      .contains('Save').click({ multiple: true })
    cy.wait(1000)
  }

  publishSlide() {
    cy.get('.x-btn-mc')
      .wait(1000)
      .contains('Yes').click({ multiple: true })
  }

  themeDS(query) {
    cy.get("#editPageFrame").its('0.contentDocument.body').find("input[value='Digital Shelf']").should('be.visible').click()
    cy.get('input#new-theme-input').should('be.visible').type(query)
    cy.get('.addIcon.x-btn-text').should('be.visible').click()
    cy.wait(2000)
    cy.get('.x-grid3-cell-inner.x-grid3-col-3 > img:nth-of-type(1)').click()
    cy.wait(1000)
    cy.contains('Search settings').should('be.visible').click()

    cy.get(".x-form-element > textarea[name='query']").type(query)
    cy.contains('Save & close').click()
    cy.wait(5000)
    cy.contains('Save').click()
    cy.wait(5000)
  }

  editSlide(slide) {
    //Rightclick on slide to see menu and check the edit slide.
    cy.contains(slide).rightclick({ multiple: true })
    cy.wait(2000)

    cy.get('.context-edit.x-menu-item > .x-menu-item-text').click()
    cy.wait(5000)
    //Click on button add to adding the CT.
  }

  frameModalClick(findElm) {
    cy.get("#editPageFrame").its('0.contentDocument.body').find(findElm).should('be.visible').click()
  }

  frameModalType(findElm,nameElm) {
    cy.get("#editPageFrame").its('0.contentDocument.body').find(findElm).should('be.visible').type(nameElm)
  }

  addBtn() {
    cy.get("#editPageFrame").its('0.contentDocument.body').find("input[value='Add']").should('be.visible').click()
  }

  chooseCT(nameCT) {
    cy.get('.x-form-field-trigger-wrap.x-form-field-wrap > img').should('be.visible').click()
    cy.wait(2000)
      //Click to DS CT.
      .get(nameCT).should('be.visible').click()
    cy.contains('Add').click({ multiple: true })
      .wait(1000)
  }

  previewSlide(slide) {
    //Click to see preview
    cy.contains(slide).rightclick()
    cy.wait(2000)
    cy.get('.context-preview.x-menu-item > .x-menu-item-text').click({ multiple: true })
  }
 
}

export const baseConf = new defaultSt()
