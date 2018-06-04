'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

//These are automated tests for the Issue create and Issue Trigger.
//They will run every time the `zapier test` command is executed.
describe('calendar', () => {
  zapier.tools.env.inject();

  it('should invite a user', (done) => {
    const bundle = {
      inputData: {
        email: 'mike.szyndel@volteuropa.org'
      }
    };
    appTester(App.creates.shareCalendar.operation.perform, bundle)
      .then((result) => {
        console.log(result)
        done();
      })
      .catch(done);
  });
});
