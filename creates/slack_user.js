const sample = require('../samples/sample_user');
const slackTeam = "volteuropa";
const token = 'xoxp-1234';
const url = 'https://'+ slackTeam + '.slack.com/api/users.admin.invite';

const createSlackUser = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: `https://${slackTeam}.slack.com/api/users.admin.invite`,
    body: `token=${token}&email=${bundle.inputData.email}&first_name=${bundle.inputData.first_name}&last_name=${bundle.inputData.last_name}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'slackUser',
  noun: 'Slack User',

  display: {
    label: 'Create Slack User',
    description: 'Creates a Slack user.'
  },

  operation: {
    inputFields: [
      { key: 'email', label:'E-mail', required: true },
      { key: 'first_name', label:'First name', required: true },
      { key: 'last_name', label:'Last name', required: true }
    ],
    perform: createSlackUser,
    sample: sample
  }
};

