# Week 01:

## Backend:

commands:
  - Create new project: yarn init -y
  - Covention try always create the structure src/index.js
  - Install dependencies yarn add <package> [options]

nodemon:
  - yarn nodemon src/index.js

## Frontend:
  libs:

      $ yarn add react react-dom

      $ yarn add @babel/core @babel/preset-env @babel/preset-react @babel/cli webpack webpack-cli

      $ yarn add babel-loader

      $ yarn add webpack-dev-server -D

      $ yarn add style-loader css-loader

      $ yarn add file-loader

      $ yarn add axios

  commands:

      $ yarn babel src/index.js --out-file public/bundle.js

      $ yarn webpack --mode development

      $ yarn webpack-dev-server --mode development


  - react : it contains the core features.

  - react-dom : it is especific to browser.

  - babel : it transpiles react code to browsers code.

  - webpack : it manages the project build.

  - babel.config : it configures babel

  - @babel/preset-env : it is used to babel transpile Edge JS features to enviroment JS (browsers).

  - @bable/preset-react : it is used to babel tranpile react especific code (JSX, etc...)

  - webpack.config.js : it configures webpack

## Mobile

  React Native

    - JS -> Metro Bundle -> Bundle.js -> Bridge -> IOS & Android

    - Yoga -> Lib to convert css styles to native mobile styles.

    - Expo -> SDK with features to build mobile apps with React Native without access to native code.

    - View -> Container component.

    - Text -> Component used to any kind of text.

    - All components has "display: 'flex'" by default.

    - For access to local backend from Android usb device, in the app code
    use local machine IP.

    - For access to local backend from Android emulator use adb reverse command
    to bind the local backend port with emulator port. Or use IP: 10.0.2.2 or
    10.0.3.2.

  commands:

    $ adb devices

    $ adb -s <device name> reverse tcp:8081 tcp:8081

    $ react-native run-android
