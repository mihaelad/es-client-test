/// <reference types="cypress" />
///<reference types="cypress-iframe" />
///<reference types="cypress-xpath" />

import "cypress-localstorage-commands";

 describe('Check the ES client screen.', () => {

  it.only('Visual Shelf', () =>{
    cy.visit('https://dev.stg.easyscreen.io/#id=128e4dbdf4533ecb17c6037ee95aba4f&fit')
    .wait(2000)
    cy.get('.inspiration-scanner-carousel--title').should('be.visible')
    cy.get('.inspiration-scanner-carousel--content')
    cy.get('.easyscreen-carousel--wrapper .easyscreen-carousel--slide .easyscreen-carousel--item .inspiration-scanner-carousel--element').and(($material) => {
      //Should have found more 0 elements.
        expect($material).to.have.length.gt(0)
      })
      cy.get('.easyscreen-carousel--wrapper .easyscreen-carousel--slide .easyscreen-carousel--item .inspiration-scanner-carousel--element-title').should("be.visible")
      cy.get('.easyscreen-carousel--item').first().click()
      .wait(3000)
    cy.get('.layout-navigation--footer').should('be.visible')
      cy.get('.layout-navigation--footer').should('be.visible')
      .contains('Hjem').click()

    cy.get('.layout-navigation--footer').contains('Tilbage').should('be.visible')
    cy.get('.easyscreen-carousel--item').first().click()
      .wait(3000)
    cy.get('.layout-navigation--footer').contains('Tilbage').click()

    cy.get('.layout-navigation--footer').contains('Søg').should('be.visible')
    cy.get('.layout-navigation--footer').contains('Søg').click()
    .wait(3000)
    cy.get('.layout-navigation--footer').should('be.visible')
      .contains('Hjem').click()

    cy.get('.layout-navigation--footer').should('be.visible')
      .contains('Kort').click()
      .wait(5000)
    cy.get('.layout-navigation--footer').contains('Tilbage').click()
    cy.get('.layout-navigation--title').should('be.visible')    
    cy.get('.easyscreen-search-results--close-button').should('be.visible').click()
      .wait(5000)
      .get('.easyscreen-search-results-light--carousel')
      .contains('Hjem').click()
  })

  it('Library Event', () =>{
    cy.visit('https://dev.stg.easyscreen.io/#id=5bfde7fb6d099c11d61a9639bc3b5a9e&fit')
    .wait(2000)
    cy.get('.library-events-timetable--header').should('be.visible')
    cy.get('.library-events-timetable--week-days').should('be.visible')
    cy.get('.library-events-timetable--event').should('be.visible')
    cy.get('.easyscreen-scrollable--content .library-events-timetable--event .library-events-timetable--event-time').should('be.visible')
    cy.get('.easyscreen-scrollable--content .library-events-timetable--event .library-events-timetable--event-title').should('be.visible')
    cy.get('.easyscreen-scrollable--content .library-events-timetable--event .library-events-timetable--event-location').should('be.visible')
    cy.get('.library-events-timetable--active-date').should('be.visible')
    //cy.get('').should('be.visible')
    //cy.get('').should('be.visible')
    //Check the footer elements should be visible and clickable.
  })

  it('Check DS elements', () => {
    cy.visit('https://dev.stg.easyscreen.io/#id=f234fd73cc4def83dac0d5aae6cbf84e&fit')
    .wait(2000)
    cy.get('.digital-shelf-light--theme').and(($theme) => {

    //Should have found more 0 elements.
      expect($theme).to.have.length.gt(0)
    })

    //Check the footer elements should be visible and clickable.
    cy.get('.layout-navigation--footer').should('be.visible')
      .contains('Hjem').should('be.visible')
    cy.get('.easyscreen-carousel--item').first().click()
      .wait(3000)
    cy.get('.layout-navigation--footer').should('be.visible')
      .contains('Hjem').click()

    cy.get('.layout-navigation--footer').contains('Tilbage').should('be.visible')
    cy.get('.easyscreen-carousel--item').first().click()
      .wait(3000)
    cy.get('.layout-navigation--footer').contains('Tilbage').click()

    cy.get('.layout-navigation--footer').contains('Søg').should('be.visible')
    cy.get('.layout-navigation--footer').contains('Søg').click()
      .get('.easyscreen-search--input').find('.easyscreen-text-input--field').type('Inferno')
      .get('.search-input--submit-button').click()
      .wait(3000)
    cy.get('.layout-navigation--footer').should('be.visible')
      .contains('Hjem').click()

    cy.get('.layout-navigation--footer').should('be.visible')
      .contains('Kort').click()
      .wait(3000)
    cy.get('.layout-navigation--footer').contains('Tilbage').click()
    cy.get('.layout-navigation--title').should('be.visible')
    
    cy.get('.digital-shelf-light--themes div:nth-of-type(2) .digital-shelf-light--theme-text_default').click()
      .wait(3000)
    cy.get('.easyscreen-carousel--item')
      .should('not.be.empty')
      .and(($item) => {
        //Should elements be visible.
        expect($item).have.be.visible
        
      })
      .first().click()
      .wait(2000)

    //Check the autor should not be empty.
    cy.get('.material-detail-light--author').invoke('text').should('not.be.empty')

    //Check the description of material.
    cy.get('.material-detail-light--content-group:nth-child(3) .easyscreen-foldable--content').invoke('text').should('not.be.empty') 

    //Check the Tags of material.
    cy.get('.materials-list.easyscreen-carousel.easyscreen-carousel_slide > div:nth-child(1)')
      .then($body => {
        if ($body.find('.material-detail-light--subject').length) {
          cy.get('.easyscreen-carousel--slide .material-detail-light--content-title').should('contain', 'Emner:')
          cy.get('.material-detail-light--text-section .material-detail-light--content-group').should('not.be.empty')
            .get('.easyscreen-foldable--content .material-detail-light--subject').invoke('text').should('have.length.gt', 0)
        }
       else cy.task('log', 'Emner missing')
      })

    //Check the details material if they are in the page.
    cy.get('.materials-list.easyscreen-carousel.easyscreen-carousel_slide > div:nth-child(1)')
      .then($body => {
        if ($body.find('.material-detail-light--meta').length) {
          cy.get('.easyscreen-carousel--slide tr td').should('be.visible')
        }
        else cy.task('log', 'Detaljer om materialet is missing')
      })
    cy.wait(3000)

    //Check the holdings if they are in the page.
    cy.get('.materials-list.easyscreen-carousel.easyscreen-carousel_slide > div:nth-child(1)')
      .then($body => {
        if ($body.find('.materials-list--element .material-detail-light--holdings').length) {
          cy.get('.material-detail-light--content-group .material-detail-light--content-title').should('contain', 'Find bogen her')
            .get('.material-detail-light--holdings').should('have.be', 'table')
            .get('.material-detail-light--holdings > tbody > tr > td').should('have.length.gt', 0)

          cy.get('.material-detail-light--holdings')
          .wait(2000)
          if (cy.get(".easyscreen-carousel--slide .material-detail-light--content-group tbody tr td")) {
            cy.get('.material-detail-light--holdings > tbody > tr > td').should('have.length.gt', 0)
          } else {
            cy.get(".easyscreen-carousel--slide .material-detail-light--content-group span").invoke('text').should('have.be.visible')

          }
        }
        else cy.task('log', 'Holding is missing')
      })
    cy.wait(3000)
   
    //Check the Button reserve if they are in the page.
    cy.get('.materials-list--element .material-detail-light--controls')
      .then($body => {
        if ($body.find('.material-detail-light--material-button_reserve:nth-child(1)').length) {
          cy.get('.material-detail-light--primary-controls > .material-detail-light--material-button').and($buttonReserv => {
            expect($buttonReserv).contain('Reservér')
          })
        }
        else cy.task('log', 'Button reserve is missing')
      })

    //Check the Buttons info if they are in the page.
    cy.get('.materials-list--element .material-detail-light--controls')
      .then($body => {
        if ($body.find('.material-detail-light--material-button_more-information').length) {
          cy.get('.material-detail-light--secondary-controls .material-detail-light--material-button_more-information').and($buttonInfo => {
            expect($buttonInfo).contain('Mere information')
          })
          cy.get('.materials-list-modal .material-detail-light--secondary-controls .material-detail-light--material-button_more-information')
          .first()
          .click()

          cy.wait(3000)
            .get(".easyscreen-carousel--wrapper div[role='dialog']").then($modal => {
              cy.get('.material-detail-light--full-details-title').should('be.visible')
                .wait(3000)
              if ($modal.find('.vm--container .v-modal--content .material - detail - light--holdings').length) {
                cy.get('.material-detail-light--content-group.material-detail-light--full-details-holdings').should('be.visible')
              }
              if ($modal.find('.vm--container .v-modal--content .material-detail-light--full-details-subject').length) {
                cy.get('.vm--container .v-modal--content .material-detail-light--full-details-subject .material-detail-light--content-title').should('be.visible')
              }
           
              if ($modal.find('.material-detail-light--content-group.material-detail-light--full-details-meta').length) {
                cy.get('.material-detail-light--content-group.material-detail-light--full-details-meta').should('be.visible')
              }

              cy.get('.material-detail-light--full-details-image div').should('have.css', 'background-image')
              .get('.material-detail--close-button_top-right').click()
            })
        }
        else cy.task('log', 'Buttons info is missing')
      })
    
    cy.wait(1000)

    //Check the Button Reviews if they are in the page.
    cy.contains("Omtaler").if()
    .then(() => {
      cy.contains("Omtaler").click()
        .wait(3000)
      cy.get(".material-detail-light--reviews-list > .material-detail-light--reviews-list-element").first().click()
      cy.get('.modal-layout.modal-layout_design-light').if()
          .then(() => {
            cy.get('.color-primary.easyscreen-button.easyscreen-button_round.fixed-width.small-button').click()
            .wait(3000)
          })
      .else().get('.material-detail--close-button_top-right').click()
    })
    .else().task('log', 'Buttons Reviews is missing')


    cy.wait(1000)
    //Check the Button ereleon if they are in the page.
    cy.contains("Smagsprøve ").if()
      .then(() => {
        cy.contains("Smagsprøve ").click()
          .wait(5000)
        cy.frameLoaded('.easyscreen-iframe--frame')
        cy.get(".easyscreen-iframe--frame").its('0.contentDocument.body').find('div#pubhub-reader').should('be.visible')
        cy.get('.material-detail--close-button').first().click()
        .wait(5000)
        
      })
      .else().task('log', 'Buttons Smagsprøve  is missing')
    
    //Check the Button Inspiration check if they are items.
    cy.get('.material-detail-light--secondary-content-navigation div:nth-of-type(1)')
    .first().click()

    cy.get('.material-detail-light--suggested-list-carousel .easyscreen-carousel--slide:nth-of-type(1) .easyscreen-carousel--row .easyscreen-carousel--item').and($carousel => {
      expect($carousel).length.gt(0)
    })
    cy.get('.materials-list--element .material-detail-light--suggestions .easyscreen-carousel--item').and($items => {
      expect($items).length.gt(0)
    })
  })

  it('Check FullScreen URL.', () => {
    cy.visit('https://dev.stg.easyscreen.io/#id=32980c40723e1edb10d23cff76bfe1f6')
    cy.get('.easyscreen-iframe--wrapper').should('be.visible')
    cy.get('.easyscreen-iframe--frame').should('be.visible').should('have.attr', 'src').should('include', '/fjernleje-stg.filmstriben.dk/')
  })

  it('Check image.', () => {
    cy.visit('https://dev.stg.easyscreen.io/#id=b074b1e765b8d865a7578ee117a31c6a')
    cy.get('body > .landscape-orientation.presentation-set')
    cy.get('.presentation-set--element.presentation-set--element_text-and-image.presentation-set--element_with-background')
    cy.get('.easyscreen-progress-bar--progress').should('be.visible')
    cy.get('.text-and-image--image')
      .should('have.css', 'background-image')
      .should('include', '/image/')
  })

  it('Check image and text.', () => {
    cy.visit('https://dev.stg.easyscreen.io/#id=67a9839bcb9bee1773613450f98747a5')
    cy.get('.presentation-set--element.presentation-set--element_text-and-image.presentation-set--element_with-background')
    cy.get('.text-and-image.text-and-image_align-width.text-and-image_design-light')
    cy.get('.text-and-image--title').should('be.visible')
    cy.get('.text-and-image--subtitle').should('be.visible')
      .get('.easyscreen-scrollable--content-wrapper.easyscreen-scrollable--smooth-edge').should('be.visible')
    cy.get('.text-and-image.text-and-image_align-width.text-and-image_design-light .text-and-image--image')
      .should('be.visible')
      .should('have.css', 'background-image')
      .should('include', '/image/')
  })

  it('Check Material promotions.', () => {
    cy.visit('https://dev.stg.easyscreen.io/#id=2e2c21fb21e4700f6725bc6e4a504b03&fit')
    .wait(300)
    cy.get('.material-promotion--header').should('be.visible')
    cy.get('.material-promotion--content').should('be.visible')
    cy.get('.material-promotion-carousel-multimple-view--title').should('be.visible')
    cy.get('.easyscreen-carousel--wrapper .easyscreen-carousel--slide .easyscreen-carousel--row .easyscreen-carousel--item').should('be.visible').and($item => {
      expect($item).to.be.length.gte(0)
    })
    cy.get(".easyscreen-carousel--wrapper .easyscreen-carousel--slide:nth-of-type(1) .easyscreen-carousel--item:nth-of-type(1) .material-promotion-carousel-multimple-view--element-image").should('have.attr', 'src').should('include', '/stg.cover.lms.inlead.dk/')
    cy.get('.material-promotion-carousel-multimple-view--element-info').should('be.visible')
    cy.get('.material-promotion-carousel-multimple-view--element-title').should('be.visible').should('have.been','h2')
    cy.get('.material-promotion-carousel-multimple-view--element-teaser').should('be.visible')
    cy.get('.easyscreen-progress-bar.presentation-set--duration-bar').should('be.visible')
  })

  it('Check the nodelist.', () => {
    cy.visit('https://dev.stg.easyscreen.io/#id=1877bc8c9a59b3d106f8bba5a9d404c8&fit')
      .wait(3000)
    
    cy.get('h1.node-list-carousel-default-slide--title').should('be.visible')
    cy.get('.node-list-carousel--element').and($node => {
      expect($node).to.be.length.gte(0)
    })

    cy.get('.easyscreen-carousel--wrapper .node-list-carousel-default-slide--date').should('be.visible')
    cy.get('.easyscreen-carousel--wrapper .node-list-carousel-default-slide--location').should('be.visible')
    cy.get('.easyscreen-carousel--wrapper .node-list-carousel-default-slide--teaser.ck-editor').should('be.visible')

    cy.get('.easyscreen-carousel--wrapper .easyscreen-carousel--slide:nth-of-type(1) [totalelements]').should('be.visible').should('have.css', 'background-image').and('include', '/v2.mobilesearch.inlead.ws/')
  })

  it('Check the QR-Shelf.', () => {
    cy.visitMobile('https://dev.stg.easyscreen.io/#id=59b112b9ae89e549f04681106cc99108&fit')
    cy.viewport(1080, 1920)
    cy.wait(5000)
    
    //Check if theme name is visible.
    cy.get('.qr-shelf--groups .qr-shelf--group:nth-of-type(1) .qr-shelf--group-title').should('be.visible').contains('Drama')
    //Check if items are more than 0.
    cy.get('.qr-shelf--groups .qr-shelf--group:nth-of-type(1) .easyscreen-carousel--row .easyscreen-carousel--item').and($item => {
      expect($item).to.be.length.gt(0)      
    })
    //Check if items have cover from lms.
    cy.get(".qr-shelf--groups .qr-shelf--group:nth-of-type(1) .easyscreen-carousel--row .easyscreen-carousel--item:nth-of-type(1) img").should('have.attr', 'src').should('include', '/stg.cover.lms.inlead.dk/')
    //Check if items cover is visible.
    cy.get('.qr-shelf--groups > div:nth-child(1) img').should('be.visible').should('have.attr', 'src').should('include', '/stg.cover.lms.inlead.dk/')
    //Check if items QR-code is visible and it came from lms.
    cy.get('.qr-shelf--groups > div:nth-child(1) div.qr-shelf-cover--qr-code').should('be.visible').should('have.css', 'background-image').and('include', '/stg.cover.lms.inlead.dk/')
    //Check if 2theme name is visible.
    cy.get('.qr-shelf--groups .qr-shelf--group:nth-of-type(2) .qr-shelf--group-title').should('be.visible').contains('Harry')
    //Check if items are more than 0.
    cy.get('.qr-shelf--groups .qr-shelf--group:nth-of-type(2) .easyscreen-carousel--slide:nth-of-type(1) .easyscreen-carousel--row .easyscreen-carousel--item').and(($item2) => {
      expect($item2).to.have.length.gt(0)
    })
    //Check if QR shelf have the navigation.
    cy.get('.qr-shelf--navigation').should('be.visible')

    //Click on second dot in the navigation.
    cy.get('.qr-shelf--navigation .qr-shelf--navigation-element:nth-of-type(2)').should('be.visible').click()
      .wait(2000)
    
    //If the click was did the active dots should be second's.
    cy.get('.qr-shelf--navigation .qr-shelf--navigation-element:nth-of-type(2)').should('have.class', 'qr-shelf--navigation-element_active')
    //Check if 2theme name is visible.
    cy.get('.qr-shelf--groups .qr-shelf--group:nth-of-type(2) .qr-shelf--group-title').should('be.visible').contains('Harry')
    cy.get('.qr-shelf--groups .qr-shelf--group .easyscreen-carousel--row .easyscreen-carousel--item').and($item => {
      expect($item).to.be.length.gt(0)
    })

    cy.get('.qr-shelf--groups .qr-shelf--group:nth-of-type(2) .easyscreen-carousel--slide:nth-of-type(1) .easyscreen-carousel--row')
      .swipe({ delay: 2000 }, 'right', 'left').wait(3000)
      .swipe({ delay: 2000 }, [[400, 950], [0, 950]])
      .wait(3000)
 
  })

  it('Check the search screen.', () => {
    cy.visit('https://dev.stg.easyscreen.io/#id=40891242430ec5c71b1512954c865861')
    cy.wait(3000)

    cy.request({
      method: "GET",
      url: 'https://stg.lms.inlead.dk/naesbib/search?query=%22krimi%22%20AND%20facet.type%3Dbog%20AND%20facet.language%3Dengelsk&step=32&availableFacets=true&availableOnly=true&withMeta=true&withHoldings=true&withCoversOnly=true',
    }).then((response) => { //request the search and try to found some property
      console.log(response.body);
      if (!response.body.objects.length) {
        for (var i = 0; response.body.objects[i].length; i++)
          expect(response.body.objects[i]).to.have.property("cover")
      }
      expect(response).to.have.property("status").to.equal(200);
     expect(response.body).to.have.property("hitCount")
     expect(response.body.objects).to.have.length(32)
    })

  })
  it('Search the concrect material.', () => {
    cy.visit('https://dev.stg.easyscreen.io/#id=f234fd73cc4def83dac0d5aae6cbf84e&fit')
      .wait(3000)
    cy.get('.layout-navigation--footer_left > button:nth-of-type(3)').click()
      .wait(1000)
      .get('.easyscreen-search--input').find('.easyscreen-text-input--field').type('Inferno')
      .get('.search-input--submit-button').click()
      .wait(3000)
      //Check if cover is from lms
      .get('.easyscreen-search-results-light--facets-group > button:nth-of-type(3)').click()
      .get('.search-facets-list--preview .search-facets-list--preview-element').contains('Bog')
      .if().then(() => {
        cy.get('.search-facets-list--preview .search-facets-list--preview-element').contains('Bog')
          .click()
          .get('.easyscreen-button-group > .color-primary').click()
        })
      .else().then(() => {
        cy.get('.search-facets-list--preview .search-facets-list--preview-element').contains('Brown, Dan').click()
        cy.get('.easyscreen-button-group > .color-primary').click()
      })

    
    cy.get('.search-cover--title').contains('Inferno')
        .wait(2000)
      .get('.search-cover--author').contains('Brown')
     cy.get('.easyscreen-carousel--row .easyscreen-carousel--item div > div.search-cover--image').then($elements => {
        expect($elements).to.have.css('background-image').include('/stg.cover.lms.inlead.dk/')
      })
      
      .get('.search-cover--author').contains('Brown').click()
      .wait(3000)
  })
  
  it('Check the popular search.', () => {
    cy.visit('https://dev.stg.easyscreen.io/#id=f234fd73cc4def83dac0d5aae6cbf84e&fit')
    .wait(3000)
    cy.get('.layout-navigation--footer_left > button:nth-of-type(3)').click()
      .wait(3000)
      .get('.popular-searches-inline.popular-searches-multiline .tags-inline').should('not.be.empty')
      .get("body > .landscape-orientation.presentation-set > .presentation-set--element.presentation-set--element_digital-shelf-light.presentation-set--element_with-background > .digital-shelf-light.landscape-orientation  .modal-layout--content.modal-layout--content_no-header  .easyscreen-search-light.landscape-orientation.modal-fullscreen.vm--container.vm_absolute.vm_design-classic > div[role='dialog'] > .v-modal--content .popular-searches-list-with-covers--list > div")
      .and(($popular) => {
        // should have found 3 elements
        expect($popular).to.have.length(4)
      })
      .get('.easyscreen-search-light--popular-searches.easyscreen-search-light--popular-searches_suggestions-found > div').first().click()
      .wait(3000)
      .get('.easyscreen-carousel--item').should('not.be.empty')
  })

  it('Check the filter from search.', () => {
    cy.visit('https://dev.stg.easyscreen.io/#id=f234fd73cc4def83dac0d5aae6cbf84e&fit')
    cy.get('.layout-navigation--footer_left > button:nth-of-type(3)').click()
      .wait(3000)
      .get('.easyscreen-search--input').find('.easyscreen-text-input--field').type('born')
      .get('.search-input--submit-button').click()
      .wait(3000)
      //Check first Item should be Litteraturland.
      .get('.easyscreen-carousel--wrapper .easyscreen-carousel--slide:nth-of-type(1) .easyscreen-carousel--row:nth-of-type(1) .easyscreen-carousel--item:nth-of-type(1) div:nth-child(3) div:nth-of-type(1)').then(($title1) => {
        const txt = $title1.text()
      
        cy.get('.easyscreen-input.easyscreen-select--preview.search-input--select-view').click()
          .wait(1000)
      //Cheanged filtration Forfatter A-Å.
          .get('.easyscreen-select--options > :nth-child(4) > .easyscreen-select--option-text').click()
          .wait(3000)
        cy.get('.easyscreen-carousel--wrapper .easyscreen-carousel--slide:nth-of-type(1) .easyscreen-carousel--row:nth-of-type(1) .easyscreen-carousel--item:nth-of-type(1) div:nth-child(3) div:nth-of-type(1)').should($title2 => {
          expect($title2.text()).to.not.eq(txt)
        })
        
        
      //Check first Item should be Han skabte billedet af dansk idyl.
      .get('.easyscreen-input.easyscreen-select--preview.search-input--select-view').click()
      .wait(1000)
      //Cheanged filtration Titel A-Z.
      .get('.easyscreen-select--options > :nth-child(2) > .easyscreen-select--option-text').click()
      //Check first Item should be 1000 danske digte.
        cy.get('.easyscreen-carousel--wrapper .easyscreen-carousel--slide:nth-of-type(1) .easyscreen-carousel--row:nth-of-type(1) .easyscreen-carousel--item:nth-of-type(1) div:nth-child(3) div:nth-of-type(1)').should($title3 => {
          expect($title3.text()).to.not.eq(txt)
        })
  
    })
  })
 
  it('Check the Youtube.', () => {
    cy.visit('https://dev.stg.easyscreen.io/#id=b67b7c4c96766adc8a53292760a46ca4&fit')
    .wait(3000)
cy.get('.content-switcher--navigation .content-switcher--navigation-element:nth-of-type(2) .content-switcher--navigation-element-image').click()
cy.get('.content-switcher--navigation div:nth-of-type(1) .content-switcher--navigation-element-image').click()
    cy.get(".video-poster--play-button-icon.fal.fa-play-circle").click()
    .wait(3000)
    //Check if youtube video is on the screen.
    cy.iframe("iframe[title='Film for børn på Filmstriben']").find('.html5-main-video.video-stream').should('be.visible').should('have.attr', 'src').should('include', '/www.youtube.com/')

    //Check if progress bar is visible.
    cy.get('.content-switcher--progressbar > .easyscreen-progress-bar--progress').should('be.visible')
      .wait(3000)
  
    //Check if are 2 video.
    cy.get('.content-switcher--navigation').find('.content-switcher--navigation-element').and(($element) => {
      expect($element).to.be.length(2)
    })

    //Check if Title, volume control, back and next buttons are visible on page.
    cy.get('.content-switcher--title').should('be.visible')
      .get('.content-switcher--volume-control.easyscreen-volume-control').should('be.visible')
      .get('.content-switcher--flow-control.fa-step-backward.fal').should('be.visible')
      .get('.content-switcher--flow-control.fa-pause.fal').should('be.visible')
      .get('.content-switcher--flow-control.fa-step-forward.fal').should('be.visible')
  })

})
