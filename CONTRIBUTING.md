# Contributing

## First step

### Create the secret environment file

This step is mandatory.  
You must create the `secret-environment.json` file in the [environment folder](./src/environment/secret-environment.json).  

This file should contains at least:
- A discord Sonia secret token required by Discord API
- A GitHub personal access token required by GitHub API

__Shortcut:__

You can use an npm script to create the file for you.  
Run `npm run create-secret-environment`.

```json
{
  "discord": {
    "sonia": {
      "secretToken": "REQUIRED_AND_TO_DEFINE_BY_ASKING_IT"
    } 
  },
  "github": {
    "personalAccessToken": "REQUIRED_AND_TO_DEFINE_BY_YOU"
  },
  "profile": {
    "nickname": "OPTIONNAL_AND_TO_DEFINE_BY_YOU"
  }
}
```

__Note for the Discord Sonia secret token:__

The Discord Sonia secret token is private and there two ways to have access to it:
- Asks an admin (like [C0ZEN](https://github.com/C0ZEN))
- Access to the [Discord bot page](https://discordapp.com/developers/applications/689829775317139460/bot) to reveal the token

If somehow this token is made public, Discord will revoke it.

__Note for the GitHub personal access token:__

The GitHub personal access token is strictly personal to each developer.  
You have to create your own on your GitHub account.  
It should contains the following scopes:
- user
- public_repo
- repo
- repo_deployment
- repo:status
- read:repo_hook
- read:org
- read:public_key
- read:gpg_key

__Note for the Nickname:__
This file can contain optionals fields:
- nickname: can be display on each developer server messages

### Install the dependencies

Run `npm i` to install the dependencies.  
Run `npm run start` to start the local development server.

## Package scripts

- `npm run start`: run the Node.js app for the local development  
- `npm run start:prod`: build and run the Node.js app like it will be once deployed in the server for local development or server debugging  
- `npm run build`: create a Node.js app in the dist folder  
- `npm run build:environment:copy`: copy the secret environment file inside the dist folder  
- `npm run build:environment:create`: create the environment file inside the dist folder with some default values used for the CI 
- `npm run build:environment:rewrite-path`: rename the environment file path of the Node.js app inside the dist folder  
- `npm run build:update-app-initialization-date`: update the app initialization date inside the environment file from the dist folder  
- `npm run run:prod`: run the Node.js app like it will be once deployed in the server for local development or server debugging  
- `npm run tsc`: compile the TypeScript app to Node.js app  
- `npm run test`: run the tests once  
- `npm run test:watch`: run the tests and watch them  
- `npm run test:majestic`: run the tests in the browser (beautiful UI)
- `npm run test:ci`: run the tests once and stop asap on error 
- `npm run test:ci:coverage`: run the tests once with code coverage and stop asap on error 
- `npm run test:mutant`: run the mutation testing once
- `npm run test:mutant:ci`: run the mutation testing once and update Stryker dashboard
- `npm run lint`: run the linter and fix the errors  
- `npm run lint:ci`: run the linter  
- `npm run cz`: run a CLI to easily push and commit by following the commit convention of this project  
- `npm run semver`: create a new version, a new tag and update the [CHANGELOG](CHANGELOG.md) file  
- `npm run clean:dist`: remove the dist folder  
- `npm run commit`: create a commit by using the cz
- `npm run create-secret-environment`: create the secret-environment.json file

## Git

### Alias

This project use an alias to push automatically with the upstream option set.  
The configuration of the alias is a [local one](.gitconfig).  

This alias is used by the `cz` script to automatically push on the remote with a dynamic branch name.  

__Troubleshooting:__

If the command `push-upstream` does not exists, you can link it to your git:  
Run `git config --local include.path ../.gitconfig`.

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  
This leads to **more readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.  
The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>       
<BLANK LINE> 
<footer>     
```

The **type** and the **subject** is mandatory and the other stuff is optional.

Any line of the commit message cannot be longer 144 characters!  
This allows the message to be easier to read on GitHub as well as in various git tools.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of
the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is
the SHA of the commit being reverted.

### Type

Must be one of the following:

* **feat**    : A new feature
* **fix**     : A bug fix
* **style**   : Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**    : A code change that improves performance
* **test**    : Adding missing tests or correcting existing tests
* **build**   : Changes that affect the build system, CI configuration or external dependencies
* **chore**   : Anything else

### Scope

The scope could be anything specifying place of the commit change.  
For example `datepicker`, `dialog`, `app`, etc.

### Subject

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".  
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.  
The rest of the commit message is then used for this.
