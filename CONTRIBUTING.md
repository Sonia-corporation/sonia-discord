# Contributing

## First step

### Install the dependencies

Run `npm i` to install the dependencies.  
It will also create the Git hooks with Husky if you Git version is recent enough.

Run `npm run start` to start the local development server.

### Create the secret environment file

This step is mandatory.  
You must create the `secret-environment.json` file in the [environment folder](./src/environment/).  

This file should contain at least:
- A discord Sonia secret token required by Discord API.
- A GitHub personal access token required by GitHub API.

__Shortcut:__

You can use a npm script to create the file for you.  
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
    "discordId": "OPTIONAL_AND_TO_DEFINE_BY_YOU",
    "nickname": "OPTIONAL_AND_TO_DEFINE_BY_YOU"
  }
}
```

__Note for the Discord Sonia secret token:__

The Discord Sonia secret token is private and there are two ways to have access to it:
- Asks an admin (like [C0ZEN](https://github.com/C0ZEN)).
- Access to the [Discord bot page](https://discordapp.com/developers/applications/689829775317139460/bot) to reveal the token.

__Note:__

If somehow this token is made public, Discord will revoke it.

__Note for the GitHub personal access token:__

The GitHub personal access token is strictly personal to each developer.  
You have to create your own on your GitHub account.  
It should contain the following scopes:
- user
- public_repo
- repo
- repo_deployment
- repo:status
- read:repo_hook
- read:org
- read:public_key
- read:gpg_key

__Note for the profile:__

It is useful to distinguish developers running a local version of Sonia.  
On each message (plain text or embed) the nickname will appear.  
It can be anything you want however we recommend that you use your Discord name.  

The Discord id will be used on simple text messages to use your name as a mention instead of pure text.  
If the Discord id is not set the username will be used instead as fallback.

### Create the Firebase service account file

This step is mandatory.  
You must create the `firebase-service-account-file.json` file in the [environment folder](./src/environment/).  

This file should contain the fields to configure the project.  
Refer to this [article](https://firebase.google.com/docs/admin/setup#initialize-sdk) to learn how and why.  
Basically this is the private key of Sonia API.

There is one way to have access to it:
- Asks an admin (like [C0ZEN](https://github.com/C0ZEN)).

#### How does this works?

On local development - based on the environment variable `NODE_ENV` -, `dotenv` will read the [environment file](.env) to override the environment variables.  
To configure Firebase the environment variable `GOOGLE_APPLICATION_CREDENTIALS` will be used to define the path of the Firebase service account file.

On local production, `dotenv` is not used.  
Instead, the environment variable `GOOGLE_APPLICATION_CREDENTIALS` is configured on the fly to point to the [dist](dist) folder.  

The path of the Firebase service account file being different and "production" friendly we needed to come up with this configuration file.  
Since the solution must be production-first, some node scripts are creating a default Firebase service account file based partially on dedicated environment variables.  
GitHub and Heroku will handle the replacement with the configured secrets.

Now to avoid creating manually this file when using the local production the solution was to override this generated file with the one existing locally for the local development. 

## Environment

This project use `dotenv` to load some environment variables locally only.  
On production the CI will provide his own environment variables.

## Package scripts

- `npm run start`: run the Node.js app for the local development  
- `npm run start:prod`: build and run the Node.js app like it will be once deployed in the server  
- `npm run start:local-prod`: build and run the Node.js app like it will be once deployed in the server for local development or server debugging  
- `npm run build`: create a Node.js app in the dist folder  
- `npm run build:environment`: execute all scripts to create the environment for the prod
- `npm run build:environment:copy`: copy the secret environment file inside the dist folder  
- `npm run build:environment:create`: create the environment file inside the dist folder with some default values used for the CI 
- `npm run build:environment:rewrite-path`: rename the environment file path of the Node.js app inside the dist folder  
- `npm run build:update-app-initialization-date`: update the app initialization date inside the environment file from the dist folder  
- `npm run build:firebase-service-account`: execute all scripts to create the Firebase service account file for the prod
- `npm run build:firebase-service-account:copy`: copy the Firebase service account file inside the dist folder  
- `npm run build:firebase-service-account:create`: create the Firebase service account file inside the dist folder with some default values used for the CI 
- `npm run run:prod`: run the Node.js app like it will be once deployed in the server  
- `npm run run:local-prod`: run the Node.js app like it will be once deployed in the server for local development or server debugging  
- `npm run tsc`: compile the TypeScript app to Node.js app  
- `npm run test`: run the tests once  
- `npm run test:watch`: run the tests and watch them  
- `npm run test:watch:no-cache`: run the tests and watch them without cache 
- `npm run test:majestic`: run the tests in the browser (beautiful UI)
- `npm run test:ci`: run the tests once and stop asap on error 
- `npm run test:ci:coverage`: run the tests once with code coverage and stop asap on error 
- `npm run test:mutant`: run the mutation testing once
- `npm run test:mutant:ci`: run the mutation testing once and update Stryker dashboard
- `npm run test:clear-cache`: remove the Jest cache
- `npm run lint`: run the linter and fix the errors  
- `npm run lint:ci`: run the linter  
- `npm run cz`: run a CLI to easily push and commit by following the commit convention of this project  
- `npm run semver`: create a new version, a new tag and update the [CHANGELOG](CHANGELOG.md) file  
- `npm run clean:dist`: remove the dist folder  
- `npm run commit`: create a commit by using the cz
- `npm run create-secret-environment`: create the secret-environment.json file

## Git

### Alias

This project uses an alias to push automatically with the upstream option set.  
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

The **type** and the **subject** are mandatory.  
All the other stuff is optional.

Any line of the commit message cannot be longer 144 characters!  
This allows the message to be easier to read on GitHub as well as in various git tools.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.  
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

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

## Monitoring

### Discord issues

Generic Discord error messages are sent to [Sonia Discord errors channel](http://discordapp.com/channels/689833865279307782/700770389655158924).  
These errors are coming from the Discord `error` event.

Generic Discord warning messages are sent to [Sonia Discord warnings channel](http://discordapp.com/channels/689833865279307782/701041732086792202).  
These warnings are coming from the Discord `warn` event.  

Errors caught during Sonia's message processing are also sent to [Sonia Discord errors channel](http://discordapp.com/channels/689833865279307782/700770389655158924).  
These errors are also sent as a fallback message instead.

### Code issues

For code errors you can check the logs on [Papertrail](https://my.papertrailapp.com/systems/sonia-il-est-midi-discord/events).  
Papertrail contains the full stack trace of the running server logs for seven days. 
This is a good place to catch the errors thrown.
