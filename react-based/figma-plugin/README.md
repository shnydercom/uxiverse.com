# running Uxiverse Plugin in development
- run `yarn`
- the package 'react-figma-plugin-ds' is a git dependency (relies on specific PR). Search for the folder in node_modules and run `yarn && yarn build && yarn build-styles` there. That should be suffise until the PR is merged
- run `yarn start`



# Create React Figma Plugin

Create React Figma Plugin with no build configuration.

This demonstrates:

- bundling plugin code using Webpack
- using React with TSX
- dependency management under Yarn
- linting utility using ESLint
- linting style using StyleLint
- formatting using Prettier
- hot reload support using [`modd`](https://github.com/cortesi/modd), please `brew install modd` first
- design system using [`react-figma-plugin-ds`](https://github.com/alexandrtovmach/react-figma-plugin-ds)

The main plugin code is in `src/code.ts`. The HTML for the UI is in
`src/ui.html`, while the embedded JavaScript is in `src/ui.tsx`.

These are compiled to files in `dist/`, which are what Figma will use to run
your plugin.

To use:

    $ yarn
    $ yarn start
    $ yarn lint
    $ yarn build
