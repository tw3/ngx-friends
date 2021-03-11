# NGX-Friends

## Run the application

To run the app locally:

1. `git clone https://github.com/tw3/ngx-friends.git`
1. `cd ngx-friends`
1. `yarn install`
1. `npm start`
1. Navigate to http://localhost:4200/.

Once the app is loaded you will see the New User Details form. Enter in the Name, Age, Weight, and Friends for the user
and click the Add User button.

A series of charts will appear below the form that visualize the data you entered.

For your convenience you can click the Populate Random Data to fill in the form with random values for Name, Age,
Weight, and Friends.

![NGX Friends Demo](https://raw.githubusercontent.com/tw3/ngx-friends/master/doc/images/ngx-friends-demo.gif)

## Run storybook for chart-cards-ui

1. ng run chart-cards-ui:storybook
2. Visit http://localhost:4400/ in your browser

![Storybook Demo](https://raw.githubusercontent.com/tw3/ngx-friends/master/doc/images/storybook_bubblechart.png)

## Testing

### Run e2e tests for the whole app

```
npm run e2e
```

### Run e2e tests for chart-cards-ui storybook

```
npx nx run shared-ui-e2e:e2e --watch
```

## Run unit tests

```
npm test
```

## Libraries/Frameworks Used

- [Angular](https://angular.io/) v11
  - Modules
  - Components
  - Services
  - Routing
  - Reactive Forms with Validation
  - [Typescript](https://www.typescriptlang.org/) v4 language
  - [RxJS](https://rxjs-dev.firebaseapp.com/guide/overview) v6
- [Angular Material](https://material.angular.io/) v11 component library
  - Material Toolbar
  - Material Card
  - Material Autocomplete
  - Material Chips
  - Material Progress Bar
- [Nx](https://nx.dev/angular) v11 dev tools for Angular
  - [ESLint 7](https://eslint.org/)
  - [Jest 26](https://jestjs.io/) unit test framework
  - [Cypress](https://www.cypress.io/) end-to-end test framework
  - [Storybook 11](https://storybook.js.org/) component viewer/tester
- [NgxCharts](https://swimlane.github.io/ngx-charts/) v17 charting framework
- [D3](https://d3js.org/) v4.13 charting library
- [Flexboxgrid](http://flexboxgrid.com/) v6 grid system

## Code Design Overview

NX Dependencies:
![NGX Friends NX Dependencies](https://raw.githubusercontent.com/tw3/ngx-friends/master/doc/images/nx-dep-graph.png)
