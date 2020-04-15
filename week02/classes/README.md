# Week 02

## Structure and Projects.

To create a new backend project:

    $ yarn init -y

    $ yarn add express

    $ yarn add typescript -D

    $ yarn tsc --init

    $ yarn add @types/express -D

    $ yarn add ts-node-dev -D

    $ yarn add eslint -D

    $ yarn add -D eslint-import-resolver-typescript

    $ yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

Is important edit tsconfig to configure the out dir and root dir.

ts-node-dev: Is a kind of mix between nodemon and tsc utilities, it watches and traspiles ower code.

Remember to creates scripts at package.json file to help with development. (eg. "dev:server": "ts-node-dev --transpileOnly --ignore node_modules src/server.ts").

To configure eslint, execute yarn eslint --init and choose the options taht make sense for your project.

  - Here, a sugestion about which options use with backend typescript project:

        ? How would you like to use ESLint? To check syntax, find problems, and enforce code style
        ? What type of modules does your project use? JavaScript modules (import/export)
        ? Which framework does your project use? None of these
        ? Does your project use TypeScript? Yes
        ? Where does your code run? Node
        ? How would you like to define a style for your project? Use a popular style guide
        ? Which style guide do you want to follow? Airbnb: https://github.com/airbnb/javascript
        ? What format do you want your config file to be in? JSON

  - Remember to configure VSCode to fix eslint errors on save.

  - If using prettier, remember to edit eslint configuration to integrate with it.

  - To configure preetier use prettier.config.js

  - To avoid eslint to check unecessary files, edit .eslintignore.
