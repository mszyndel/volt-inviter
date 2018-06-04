const sample = require('../samples/sample_user');
const { auth } = require('google-auth-library');
const generatePassword = require('password-generator');

const createUser = (z, bundle) => {
  const keys = require('../volt-europa-3433f695a4b8.json');
  const jwtClient = auth.fromJSON(keys);
  jwtClient.scopes = ['https://www.googleapis.com/auth/admin.directory.user'];
  jwtClient.subject = 'mike.szyndel@volteuropa.org';
  const newPassword = generatePassword(12, false, /\d/, 'europa-');

  return jwtClient.authorize().then(function() {
    return new Promise(function(resolve, reject) {
      // var guessedEmail = `${bundle.inputData.first_name} ${bundle.inputData.last_name}`;
      // guessedEmail = limax(guessesEmail, {
      //   replacement: '.',
      //   separateNumbers: false,
      //   maintainCase: false
      // });
      jwtClient.request({
        url: 'https://www.googleapis.com/admin/directory/v1/users',
        method: 'POST',
        headers: {
          // 'Mime-Type': 'application/json',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          name: {
            givenName: bundle.inputData.first_name,
            familyName: bundle.inputData.last_name,
          },
          password: newPassword,
          changePasswordAtNextLogin: bundle.inputData.tempPassword,
          primaryEmail: bundle.inputData.email.toString().trim()
        })
      }, function(error, response) {
        if(error)
          reject(error.errors[0]);
        else
          resolve(response);
      });
    });
  }).then(function(response) {
    return {
      email: response.data.primaryEmail,
      password: newPassword
    };
  }).catch(function(error) {
    return {
      error: error.message
    };
  });
};

module.exports = {
  key: 'user',
  noun: 'User',

  display: {
    label: 'Create User',
    description: 'Creates a user.'
  },

  operation: {
    inputFields: [
      { key: 'first_name', label:'First name', required: true },
      { key: 'last_name', label:'Last name', required: true },
      { key: 'email', label:'E-mail', required: true },
      { key: 'tempPassword', label: 'Require new password', type: 'boolean', required: false, default: 'true'}
    ],
    perform: createUser,
    sample: sample
  }
};
