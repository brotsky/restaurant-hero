## Current locations that are in development
- Los Angeles, CA
- New York, NY
- Houston, TX
- Rochester, NY
- Austin, TX
- New Jersey

## Join the Restaurant Hero Community!

Please join our [Slack Community!](https://join.slack.com/t/restauranthero/shared_invite/zt-cyzlvdhg-lKSaf2dYg2FGNzXPLRk3Sw)

## Backend / API
The backend to this is meant to be an MVP and will hopefully get rebuilt by the community. Right now it is a simple Google Sheet for each city. Check out the [Los Angeles Google Sheet](https://docs.google.com/spreadsheets/d/1OeUGyebmq-f2gLiIsukk-hoYu1HuQQUMvcyEBOE0_fY/edit?usp=sharing) as an example.

## Multiple Domains.
We are using Zeit.co which uses AWS Lambdas behind the scenes and point each location domain to the same project. There is logic based on the host domain _(window.location.host)_

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Business Logic

### Submitting Restaurants

Submitting restaurants are done by community members/admins to add restaurant in the area that are still serving food.

1. A restaurant is submitted via a Community Google Form.
2. A moderator/admin verifies/updates the information.
3. A moderator/admin moves that information from the Community Google Form sheet to the relevant Community GoogleSheet.



## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
