# Sonia Discord

> _The Sonia application for Discord_

**Quality:**  
![GitHub last commit](https://img.shields.io/github/last-commit/sonia-corporation/sonia-discord?style=flat-square)
[![Maintainability](https://api.codeclimate.com/v1/badges/a15731adba332ed97275/maintainability?style=flat-square)](https://codeclimate.com/github/Sonia-corporation/sonia-discord/maintainability)
[![CodeFactor](https://www.codefactor.io/repository/github/sonia-corporation/sonia-discord/badge)](https://www.codefactor.io/repository/github/sonia-corporation/sonia-discord)
[![DeepScan grade](https://deepscan.io/api/teams/10568/projects/13410/branches/225363/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10568&pid=13410&bid=225363)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a15731adba332ed97275/test_coverage?style=flat-square)](https://codeclimate.com/github/Sonia-corporation/sonia-discord/test_coverage)
[![codecov](https://codecov.io/gh/Sonia-corporation/sonia-discord/branch/develop/graph/badge.svg?token=S4MUQF1TIY)](https://codecov.io/gh/Sonia-corporation/sonia-discord)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat-square&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2FSonia-corporation%2Fsonia-discord%2Fdevelop)](https://dashboard.stryker-mutator.io/reports/github.com/Sonia-corporation/sonia-discord/develop)
![GitHub issues](https://img.shields.io/github/issues-raw/sonia-corporation/sonia-discord?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/sonia-corporation/sonia-discord?style=flat-square)
![Build](https://github.com/Sonia-corporation/sonia-discord/workflows/Build/badge.svg?style=flat-square)
![Release](https://github.com/Sonia-corporation/sonia-discord/workflows/Release/badge.svg?style=flat-square)
![Dependencies](https://img.shields.io/david/sonia-corporation/sonia-discord?style=flat-square)
![Dev Dependencies](https://img.shields.io/david/dev/sonia-corporation/sonia-discord?style=flat-square)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**Community:**

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
![Discord](https://img.shields.io/discord/689833865279307782?style=flat-square)

**Statistics:**  
![GitHub release (latest by date)](https://img.shields.io/github/v/release/sonia-corporation/sonia-discord?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/sonia-corporation/sonia-discord?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/sonia-corporation/sonia-discord?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sonia-corporation/sonia-discord?style=flat-square)
![GitHub](https://img.shields.io/github/license/sonia-corporation/sonia-discord?style=flat-square)
[![](https://tokei.rs/b1/github/sonia-corporation/sonia-discord?category=files&style=flat-square)](https://github.com/sonia-corporation/sonia-discord)
[![](https://tokei.rs/b1/github/sonia-corporation/sonia-discord?category=lines&style=flat-square)](https://github.com/sonia-corporation/sonia-discord)
[![](https://tokei.rs/b1/github/sonia-corporation/sonia-discord?category=code&style=flat-square)](https://github.com/sonia-corporation/sonia-discord)
[![](https://tokei.rs/b1/github/sonia-corporation/sonia-discord?category=comments&style=flat-square)](https://github.com/sonia-corporation/sonia-discord)
[![](https://tokei.rs/b1/github/sonia-corporation/sonia-discord?category=blanks&style=flat-square)](https://github.com/sonia-corporation/sonia-discord)

## Sonia bot

[Add Sonia to my guild](https://discord.com/oauth2/authorize?client_id=689829775317139460&scope=bot&permissions=150592).

### Sonia commands

Sonia will treat one command at a time.  
You can use either `-`, `!` or `$` as prefix for the commands.  
There is no case sensitivity.

**Example:**

- `@Sonia -version`
- `@Sonia !VERSION`
- `@Sonia $v`

#### Cookie

**Commands:**

- cookie
- cookies _(alias)_
- c _(shortcut)_

Sonia will send you a message containing:

- A cookie (a tasty one).

**Example:**

- `@Sonia !cookie`
- `@Sonia !C`

#### Error

**Commands:**

- error
- bug _(alias)_

Sonia will send you a message containing:

- A description of the error.
- Some nasty bullshit text.
- This is a useless feature, please, continue.
- We are very sorry about that. We think.

**Example:**

- `@Sonia !error`
- `@Sonia !BUG`

#### Feature

**Commands:**

- feature
- f _(shortcut)_

**Features (first and only argument followed by optional flags):**

This is a special command used to configure Sonia only for the current Guild or channel.  
There are multiples option to customize Sonia (some will change her behaviour on the whole Guild and other only for the current channel).

Sonia will send you a message containing information about the changes you just made.  
Basically she will try to help you if you fill bad information and just inform you if the changes were successful.

1. noon

Configure the message sent at noon on the given channel.  
The default timezone is Europe/Paris and this will be configurable later.

- disabled (or d): disable the noon message on the channel
- enabled (or e): enable the noon message on the channel
- help (or h): get some help with this command
- humanize (or hu): display the current configuration
- status (or s): display if the feature is enabled or not

2. release-notes

Configure the message containing the new release notes on the given channel.

- disabled (or d): disable the release notes message on the channel
- enabled (or e): enable the release notes message on the channel
- help (or h): get some help with this command
- humanize (or hu): display the current configuration
- status (or s): display if the feature is enabled or not

**Example:**

- `@Sonia !feature noon`
- `@Sonia !F`

#### Help

**Commands:**

- help
- h _(shortcut)_

Sonia will send you a message containing:

- A list of all the commands available.
- The application [readme](README.md) link.

**Example:**

- `@Sonia !help`
- `@Sonia !H`

#### Lunch

**Commands:**

- lunch
- l _(shortcut)_

Sonia will send you a message containing:

- A reminder that this is lunch-time for you.

**Example:**

- `@Sonia !lunch`
- `@Sonia !L`

#### Quote

**Commands:**

- quote
- q _(shortcut)_

Sonia will send you a message containing:

- A random quote

**Example:**

- `@Sonia !quote`
- `@Sonia !q`

#### Release notes

**Commands:**

- release-notes
- r _(shortcut)_

Sonia will send you a message containing:

- The application version (as a link).
- The application release date.
- The application release notes.
- The application [changelog](CHANGELOG.md) link.
- The total release count.

**Example:**

- `@Sonia !release-notes`
- `@Sonia !r`

#### Version

**Commands:**

- version
- v _(shortcut)_

Sonia will send you a message containing:

- The application version (as a link).
- The application release date.
- The application initialization date.
- The application release notes (first 800 chars).
- The application [changelog](CHANGELOG.md) link.
- The application status.
- Her emotional state.
- The total release count.

**Example:**

- `@Sonia !version`
- `@Sonia !VERSION`
- `@Sonia !v`
- `@Sonia !V`

### Sonia behaviour

Sonia will never respond to herself - no infinite loop :(  
Sonia will never respond to another bot - love between them will not be tolerated.  
Sonia has nothing to hide and thus she displays her current activity.

#### In a private channel (also known as DM)

Sonia will respond to each of your messages but within a predefined priority:

- commands (handle the commands if you follow the right syntax)
- ping (respond pong)
- hotel (respond trivago)
- any question? (respond a pizza lover joke)
- default message (when your message is very basic, Sonia will tell you that it is noon, as usual (even if it is untrue))

#### In a public text channel (also known as text)

For now, Sonia cannot be configured over which channel she responds to.  
In the future, Sonia will be disabled by default on all channels.  
A command will enable Sonia on the given channel (a command will also be available to disable her).  
This dev is a bit more complicated because Sonia will have to store which channels are ready for her or not in a database.

When a message on the channel is sent, Sonia will only respond if she is mentioned personally.  
This counts as a DM response for Sonia, so prepare to have a friendly message dedicated to you.

Sonia will respond to each of your messages but within a predefined priority:

- commands (handle the commands if you follow the right syntax)
- ping (respond pong)
- hotel (respond trivago)
- any question? (respond a pizza lover joke)
- simple (respond basic)
- basic (respond simple)
- default message (when your message is very basic, Sonia will tell you that it is noon, as usual (even if it is untrue))

**Example:**

`@Sonia yo`

On global mentions like `@here` and `@everyone`, Sonia will send a message to tell everybody it is noon (even if it is a lie).

To use a command, you must ask her personally.

**Example:**

`@Sonia !version`

**Guild new member welcome message:**

When a newcomer joins the channel, Sonia will send a friendly message to welcome them.  
For now, the only channel receiving welcome messages will be the `general`.  
It will also work if accents are used such as `général`.

**Sonia new guild message:**

When Sonia joins a new guild, she will send a cookie to the `general` channel.

**New guild member:**

When a new member joins your guild, she will send a message on the `general` channel to welcome him.

**New release notes:**

When a new version of Sonia is available, she will send a message on the `general` channel containing basically the `release-notes` command.

**_Note:_**

Works with Firebase. See the [Firebase section](#firebase) to learn more about it.

### Errors

If Sonia receives a Discord error after sending a message she will send a new message containing this error to help you to debug it.

Nevertheless, sometimes the error is purely developmental and this is why Sonia will provide:

- A link to create a new [GitHub issue](https://github.com/Sonia-corporation/sonia-discord/issues/new?assignees=&labels=bug&template=bug_report.md&title=&projects=sonia-corporation/sonia-discord/1).
- A link to reach us in [Discord](https://discord.gg/PW4JSkv).

Sonia sends the generic Discord errors to the [Sonia Discord errors channel](http://discordapp.com/channels/689833865279307782/700770389655158924).

### Warnings

Sonia sends the generic Discord warnings to the [Sonia Discord warnings channel](http://discordapp.com/channels/689833865279307782/701041732086792202).

### Firebase

Because Sonia is more and more enhanced as the time fly and that each guild wants to configure Sonia differently a storage solution was required.  
Firebase was used to have a dedicated storage and allow basically to do whatever we want.

#### Guilds

Each guild has its own configuration through Firebase based on the guild's Snowflake.  
Basically, any option edited via Sonia's commands is stored per guild on a Firestore.  
The guilds have a version to easily maintain and handle the breaking changes during the new releases.  
The breaking changes are handled at the start of the application and no other operation related to Firebase guilds are allowed during that time.  
Once the breaking changes are handled the Firestore is watched and any changes that occurred trigger a DML with an Elf store.  
This is a very efficient way to handle the data and avoid performance issues related to Network.

Once the store loading is done - where the first Firebase guilds were received -, Sonia will try to send the release notes on each guild.

## Contributing

Check out the [contributing](CONTRIBUTING.md) file before helping us.

## License

This project is licensed under the MIT License - see the [license](LICENSE) for details.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://allcontributors.org"><img src="https://avatars1.githubusercontent.com/u/46410174?v=4?s=80" width="80px;" alt=""/><br /><sub><b>All Contributors</b></sub></a><br /><a href="https://github.com/Sonia-corporation/sonia-discord/commits?author=all-contributors" title="Documentation">📖</a> <a href="#tool-all-contributors" title="Tools">🔧</a></td>
    <td align="center"><a href="https://www.codefactor.io"><img src="https://avatars0.githubusercontent.com/u/13309880?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Automated code reviews</b></sub></a><br /><a href="https://github.com/Sonia-corporation/sonia-discord/pulls?q=is%3Apr+reviewed-by%3Acode-factor" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Sonia-corporation/sonia-discord/issues?q=author%3Acode-factor" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.geoffreytestelin.com/"><img src="https://avatars2.githubusercontent.com/u/10194542?s=460&v=4?s=80" width="80px;" alt=""/><br /><sub><b>Geoffrey 'C0ZEN' Testelin</b></sub></a><br /><a href="https://github.com/Sonia-corporation/sonia-discord/commits?author=C0ZEN" title="Code">💻</a> <a href="#design-C0ZEN" title="Design">🎨</a> <a href="#infra-C0ZEN" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-C0ZEN" title="Ideas, Planning, & Feedback">🤔</a> <a href="#blog-C0ZEN" title="Blogposts">📝</a> <a href="https://github.com/Sonia-corporation/sonia-discord/commits?author=C0ZEN" title="Documentation">📖</a> <a href="#tool-C0ZEN" title="Tools">🔧</a> <a href="#security-C0ZEN" title="Security">🛡️</a> <a href="https://github.com/Sonia-corporation/sonia-discord/pulls?q=is%3Apr+reviewed-by%3AC0ZEN" title="Reviewed Pull Requests">👀</a> <a href="#question-C0ZEN" title="Answering Questions">💬</a> <a href="#maintenance-C0ZEN" title="Maintenance">🚧</a> <a href="https://github.com/Sonia-corporation/sonia-discord/issues?q=author%3AC0ZEN" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Zoridg"><img src="https://avatars0.githubusercontent.com/u/32258487?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Nathan Bergamini</b></sub></a><br /><a href="https://github.com/Sonia-corporation/sonia-discord/commits?author=Zoridg" title="Code">💻</a> <a href="#ideas-Zoridg" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://semantic-release.org/"><img src="https://avatars1.githubusercontent.com/u/32174276?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Semantic Release Bot</b></sub></a><br /><a href="https://github.com/Sonia-corporation/sonia-discord/commits?author=semantic-release-bot" title="Documentation">📖</a> <a href="#tool-semantic-release-bot" title="Tools">🔧</a> <a href="#security-semantic-release-bot" title="Security">🛡️</a></td>
    <td align="center"><a href="https://github.com/vvalembois"><img src="https://avatars3.githubusercontent.com/u/34096840?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Vilteros</b></sub></a><br /><a href="https://github.com/Sonia-corporation/sonia-discord/commits?author=vvalembois" title="Code">💻</a> <a href="#ideas-vvalembois" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Sonia-corporation/sonia-discord/commits?author=vvalembois" title="Documentation">📖</a> <a href="https://github.com/Sonia-corporation/sonia-discord/pulls?q=is%3Apr+reviewed-by%3Avvalembois" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://renovate.whitesourcesoftware.com"><img src="https://avatars0.githubusercontent.com/u/25180681?v=4?s=80" width="80px;" alt=""/><br /><sub><b>WhiteSource Renovate</b></sub></a><br /><a href="#tool-renovate-bot" title="Tools">🔧</a> <a href="#security-renovate-bot" title="Security">🛡️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/asmodee-bellanie"><img src="https://avatars0.githubusercontent.com/u/69478591?v=4?s=80" width="80px;" alt=""/><br /><sub><b>asmodee-bellanie</b></sub></a><br /><a href="https://github.com/Sonia-corporation/sonia-discord/pulls?q=is%3Apr+reviewed-by%3Aasmodee-bellanie" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.  
Contributions of any kind are welcome!
