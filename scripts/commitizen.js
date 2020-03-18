module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     A new feature'
    },
    {
      value: 'fix',
      name: 'fix:      A bug fix'
    },
    {
      value: 'style',
      name: 'style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance'
    },
    {
      value: 'test',
      name: 'test:     Adding missing tests or correcting existing tests'
    },
    {
      value: 'build',
      name: 'build:    Changes that affect the build system, CI configuration or external dependencies'
    },
    {
      value: 'chore',
      name: 'chore:    Anything else'
    }
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,

  messages: {
    type: 'Select the type of change that you are committing:',
    scope: '\nSCOPE of this change (optional):',
    customScope: 'SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense subject of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above ?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: [
    'feat',
    'fix',
    'build'
  ],

  skipQuestions: [
    'footer'
  ],

  subjectLimit: 100
};
