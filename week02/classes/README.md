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

    $ yarn add @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.20.1 @typescript-eslint/parser@latest

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

## Docker

  commands:

    $ docker run --name <container_name> -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

    $ docker logs <container_name>

    $ docker stop <container_name>

    $ docker start <container_name>

## TypeORM

  - Remember to install the database driver.

  - Remember to configure tsconfig.json to use experimental options.

  - Rememeber to create a new script at package.json to execute cli.js.

  - Remember to install reflect-metadata

## Utils
  - yard add bcryptjs --> to encrypt passwords.
    - yarn add @types/bcryptjs -D --> to add ts types.
