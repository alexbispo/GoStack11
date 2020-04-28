# React

## Basics.

### notes
  - After did run create-react-app command, we can remove some unused files, inside in src/, App.css, *.test.tsx, index.css, logo.svg, serviceWorker.ts. If we did it, is important remove the imports from removed files at index.tsx and App.tsx.
  Inside of public/, we can remove some files and keep just index.html and robot.txt, so at the index.html file, we have remove the references to these files.

  - Install eslint, remove an extension of eslint at package.json.

  - Run eslint --init command, choose: "...enforce code style...", "JavaScript modules (import/export)", "React", "... Typescript ... yes", "Browser", "... Airbnb style guide...", "... .json ...", "... install by npm ... No". After, copy the libs list displayed, remove optional versions and the all already installed lib (e.g. eslint), so install all copyed libs as development dependencies (-D flag).

  - Create the .eslintignore file, add to be ignored all .js files, node_modules/, and build.

  - Confgure .eslintrc.json, use the project created in this class as reference.

  - Configure the Prettier at prettier.config.js.
  

### commands
    $ create-react-app frontend --template=typescript

    $ yarn eslint --init

### libs
  - eslint -D
  - eslint-import-resolver-typescript -D
  - prettier eslint-config-prettier eslint-plugin-prettier -D