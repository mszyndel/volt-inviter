'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

//These are automated tests for the Issue create and Issue Trigger.
//They will run every time the `zapier test` command is executed.
describe('gmail', () => {
  zapier.tools.env.inject();

  it('should forward emails', (done) => {
    const bundle = {
      inputData: {
        fromEmail: 'tech@volteuropa.org',
        toEmail: 'mike.szyndel@volteuropa.org'
      }
    };
    appTester(App.creates.forwardEmails.operation.perform, bundle)
      .then((result) => {
        console.log(result)
        done();
      })
      .catch(done);
  });
});
