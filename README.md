# NGX-Friends

## Running the app

The simplest way to see the app is to [visit the deployed app on GitHub pages](https://tw3.github.io/ngx-friends/).

To run the app locally:

1. `git clone https://github.com/tw3/ngx-friends.git`
2. `cd ngx-friends`
3. `yarn install`
4. `npm start`
5. Navigate to http://localhost:4200/

## Instructions

Once the app is loaded you will see the New User Details form. Enter in the Name, Age, Weight, and Friends for the user
and click the Add User button.

A series of charts will appear below the form that visualize the data you entered.

For your convenience you can click the Populate Random Data to fill in the form with random values for Name, Age,
Weight, and Friends.

![NGX Friends Demo](https://raw.githubusercontent.com/tw3/ngx-friends/master/doc/images/ngx-friends-demo.gif)

## Running storybook for chart-cards-ui

[Storybook](https://storybook.js.org/) is a great tool to see and interact with your app components in isolation.

1. ng run chart-cards-ui:storybook
2. Visit http://localhost:4400/ in your browser

![Storybook Demo](https://raw.githubusercontent.com/tw3/ngx-friends/master/doc/images/storybook_bubblechart.png)

## Testing

### Running e2e tests for the app

1. `npx nx run ngx-friends-e2e:e2e --watch`
2. Wait for the cypress test window to launch
3. Click "app.spec.ts"
4. End-to-end tests for the application will run

### Running storybook e2e tests for the chart-cards-ui lib

1. `npx nx run chart-cards-ui-e2e:e2e --watch`
2. Wait for the cypress test window to launch
3. Click any of the spec.ts links
4. End-to-end tests for the chart cards will run

### Run storybook e2e tests for the shared-ui lib

1. `npx nx run shared-ui-e2e:e2e --watch`
2. Wait for the cypress test window to launch
3. Click any of the spec.ts links
4. End-to-end tests for the chart cards will run

### Running unit tests

```
npm test
```

## Libraries/Frameworks used

- [Angular](https://angular.io/) v11
  - Modules
  - Components
  - Services
  - Routing
    - Lazy-loading feature modules
    - [Quicklink](https://github.com/mgechev/ngx-quicklink) preload strategy
  - Reactive Forms
    - Form status change listeners
    - Form value change listeners
    - Form validation
  - [Typescript](https://www.typescriptlang.org/) v4 language
  - [RxJS](https://rxjs-dev.firebaseapp.com/guide/overview) v6 reactive programming library
- [NgRX](https://ngrx.io/) v11
- [Angular Material](https://material.angular.io/) v11 component library
  - Material toolbar
  - Material card
  - Material text field
  - Material autocomplete
  - Material chips
  - Material progress par
  - Material icons
- [Nx](https://nx.dev/angular) v11 dev tools for Angular
  - [Storybook](https://storybook.js.org/) v11 component viewer/tester
  - [Cypress](https://www.cypress.io/) v6 end-to-end test framework
    - [cypress-image-snapshot](https://github.com/jaredpalmer/cypress-image-snapshot) v4 to catch visual regressions
      during e2e tests
  - [Jest](https://jestjs.io/) v26 unit test framework
  - [ESLint](https://eslint.org/) v7
- [NgxCharts](https://swimlane.github.io/ngx-charts/) v17 charting framework
- [D3](https://d3js.org/) v4 charting library
- [Flexboxgrid](http://flexboxgrid.com/) v6 grid system
- [angular-cli-ghpages](https://medium.com/faun/host-angular-app-for-free-8a443d324cda) v1 script for easy deployment to
  GitHub Pages

## App / lib / module relationships

### App / lib relationships

![NGX Friends NX Dependencies](https://raw.githubusercontent.com/tw3/ngx-friends/master/doc/images/nx-dep-graph.png)

### Modules relationships

Can be seen in Compodoc:

1. `npm run compodoc`
2. Visit http://127.0.0.1:8080/ in your browser
3. Click "Modules" in the left navigation

![Compodoc Screenshot](https://raw.githubusercontent.com/tw3/ngx-friends/master/doc/images/compodoc_AppModule.png)
