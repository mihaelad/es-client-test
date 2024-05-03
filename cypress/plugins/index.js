/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
//import htmlvalidate from "cypress-html-validate/plugin";

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    console.log(launchOptions.args); // print all current args
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      console.log('!!!',launchOptions);
    // launchOptions.args.push('--disable-features=SameSiteByDefaultCookies')
      // whatever you return here becomes the launchOptions
  return launchOptions
    }
  })

   // Register the 'task' command
   on('task', {
    // Define your task handler function
    log(message) {
      // Log the message
      console.log(message);
      // Return null to indicate success
      return null;
    }
  });
}

require('@applitools/eyes-cypress')(module);
