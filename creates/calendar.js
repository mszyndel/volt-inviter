const sample = require('../samples/sample_calendar');
const { auth } = require('google-auth-library');

const createCalendarShare = (z, bundle) => {
  const calendarId = 'voxeurope.org_hkjvlffuol5r2cka3gjsok935k@group.calendar.google.com';
  const keys = require('../volt-europa-3433f695a4b8.json');
  const jwtClient = auth.fromJSON(keys);
  jwtClient.scopes = ['https://www.googleapis.com/auth/calendar'];
  jwtClient.subject = 'damian.boeselager@volteuropa.org';

  return jwtClient.authorize().then(function() {
    return new Promise(function(resolve, reject) { 
      jwtClient.request({
        url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/acl`,
        method: 'POST',
        headers: {
          // 'Mime-Type': 'application/json',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          "role": "reader",
          "scope": {
            "type": "user",
            "value": bundle.inputData.email
          }
        })
      }, function(error, response) {
        if(error)
          reject(error.errors[0]);
        else
          resolve(response);
      });
    });
  }).then(function(response) {
    return JSON.stringify(response.data);
  }).catch(function(error) {
    return {
      error: error.message
    };
  });
};

module.exports = {
  key: 'shareCalendar',
  noun: 'Share Calendar',

  display: {
    label: 'Share Google Calendar',
    description: 'Shares a Google Calendar with a user.'
  },

  operation: {
    inputFields: [
      { key: 'email', label:'E-mail', required: true }
    ],
    perform: createCalendarShare,
    sample: sample
  }
};
