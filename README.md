# Sonia il est midi

> *Sonia "il est midi" application for Discord*

__Quality:__  
![GitHub last commit](https://img.shields.io/github/last-commit/sonia-corporation/il-est-midi-discord?style=flat-square)
[![Maintainability](https://api.codeclimate.com/v1/badges/6f8a651120877a0842b3/maintainability?style=flat-square)](https://codeclimate.com/github/Sonia-corporation/il-est-midi-discord/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6f8a651120877a0842b3/test_coverage?style=flat-square)](https://codeclimate.com/github/Sonia-corporation/il-est-midi-discord/test_coverage)
[![codecov](https://codecov.io/gh/Sonia-corporation/il-est-midi-discord/branch/develop/graph/badge.svg)](https://codecov.io/gh/Sonia-corporation/il-est-midi-discord)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat-square&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2FSonia-corporation%2Fil-est-midi-discord%2Fdevelop)](https://dashboard.stryker-mutator.io/reports/github.com/Sonia-corporation/il-est-midi-discord/develop)
![GitHub issues](https://img.shields.io/github/issues-raw/sonia-corporation/il-est-midi-discord?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/sonia-corporation/il-est-midi-discord?style=flat-square)
![Build](https://github.com/Sonia-corporation/il-est-midi-discord/workflows/Build/badge.svg?style=flat-square)
![Release](https://github.com/Sonia-corporation/il-est-midi-discord/workflows/Release/badge.svg?style=flat-square)
![Dependencies](https://img.shields.io/david/sonia-corporation/il-est-midi-discord?style=flat-square)
![Dev Dependencies](https://img.shields.io/david/dev/sonia-corporation/il-est-midi-discord?style=flat-square)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

__Community:__  
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
![Discord](https://img.shields.io/discord/689833865279307782?style=flat-square)

__Statistics:__  
![GitHub release (latest by date)](https://img.shields.io/github/v/release/sonia-corporation/il-est-midi-discord?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/sonia-corporation/il-est-midi-discord?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/sonia-corporation/il-est-midi-discord?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sonia-corporation/il-est-midi-discord?style=flat-square)
![GitHub](https://img.shields.io/github/license/sonia-corporation/il-est-midi-discord?style=flat-square)

## Sonia bot

### Sonia commands

Sonia will treat one command at a time.  
You can use either `-`, `!` or `$` as prefix for the commands.  
There is no case sensitivity.

__Example:__

- `@Sonia-il-est-midi -version`  
- `@Sonia-il-est-midi !VERSION`  
- `@Sonia-il-est-midi $v`  

#### Cookie

__Commands:__

- cookie
- cookies *(alias)*
- c *(shortcut)*

Sonia will send you a message containing:

- A cookie (a tasty one).

__Example:__

- `@Sonia-il-est-midi !cookie`
- `@Sonia-il-est-midi !C`

#### Error

__Commands:__

- error
- bug *(alias)*

Sonia will send you a message containing:

- A description of the error.
- Some nasty bullshit text.
- This is a useless feature, please, continue.
- We are very sorry about that. We think.

__Example:__

- `@Sonia-il-est-midi !error`
- `@Sonia-il-est-midi !BUG`

#### Help

__Commands:__

- help
- h *(shortcut)*

Sonia will send you a message containing:

- A list of all the commands available.
- The application [readme](README.md) link.

__Example:__

- `@Sonia-il-est-midi !help`
- `@Sonia-il-est-midi !H`

#### Lunch

__Commands:__

- lunch
- l *(shortcut)*

Sonia will send you a message containing:

- A reminder that this is lunch-time for you.

__Example:__

- `@Sonia-il-est-midi !lunch`
- `@Sonia-il-est-midi !L`

#### Release notes

__Commands:__

- release-notes
- r *(shortcut)*

Sonia will send you a message containing:

- The application version (as a link).
- The application release date.
- The application release notes.
- The application [changelog](CHANGELOG.md) link.
- The total release count.

__Example:__

- `@Sonia-il-est-midi !release-notes`
- `@Sonia-il-est-midi !r`

#### Version

__Commands:__

- version
- v *(shortcut)*

Sonia will send you a message containing:

- The application version (as a link).
- The application release date.
- The application initialization date.
- The application release notes (first 800 chars).
- The application [changelog](CHANGELOG.md) link.
- The application status.
- Her emotional state.
- The total release count.

__Example:__

- `@Sonia-il-est-midi !version`
- `@Sonia-il-est-midi !VERSION`
- `@Sonia-il-est-midi !v`
- `@Sonia-il-est-midi !V`

### Sonia behavior

Sonia will never respond to herself - no infinite loop :(  
Sonia will never respond to another bot - love between them will not be tolerated.  
Sonia has nothing to hide and thus she displays her current activity.

#### In a private channel (also known as DM)

Sonia will respond to each of your messages.  
Special commands will be handled as a priority.  

When your message is very basic, Sonia will tell you that it is noon, as usual (even if it is untrue).  

#### In a public text channel (also known as text)

For now, Sonia cannot be configured over which channel she responds to.  
In the future, Sonia will be disabled by default on all channels.  
A command will enable Sonia on the given channel (a command will also be available to disable her).  
This dev is a bit more complicated because Sonia will have to store which channels are ready for her or not in a database.

To avoid flooding, Sonia will tell you that it is noon in some conditions.  
First of all, she will tell the `general` channel that it is noon when it is noon.  
That is the main goal after all...  
The default timezone is Europe/Paris.  
In the future, when enabling this feature on a given channel, you will be able to customize the timezone used.

When a message on the channel is sent, Sonia will only respond if she is mentioned personally.  
This counts as a DM response for Sonia, so prepare to have a friendly message dedicated to you.  
Special commands will be handled as a priority.  

__Example:__  

`@Sonia-il-est-midi yo`

On global mentions like `@here` and `@everyone`, Sonia will send a message to tell everybody it is noon (even if it is a lie).

To use a command, you must ask her personally.

__Example:__

`@Sonia-il-est-midi !version`

__Guild new member welcome message:__

When a newcomer joins the channel, Sonia will send a friendly message to welcome them.  
For now, the only channel receiving welcome messages will be the `general`.  
It will also work if accents are used such as `général`.  

__Sonia new guild message:__

When Sonia joins a new guild, she will send a cookie to the `general` channel.

### Errors

If Sonia receives a Discord error after sending a message she will send a new message containing this error to help you to debug it.  

Nevertheless, sometimes the error is purely developmental and this is why Sonia will provide:
- A link to create a new [GitHub issue](https://github.com/Sonia-corporation/il-est-midi-discord/issues/new?assignees=&labels=bug&template=bug_report.md&title=&projects=sonia-corporation/il-est-midi-discord/1).
- A link to reach us in [Discord](https://discord.gg/PW4JSkv).

Sonia sends the generic Discord errors to the [Sonia Discord errors channel](http://discordapp.com/channels/689833865279307782/700770389655158924).

### Warnings

Sonia sends the generic Discord warnings to the [Sonia Discord warnings channel](http://discordapp.com/channels/689833865279307782/701041732086792202).

## Contributing

Check out the [contributing](CONTRIBUTING.md) file before helping us.

## License

This project is licensed under the MIT License - see the [license](LICENSE.md) for details.

## Contributors 

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.geoffreytestelin.com/"><img src="https://avatars2.githubusercontent.com/u/10194542?s=460&v=4" width="80px;" alt=""/><br /><sub><b>Geoffrey 'C0ZEN' Testelin</b></sub></a><br /><a href="https://github.com/Sonia-corporation/il-est-midi-discord/commits?author=C0ZEN" title="Code">💻</a> <a href="#design-C0ZEN" title="Design">🎨</a> <a href="#infra-C0ZEN" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-C0ZEN" title="Ideas, Planning, & Feedback">🤔</a> <a href="#blog-C0ZEN" title="Blogposts">📝</a> <a href="https://github.com/Sonia-corporation/il-est-midi-discord/commits?author=C0ZEN" title="Documentation">📖</a> <a href="#tool-C0ZEN" title="Tools">🔧</a> <a href="#security-C0ZEN" title="Security">🛡️</a> <a href="https://github.com/Sonia-corporation/il-est-midi-discord/pulls?q=is%3Apr+reviewed-by%3AC0ZEN" title="Reviewed Pull Requests">👀</a> <a href="#question-C0ZEN" title="Answering Questions">💬</a> <a href="#maintenance-C0ZEN" title="Maintenance">🚧</a> <a href="https://github.com/Sonia-corporation/il-est-midi-discord/issues?q=author%3AC0ZEN" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://allcontributors.org"><img src="https://avatars1.githubusercontent.com/u/46410174?v=4" width="80px;" alt=""/><br /><sub><b>All Contributors</b></sub></a><br /><a href="https://github.com/Sonia-corporation/il-est-midi-discord/commits?author=all-contributors" title="Documentation">📖</a> <a href="#tool-all-contributors" title="Tools">🔧</a></td>
    <td align="center"><a href="https://renovate.whitesourcesoftware.com"><img src="https://avatars0.githubusercontent.com/u/25180681?v=4" width="80px;" alt=""/><br /><sub><b>WhiteSource Renovate</b></sub></a><br /><a href="#tool-renovate-bot" title="Tools">🔧</a> <a href="#security-renovate-bot" title="Security">🛡️</a></td>
    <td align="center"><a href="http://semantic-release.org/"><img src="https://avatars1.githubusercontent.com/u/32174276?v=4" width="80px;" alt=""/><br /><sub><b>Semantic Release Bot</b></sub></a><br /><a href="https://github.com/Sonia-corporation/il-est-midi-discord/commits?author=semantic-release-bot" title="Documentation">📖</a> <a href="#tool-semantic-release-bot" title="Tools">🔧</a> <a href="#security-semantic-release-bot" title="Security">🛡️</a></td>
    <td align="center"><a href="https://github.com/vvalembois"><img src="https://avatars3.githubusercontent.com/u/34096840?v=4" width="80px;" alt=""/><br /><sub><b>Vilteros</b></sub></a><br /><a href="https://github.com/Sonia-corporation/il-est-midi-discord/commits?author=vvalembois" title="Code">💻</a> <a href="#ideas-vvalembois" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Sonia-corporation/il-est-midi-discord/commits?author=vvalembois" title="Documentation">📖</a> <a href="https://github.com/Sonia-corporation/il-est-midi-discord/pulls?q=is%3Apr+reviewed-by%3Avvalembois" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/Zoridg"><img src="https://avatars0.githubusercontent.com/u/32258487?v=4" width="80px;" alt=""/><br /><sub><b>Nathan Bergamini</b></sub></a><br /><a href="https://github.com/Sonia-corporation/il-est-midi-discord/commits?author=Zoridg" title="Code">💻</a> <a href="#ideas-Zoridg" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.  
Contributions of any kind are welcome!

