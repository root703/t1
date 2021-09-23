# Flexor Instant Quote
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
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

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




## Deploy

### Consumer

1) Push to `main` - AWS Amplify will handle the rest

### Admin

1) Login to ECS
`AWS_PROFILE=flexor aws ecr get-login-password  --region us-west-1 | docker login --username AWS  --password-stdin 188252181461.dkr.ecr.us-west-1.amazonaws.com`
    - Will require you to have a `flexor` profile configured (https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)
2) Make sure you are using the default context
    - `docker context` - to list them and see which one is active
    - `docker context use default`
3) Build the images `npm run docker:build` while using `default` context
4) Tag the images appropriately (_you could name these images to make it easier_)
    - `docker images` to list images
    - tag the `latest` UI build (`instant-quote/admin-ui`)
        - `docker tag <image-id> 188252181461.dkr.ecr.us-west-1.amazonaws.com/flexor-instant-quote-admin:ui`
    - tag the `latest` API build (`instant-quote/admin-api`)
        - `docker tag <image-id> 188252181461.dkr.ecr.us-west-1.amazonaws.com/flexor-instant-quote-admin:api`
5) Push the newly tagged images to ECS
    - `docker push  188252181461.dkr.ecr.us-west-1.amazonaws.com/flexor-instant-quote-admin:ui`
    - `docker push  188252181461.dkr.ecr.us-west-1.amazonaws.com/flexor-instant-quote-admin:api`
4) 'Use' docker ecs context (`docker context use <whatever-ecs-context-name>`)
    - if you need to create a new context see (https://docs.docker.com/cloud/ecs-integration/#create-aws-context)
        - will require IAM permissions/credentials
    - `docker context` to see which one is active
5) While using the `docker ecs context`, run `npm run docker:deploy`
6) *Optional* - log into AWS and stop the currently running tasks if the new docker images do not get replaced within 15 minutes
    - https://us-west-1.console.aws.amazon.com/ecs/home?region=us-west-1#/clusters/instant-quote-admin/tasks
    - If manually stopping, I would wait at least 3 minutes after they are deployed
