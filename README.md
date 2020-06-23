# Project

## Development Requirements

- Linux or Mac OS
- Node.js v12+
- NPM v6+
- Serverless 1.70+

## Getting Started

```shell
git clone git@github.com:360MediaDirect/project
cd project
npm install
npm run test
```

## Scripts

### `npm install`

Installs all project dependencies into ./node_modules.

### `npm run lint`

Runs code linting to check formatting and quality rules like "no unused variables". Unlike npm format, this doesn't fix those issues, just errors out if they exist.

### `npm run pretty`

Runs the prettier config against all .ts files to make code well-organized and easier to read.

### `npm run start`

Sets up the ability to run this Lambda function locally and offline away from AWS.

### `npm run test` or `npm run test:watch`

- `Test` Runs Jest once and shows code coverage.
- `Test:watch` Runs Jest (the unit testing tool) in watch mode. It'll run continuously and retest every time you save a file.

### `PROFILE={name} STAGE={stage} npm run deploy`

Uses the Serverless command to deploy a certain stage to AWS using a particular profile that has been saved to `~/.aws/credentials`

### `PROFILE={name} STAGE={stage} npm run remove`

Uses the Serverless command to remove architecture from AWS.

### `npm run clean`

Remove coverage and node modules folders from the base project.

## Meta files

- **.eslintignore** Contains the file patterns eslint should never check for code quality.
- **.eslintrc.json** ESLint is a code quality checker. This file tells ESLint to use a Typescript parser, and which rules to apply to the code. Most rules come from a common set of best practices.
- **.gitignore** Contains the file patterns git should never allow to be committed.
- **.prettierignore** Contains the file patterns that Prettier should never allow to be prettified.
- **.prettierrc** Prettier is a strict and heavy-handed code style formatter. This file defines fine-tuned code style changes on top of Prettier's defaults. These are enforced via a plugin to ESLint.
- **jest.config.js** Configuration for the testing library, Jest.
- **jest.setup.js** Any statements that must be run prior to running the tests from _.spec.ts and _.test.ts files.
- **package.json** All the core metadata about this application, including its top-level dependencies (for both deployed environments as well as development) and tool-specific configurations like Jest.
- **package-lock.json** Written and read by npm. Saves the exact version of every package dependency installed so that the same versions are installed each time. These can be upgraded through npm commands.
- **serverless.yml** This project's cloud resources and deployment tooling is managed by Serverless. This file defines all the AWS resources this project requires, the AWS permissions it needs to run, and more.
- **tsconfig.json** Settings for fine-tuning the Typescript compiler.
- **webpack.config.js** Typescript must be compiled down to Javascript and packaged up before deployment, and Serverless is set to use Webpack to do that. This file configures how webpack packages the project to be deployed.

## Learn More

- about Serverless, check out [here](https://www.serverless.com/).
