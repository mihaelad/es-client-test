/// <reference types="cypress" />
///<reference types="cypress-iframe" />
///<reference types="cypress-xpath" />
import "cypress-localstorage-commands";


 describe('Check the ES client screen.', () => {
 it('Check old-dispaly search screen .', () => {
    cy.visit('http://dev.stg.easyscreen.io/#id=40891242430ec5c71b1512954c865861&fit')

    //Check the keyboard and write the born.
    // cy.get('.layout-navigation--footer_left > button:nth-of-type(3)').click()
    //   .wait(1000)
    cy.get('.easyscreen-search--input').find('.easyscreen-text-input--field').click()
    cy.get('[class] .keyboard-fullsize--row:nth-of-type(4) .keyboard-fullsize--simple-key:nth-of-type(6) .keyboard-fullsize--key-wrapper').click()
    cy.get('[class] .keyboard-fullsize--row:nth-of-type(3) .keyboard-fullsize--simple-key:nth-of-type(12) .keyboard-fullsize--key-wrapper').click()
    cy.get('[class] .keyboard-fullsize--row:nth-of-type(2) .keyboard-fullsize--simple-key:nth-of-type(5) .keyboard-fullsize--key-wrapper').click()
   cy.get('[class] .keyboard-fullsize--row:nth-of-type(4) .keyboard-fullsize--simple-key:nth-of-type(7) .keyboard-fullsize--key-wrapper').click()
    cy.get('.search-input--submit-button').click()
    cy.wait(3000)
    //cy.get('.search-cover--image.search-cover_available-online').expect(true).to.be.true()

    cy.request({
      method: "GET",
      url: 'http://stg.lms.inlead.dk/naesbib/search?query=b%C3%B8rn&step=24&sort=date_descending&availableFacets=true&withMeta=true&withHoldings=true',
    }).then((response) => { //request the search and try to found some property
      console.log(response.body);
      // expect.hitCount('eq')
      if (!response.body.objects.length) {
        for (var i = 0; response.body.objects[i].length; i++)
          expect(response.body.objects[i]).to.have.property("cover")
      }
      expect(response).to.have.property("status").to.equal(200);
      expect(response.body).to.have.property("hitCount")
      expect(response.body.objects).to.have.length(24)
    })
    //Check the filter bog and years 2021.
    cy.get('.easyscreen-search-results--facets-group > button:nth-of-type(2)').click()
      .get('.search-facets-list--preview .search-facets-list--preview-element:nth-of-type(3) .search-facets-list--preview-checkbox').click()
      .get('.color-primary.easyscreen-button.easyscreen-button_pill.fixed-width.small-button').click()
      .wait(3000)
    cy.get('.easyscreen-search-results--facets-group .small-button:nth-of-type(4)').click()
      .get('.search-facets .search-facets-list:nth-of-type(6) .search-facets-list--preview-element:nth-of-type(1) .search-facets-list--preview-checkbox').click()
      .get('.color-primary.easyscreen-button.easyscreen-button_pill.fixed-width.small-button').click()

    cy.wait(3000)
    // check the result if the same 389
    cy.get('.easyscreen-search-results--page-info').should('not.be.empty')
    cy.wait(3000)
  })

  it('Check old-dispaly search the concrect material.', () => {
    cy.visit('http://dev.stg.easyscreen.io/#id=40891242430ec5c71b1512954c865861&fit')
      .wait(3000)
      .get('.easyscreen-search--input').find('.easyscreen-text-input--field').type('Atlantiz')
      .get('.search-input--submit-button').click()
      .wait(3000)
      //Check if cover is from lms
      .get('.search-cover--image.search-cover_available').should('have.css', 'background-image').should('include', '/stg.cover.lms.inlead.ws/naesbib/covers/')
      .get('.search-cover--image.search-cover_available').click()
      .wait(3000)

    //Check the autor.
    cy.get('.material-detail_available .material-detail--author').should('contain', 'Publius Enigma')
    //Check the description of material.
    cy.get('.material-detail_available .material-detail--content-group:nth-of-type(2) .material-detail--content').should('have.be', 'text')
    //Check if the tags are the buttons. 
    cy.get('.material-detail_available .material-detail--content-group:nth-of-type(3) .easyscreen-foldable--content').should('have.be', 'button')
    //Check the holdings if they are in the table.
    cy.get('.material-detail_available .meta-information-table').should('have.be', 'table')
    //Check if reservation are on the page and if it is the button.
    cy.get('.color-primary.easyscreen-button.easyscreen-button_pill.fixed-height.full-width.small-button').should('contain', 'Reservér')
    //Check the point on holding.
    cy.get('.material-detail--holdings [aria-hidden]').should('have.class', 'fa fa-map-marker material-detail--wayfinder-marker').click()
    //Check the width modal.
    cy.get(".easyscreen-carousel--wrapper > div div[role='dialog'] > .v-modal--content").should('have.css', 'min-width', '100%')

    ///check image map

    //Check the height modal.
    cy.get(".easyscreen-carousel--wrapper > div div[role='dialog'] > .v-modal--content").should('have.css', 'min-height', '100%')
    //Check the link wf.
    cy.get(".easyscreen-iframe--frame").should('have.attr', 'src').should('include', '/wf-dev.stg.easyscreen.io/')
      .wait(3000)
    //Click on close button on wf.
    cy.get('.material-detail--close-button_bottom-right').should('have.be', 'button').click()
      .wait(3000)
  })

  it('Check old-dispaly the search sugestion.', () => {
    cy.visit('http://dev.stg.easyscreen.io/#id=40891242430ec5c71b1512954c865861&fit')
      .wait(3000)
      .get('.easyscreen-search--input').find('.easyscreen-text-input--field').type('Harry')
      .wait(1000)
      .get('.search-suggestions_design-classic').should('not.be.empty')

    cy.get('.search-suggestions--hit')
      .should('not.be.empty')
      .and(($suggestions) => {
        // should have found 5 elements
        expect($suggestions).to.have.length(5)

        // make sure the first contains some text content
        expect($suggestions.first()).to.contain('harry potter')
      })
    cy.get('.search-suggestions--content .search-suggestions--hit:nth-of-type(4)').click()
      .wait(3000)
      .get('.search-cover--title').contains('Harry Pottcast & Fangen fra Azkaban')
      .wait(2000)
  })
  it('Check old-dispaly the popular search.', () => {
    cy.visit('http://dev.stg.easyscreen.io/#id=40891242430ec5c71b1512954c865861&fit')
      .get('.popular-searches-inline.popular-searches-multiline .tags-inline').should('not.be.empty')
      .get('.tags-inline--item')
      .and(($popular) => {
        // should have found 3 elements
        expect($popular).to.have.length(3)
      })
      .get('.tags-inline > span:nth-of-type(3)').click()
      .wait(3000)
      .get('.easyscreen-carousel--item').should('not.be.empty')
  })
  it('Check old-dispaly the filter from search.', () => {
    cy.visit('http://dev.stg.easyscreen.io/#id=40891242430ec5c71b1512954c865861&fit')
      .get('.easyscreen-search--input').find('.easyscreen-text-input--field').type('de røde heste')
      .get('.search-input--submit-button').click()
      .wait(3000)
      //Check first Item should be Litteraturland.
      .get('.easyscreen-carousel--wrapper .easyscreen-carousel--slide:nth-of-type(1) .easyscreen-carousel--row:nth-of-type(1) .easyscreen-carousel--item:nth-of-type(1) div:nth-child(3) div:nth-of-type(1)').should('contain', 'Litteraturland')
      .get('.easyscreen-input.easyscreen-select--preview.search-input--select-view').click()
      .wait(1000)
      //Cheanged filtration Forfatter A-Å.
      .get('.easyscreen-select--options > :nth-child(4) > .easyscreen-select--option-text').click()
      .wait(3000)
      //Check first Item should be Han skabte billedet af dansk idyl.
      .get('.easyscreen-carousel--wrapper .easyscreen-carousel--slide:nth-of-type(1) .easyscreen-carousel--row:nth-of-type(1) .easyscreen-carousel--item:nth-of-type(1) div:nth-child(3) div:nth-of-type(1)').should('contain', 'Han skabte billedet af dansk idyl')
      .get('.easyscreen-input.easyscreen-select--preview.search-input--select-view').click()
      .wait(1000)
      //Cheanged filtration Titel A-Z.
      .get('.easyscreen-select--options > :nth-child(2) > .easyscreen-select--option-text').click()
      //Check first Item should be 1000 danske digte.
      .get('.easyscreen-carousel--wrapper .easyscreen-carousel--slide:nth-of-type(1) .easyscreen-carousel--row:nth-of-type(1) .easyscreen-carousel--item:nth-of-type(1) div:nth-child(3) div:nth-of-type(1)').should('contain', '1000 danske digte')
  })
})
