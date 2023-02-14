# Contributing

## Issues

In the case of a bug report, a suggestions, or if you just need help, please feel very free to open an issue.

For general issues, please use the following labels:

- Something is not working as intended: `bug`
- Need help with something: `help wanted`
- Have a question: `question`
- Have a suggestion or want to request a feature: `enhancement`

## Pull Request

Start by forking the repository.  
Clone your forked repository to your local machine.

When creating a PR, please use the `development` branch as the base branch.

### Install

Install the client by using

```console
npm install
```

### Build

Run the command:

```console
npm run build
```

This will compile the TypeScript in JavaScript and put into folder `dist` in the root.

### Tests

We should have every endpoint with corresponding unit test and E2E(End-to-End) test

Run Unit test

    npm run test

Run e2e test

    npm run e2etest

E2E tests interact directly with the Reddit so you'll need reddit api credientials to run.

Get there from https://www.reddit.com/dev/api/

Add your reddit api credendtials to the .env file. See .env.sample for example

### Manual Testing

Follow the above steps and make sure you have a `dist` folder with the transpiled source code.  
Create a new node project somewhere on your machine using the command:

```console
npm init --y
```

In this new project, install the Twitter API Client from your local path.

```console
npm install path/to/your/cloned/reddit-client-api/repository
```

Consume the client and test that the new functionality works as expected.

### Update the version

Before creating the PR, make sure to update the version using the principles of semantic versioning.  
This is done by simple going to the `package.json` file and update the version.

## PR Checklist

- I ran all unit tests, and they are passing
- I wrote new unit tests if appropriate
- I install the client locally and tested it manually
- I updated the version in `package.json`
