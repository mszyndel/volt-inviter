const sample = require('../samples/sample_calendar');
const { auth } = require('google-auth-library');

const createGmailForward = (z, bundle) => {
  const keys = require('../volt-europa-3433f695a4b8.json');
  const jwtClient = auth.fromJSON(keys);
  jwtClient.scopes = ['https://www.googleapis.com/auth/gmail.settings.sharing'];
  jwtClient.subject = bundle.inputData.fromEmail;

  return jwtClient.authorize().then(function() {
    return new Promise(function(resolve, reject) {
      jwtClient.request({
        url: `https://www.googleapis.com/gmail/v1/users/me/settings/forwardingAddresses`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          "forwardingEmail": bundle.inputData.toEmail
        })
      }, function(error, response) {
        if(error) {
          reject(error.errors[0]);
        } else {
          resolve(response);
        }
      });
    });
  }).then(function(response) {
    return new Promise(function(resolve, reject) {
      jwtClient.request({
        url: `https://www.googleapis.com/gmail/v1/users/me/settings/autoForwarding`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          "enabled": true,
          "emailAddress": bundle.inputData.toEmail,
          "disposition": 'leaveInInbox'
        })
      }, function(error, response) {
        if(error) {
          reject(error.errors[0]);
        } else {
          resolve(response);
        }
      });
    });
  }).then(function(response) {
    return { "ok": true };
  }).catch(function(error) {
    return {
      error: error.message
    };
  });
};

module.exports = {
  key: 'forwardEmails',
  noun: 'Forward Emails',

  display: {
    label: 'Forward Emails in Gmail',
    description: 'Forwards email in Gmail from and to an account.'
  },

  operation: {
    inputFields: [
      { key: 'fromEmail', label:'Forward from e-mail', required: true },
      { key: 'toEmail', label:'Forward to e-mail', required: true }
    ],
    perform: createGmailForward,
    sample: sample
  }
};
