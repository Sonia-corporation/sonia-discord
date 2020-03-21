# Semantic Versioning Changelog

# [1.5.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.4.0...1.5.0) (2020-03-21)


### Bug Fixes

* **build:** change the way to read the environment file to avoid path error ([04f2abd](https://github.com/Sonia-corporation/il-est-midi-discord/commit/04f2abdd5901a9a08609215244c8d1e6fdee9a41))


### Features

* **scripts:** add chalk configuration ([d791894](https://github.com/Sonia-corporation/il-est-midi-discord/commit/d79189410c4636d0ef1db44c56a69189a9eda1ce))
* **build:** add handler for the environment file ([417590c](https://github.com/Sonia-corporation/il-est-midi-discord/commit/417590c135b811f98419bb568187bda06f60c8f1))
* **scripts:** add logger configuration ([89788b7](https://github.com/Sonia-corporation/il-est-midi-discord/commit/89788b7ccfd03fb75b34ce3bda16a624ba57d1ab))
* **env:** add new script to rewrite the path of the environment file inside the index ([3743a12](https://github.com/Sonia-corporation/il-est-midi-discord/commit/3743a1278b99dcf5418da10954098894db632091))
* **env:** add script to copy the environment file to the dist ([90b8a85](https://github.com/Sonia-corporation/il-est-midi-discord/commit/90b8a853d4e2e38b850f44d525d9d6087b9baa2e))
* **logger:** add warning log type ([bbd247f](https://github.com/Sonia-corporation/il-est-midi-discord/commit/bbd247f791ceee5c6ff0c5a8eb1ce486215d5962))

# [1.4.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.3.0...1.4.0) (2020-03-20)


### Bug Fixes

* **logs:** add missing chalk wrapper for some logs ([f32e1e1](https://github.com/Sonia-corporation/il-est-midi-discord/commit/f32e1e1300c8aa91f9ebdd7e1764861c356b3606))
* **logs:** do not use constructor.name for the logs ([53f8f45](https://github.com/Sonia-corporation/il-est-midi-discord/commit/53f8f45d90a5fa73b8e93928a116533c5d1cbe30))
* **serve:** fix runtime error for the prod server ([bfd5939](https://github.com/Sonia-corporation/il-est-midi-discord/commit/bfd5939c4a7a53e135f0b2c9a1bf62d4fa72787e))
* **ci:** fix test step ([efc147a](https://github.com/Sonia-corporation/il-est-midi-discord/commit/efc147ac3db54dc12dde324450d8464ec7a5f74d))


### Features

* **logger:** add fractional seconds when using the context ([7c7c0af](https://github.com/Sonia-corporation/il-est-midi-discord/commit/7c7c0af2f76b5e3243636f0c874677929608bd2c))
* **logger:** add fractional seconds when using the context ([77d944e](https://github.com/Sonia-corporation/il-est-midi-discord/commit/77d944e5f03c65a4faef477ccd61439edafbaf2d))
* **lint:** add new rules ([c2e7a5b](https://github.com/Sonia-corporation/il-est-midi-discord/commit/c2e7a5b570ab0bd7ab5fc53fe42648f32b9d194c))
* **logger:** add prefix for all logs with a bullet ([aedc764](https://github.com/Sonia-corporation/il-est-midi-discord/commit/aedc764584d02df31931249c540788eaadd65eff))
* **logger:** add success log ([8f24d47](https://github.com/Sonia-corporation/il-est-midi-discord/commit/8f24d4778654191d1b045c003e8c870db1587b6a))
* **build:** build with parcel instead of tsc ([d5d0469](https://github.com/Sonia-corporation/il-est-midi-discord/commit/d5d0469f0954117a916fe136d13364591d4d186d))
* **ci:** use dedicated scripts for the CI ([c80ad98](https://github.com/Sonia-corporation/il-est-midi-discord/commit/c80ad98f1cadbe02a5a5477047897e059446c4d8))


### Performance Improvements

* **lint:** add cache ([9537d41](https://github.com/Sonia-corporation/il-est-midi-discord/commit/9537d4100565e0ff090b07aff7e1d0ba0817003a))

# [1.3.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.2.1...1.3.0) (2020-03-20)


### Features

* **discord:** add new class for author and channel handling ([c57e918](https://github.com/Sonia-corporation/il-est-midi-discord/commit/c57e9187ad4778f7100e87679dcdf0ec5e108eb3))
* **discord:** add new class to handle the mention ([0868c3e](https://github.com/Sonia-corporation/il-est-midi-discord/commit/0868c3e4daa95183551a5bbdfc2761568f638bc9))
* **discord:** add new pure functions to checks the class instances validity ([c22925a](https://github.com/Sonia-corporation/il-est-midi-discord/commit/c22925a2f3fe545d3bfc120dc2f959769eec985d))
* **discord:** sonia will now responds cleverly ([a79923e](https://github.com/Sonia-corporation/il-est-midi-discord/commit/a79923e14c47a604ba7580db14be3d49d0ffa356))
* **discord:** sonia will send better responses to an author ([7f97cb1](https://github.com/Sonia-corporation/il-est-midi-discord/commit/7f97cb1f8066fdac6fbaaf012a39018d8ff691b1))

## [1.2.1](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.2.0...1.2.1) (2020-03-20)


### Bug Fixes

* **release:** fix the publication of packages ([dcddd05](https://github.com/C0ZEN/sonia-il-est-midi/commit/dcddd0552e11de9d7749bfdb28637c6b703ca968))

# [1.2.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.1.0...1.2.0) (2020-03-20)


### Features

* **release:** add a new standalone workflow for the release ([3c3f852](https://github.com/Sonia-corporation/il-est-midi-discord/commit/3c3f852306bdf012504a3f027ae7920c82b8e252))
* **readme:** add new badge for the build status on the master branch ([ce5d4d7](https://github.com/Sonia-corporation/il-est-midi-discord/commit/ce5d4d713ff6af9175c93bc06cfc7d090c1eaed1))

# [1.1.0](https://github.com/Sonia-corporation/il-est-midi-discord/compare/1.0.0...1.1.0) (2020-03-20)


### Bug Fixes

* **semver:** add missing preset dependency ([caf0db4](https://github.com/Sonia-corporation/il-est-midi-discord/commit/caf0db4818af0e8e8baf287862b7fbdc299cce98))
* **semver:** rewrite the name of the branch to trigger the release ([05b78d1](https://github.com/Sonia-corporation/il-est-midi-discord/commit/05b78d1718ed5dc0793407fadcb6851f8b8536a8))


### Features

* **semver:** add more options for the changelog ([dba5f53](https://github.com/Sonia-corporation/il-est-midi-discord/commit/dba5f53796f7877d019e872d5d2cc50ecd558ec6))
* **ci:** add new ci step to use semver on master ([7c1fc49](https://github.com/Sonia-corporation/il-est-midi-discord/commit/7c1fc49067f77ca48befb8f79b9b17d7cb44d868))

# 1.0.0 (2020-03-20)


### Bug Fixes

* **ci:** [warning]No scopes with read permission were found on the request. ([c2d475f](https://github.com/Sonia-corporation/il-est-midi-discord/commit/c2d475fdc3e964a6d3a8b4f7fcde597658b26cdc)), closes [/github.com/actions/cache/issues/107#issuecomment-556037278](https://github.com//github.com/actions/cache/issues/107/issues/issuecomment-556037278)
* **ci:** add checks to avoid build error ([081befa](https://github.com/Sonia-corporation/il-est-midi-discord/commit/081befa374bbe8543c3f7d704916d6f7ad501bc2))
* **ci:** add checks to avoid build error ([c742d6c](https://github.com/Sonia-corporation/il-est-midi-discord/commit/c742d6c5cb799ecb7e01940f9ea0b439d1befce0))
* **build:** add new dependency to avoid build error ([dcd39b8](https://github.com/Sonia-corporation/il-est-midi-discord/commit/dcd39b87e64f90d613162b0be44f0a2f71dff333))
* **publish:** change the user name and the npm token name ([3c70c5a](https://github.com/Sonia-corporation/il-est-midi-discord/commit/3c70c5a2da3794e12ae94a2933766636c0740ea5))
* **build:** remove useless variables to fix the build ([3811958](https://github.com/Sonia-corporation/il-est-midi-discord/commit/3811958d2403b56b08062308ee1cace78938e367))
* **ci:** the lint will now works as expected ([1d84d88](https://github.com/Sonia-corporation/il-est-midi-discord/commit/1d84d88d1e153e0837260b358fd524554ab66d75))


### Features

* **scaffolding:** add a bunch of configuration files ([e5d4e46](https://github.com/Sonia-corporation/il-est-midi-discord/commit/e5d4e46b8df4bd8e00deceb38050d3cfa1080b4a))
* **ci:** add cache for node_modules ([82af0e8](https://github.com/Sonia-corporation/il-est-midi-discord/commit/82af0e87920355d1014694a8ce5c08e137bc7e1e))
* **label:** add configuration file ([81da990](https://github.com/Sonia-corporation/il-est-midi-discord/commit/81da9907ac70a4fbc25c4aefe80d94192b682893))
* **ci:** add lint step ([464281a](https://github.com/Sonia-corporation/il-est-midi-discord/commit/464281aa288fbdf6ba93df3d7299d4d14fe01592))
* **publish:** add new script to run the ci build ([2dfb5de](https://github.com/Sonia-corporation/il-est-midi-discord/commit/2dfb5de2d4a4921fdd22c892bd25d307eaf36eed))
* **ts:** add ts (wip) ([cbe21b7](https://github.com/Sonia-corporation/il-est-midi-discord/commit/cbe21b7f7800836120d289ee9879b3bb676264ce))
* **ci:** add workflow to configure the CI for GitHub ([ba4d249](https://github.com/Sonia-corporation/il-est-midi-discord/commit/ba4d249b4913f43ec536418e6144bab7d819cc3d))
* **ci:** build on develop too ([381437f](https://github.com/Sonia-corporation/il-est-midi-discord/commit/381437f9637c6fe4ccbcfb6e87814fe670301bc8))
* **lint:** configure eslint to use ts ([5009d7a](https://github.com/Sonia-corporation/il-est-midi-discord/commit/5009d7a2e5d5438f4a2a8106ec0d18bb3a6ca479))
* **bot:** create a simple listener with powerful logs ([de2e0e8](https://github.com/Sonia-corporation/il-est-midi-discord/commit/de2e0e8e599ada34010be76a19023f5daba60d1a))
* **ci:** do not build on develop ([bc87c11](https://github.com/Sonia-corporation/il-est-midi-discord/commit/bc87c11831aece1704be9f7736ee3b2690ca52ac))
* **publish:** force to publish public packages ([8ee1ea4](https://github.com/Sonia-corporation/il-est-midi-discord/commit/8ee1ea4e8fbe0042e1fc4dd5340329d0dfa203f8))
* **ts:** use ts instead of pure js ([c4ab45e](https://github.com/Sonia-corporation/il-est-midi-discord/commit/c4ab45e645256f31fe81c15343f0988fce8bae4d))
