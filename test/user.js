'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

//These are automated tests for the Issue create and Issue Trigger.
//They will run every time the `zapier test` command is executed.
describe('user', () => {
  zapier.tools.env.inject();

  it('should create a user', (done) => {
    const bundle = {
      inputData: {
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@volteuropa.org'
      }
    };
    appTester(App.creates.user.operation.perform, bundle)
      .then((result) => {
        console.log(result)
        done();
      })
      .catch(done);
  });
});
