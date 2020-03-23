# Sonia il est midi

> *Sonia "il est midi" application for Discord*

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Netlify Status](https://api.netlify.com/api/v1/badges/474fece6-33b0-4472-8c2f-25cbb4493ecb/deploy-status)](https://app.netlify.com/sites/dark-heresy/deploys)
![Build](https://github.com/Sonia-corporation/il-est-midi-discord/workflows/Build/badge.svg?branch=master&style=flat-square)
![Release](https://github.com/Sonia-corporation/il-est-midi-discord/workflows/Release/badge.svg?branch=master&style=flat-square)

## Sonia bot

### Sonia commands

Sonia will treat one command at a time.  
You can either use `--` or `!` as prefix for the commands.

__Example:__

`@Sonia-il-est-midi !version`  
`@Sonia-il-est-midi --version`  

#### Version

Sonia will send you a message containing:

- The application version (as a link)
- The application release date
- The application release notes (as a link)
- The application status
- Her mental state

__Example:__

`@Sonia-il-est-midi !version`

### Sonia behavior

Sonia will never responds to herself - no infinite loop :(  
Sonia will never responds to another bot - love between them will not be tolerated.

#### In a private channel (also known as DM)

Sonia will respond to each of your messages.  
Special commands will be handled on the first hand.  

When your message is very simple, Sonia will tell you that it is noon, as usual (even if it is a lie).  
The message could be variable though.

#### In a public text channel (also known as text)

For now, Sonia will not be configurable over which channel she responds to.  
In the future, Sonia should be disabled by default on all channels.  
A command will enable Sonia on the given channel (a command will be also available to disable her).  
This dev is a bit more complicated because Sonia will have to store in a database which channels are ready for her or not.

To avoid flood, Sonia will tell you that it is noon on some conditions.  
First of all, she will tell the channel that it is noon when it is noon.  
That is the main goal after all...

When a message on the channel is sent, Sonia will responds only if she is mentioned personally.  
This count as a DM response for Sonia, so prepare to have a friendly message dedicated to you.  
Special commands will be handled on the first hand.  

When a newcomer joins the channel, Sonia will send a friendly message to welcome him.  
For now, the only channel receiving welcome messages will be the `general`.  
It will also works if there is some accents like `général`.  

__Example:__  

`@Sonia-il-est-midi yo`

On global mentions like `@here` and `@everyone`, Sonia will sends a message to tell everybody it is noon (even if it is a lie).

To use a command, you must ask her personally.

__Example:__

`@Sonia-il-est-midi !version`

## Contributing

Check out the [Contributing](CONTRIBUTING.md) file before helping us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contributors 

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.geoffreytestelin.com/"><img src="https://avatars2.githubusercontent.com/u/10194542?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Testelin Geoffrey</b></sub></a><br /><a href="https://github.com/Sonia-corporation/il-est-midi-discord/commits?author=C0ZEN" title="Code">💻</a> <a href="#design-C0ZEN" title="Design">🎨</a> <a href="#infra-C0ZEN" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-C0ZEN" title="Ideas, Planning, & Feedback">🤔</a> <a href="#blog-C0ZEN" title="Blogposts">📝</a> <a href="https://github.com/Sonia-corporation/il-est-midi-discord/commits?author=C0ZEN" title="Documentation">📖</a> <a href="#tool-C0ZEN" title="Tools">🔧</a> <a href="#security-C0ZEN" title="Security">🛡️</a> <a href="https://github.com/Sonia-corporation/il-est-midi-discord/pulls?q=is%3Apr+reviewed-by%3AC0ZEN" title="Reviewed Pull Requests">👀</a> <a href="#question-C0ZEN" title="Answering Questions">💬</a> <a href="#maintenance-C0ZEN" title="Maintenance">🚧</a> <a href="https://github.com/Sonia-corporation/il-est-midi-discord/issues?q=author%3AC0ZEN" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://semantic-release.org/"><img src="https://avatars1.githubusercontent.com/u/32174276?v=4" width="100px;" alt=""/><br /><sub><b>Semantic Release Bot</b></sub></a><br /><a href="https://github.com/Sonia-corporation/il-est-midi-discord/commits?author=semantic-release-bot" title="Documentation">📖</a> <a href="#tool-semantic-release-bot" title="Tools">🔧</a> <a href="#security-semantic-release-bot" title="Security">🛡️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

