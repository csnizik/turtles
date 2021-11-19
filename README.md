# ** Greyworm epi **

## Run project locally

**Dependencies**

- Node version (^12.0.0) We suggest using 12.8.1 (https://nodejs.org/dist/v12.8.1/)
- Download [CORS chrome extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)
- Download Redux DevTools for debugging

Instructions to setup project on your local machine.

1. Change directories to a folder where you store all your projects

Example

```
cd /c/workspace/projects
```

2. Clone project

```
git clone https://{your_user_name}@bitbucket.org/gassomsfi/greyworm-epi.git
```

3. Install node packages

```
npm install
```

4. Run project

```
npm start
```

---

## Run tests

Open command line and run

```
npm test
```

Run single test

```
npm test Home.test.tsx
```

### Deployment

When a pull request is merged into the 'develop' branch, a jenkins job will kick off and deploy the current code to the dev site [Greyworm Epi](https://greyworm-epi-dev.spatialfrontlab.com/)

Jenkins - https://jenkins.spatialfrontlab.com/job/CIG-Epi/job/develop/

### Common resources & libraries used throughout project

- [ArcGis](https://developers.arcgis.com/javascript/latest/)
- [Axios](https://www.npmjs.com/package/axios)
- [Immutable](https://immutable-js.github.io/immutable-js/)
- [React](https://reactjs.org/docs/getting-started.html)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [React Dom](https://reactjs.org/docs/react-dom.html)
- [React redux](https://github.com/reduxjs/redux-devtools)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Recharts](https://recharts.org/en-US/)
- [Prettier](https://prettier.io/)
- [ESLint] (https://eslint.org/)

##### UI components

- **Primary library** - [U.S Web Design System USWDS](https://designsystem.digital.gov/components/overview/)
- [NRCS design system](https://koala-bandits.github.io/nrcs-design-system/)
- [Charting library](https://recharts.org/en-US)

##### Style guide

- [CSS Basics](https://www.youtube.com/kevinpowell)
- [Node sass](https://github.com/sass/node-sass)
- [Scss](https://sass-lang.com/)

##### 508 Accessibility

- [Webaim](https://webaim.org/techniques/aria/)
- [MDN Aria attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/List_role)
- [Aria explanation and more](http://inclusive-design.umn.edu/aria/index.html)
- [Accessibility fundamentals](https://developers.google.com/web/fundamentals/accessibility/semantics-aria/)

##### Unit Tests

- [Jest for unit tests](https://jestjs.io/docs/using-matchers)
- [Testing basics](https://redux.js.org/recipes/writing-tests)
- [React Testing library](https://testing-library.com/docs/react-testing-library/api/)

##### Icons Guide

- Download icons from https://designsystem.digital.gov/components/icon/ and navigate to dist/img
- Add to your code with `<img className="myLogo" src="/icons/myLogo.svg" alt="myLogo"/>`
- Importing icons from public folder will not work due to React and Typescript module issues

##### Prettier / ESLint Guide

- For installation and set up, refer to our Spike document (https://docs.google.com/document/d/1F2QH9qQaYQ83WIj97mTyVlOY5HIZer7_X4J1_Vvo21A/edit?usp=sharing)

#### Tech Stack

- Front-end - React (https://reactjs.org/docs/getting-started.html) & Typescript (https://www.typescriptlang.org/docs/)
- Back-end - .Net v5 (https://bitbucket.org/gassomsfi/greyworm-endo-admin/src/develop/)
- Overview of endpoints - https://greyworm-endo-admin-dev.spatialfrontlab.com/swagger/index.html
