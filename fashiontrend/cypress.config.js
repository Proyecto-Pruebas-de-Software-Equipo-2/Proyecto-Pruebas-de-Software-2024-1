const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'u5g9zh',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/*.cy.{js,jsx,ts,tsx}', // Update this path if your tests are located differently
    video: true,
  },
  
});
