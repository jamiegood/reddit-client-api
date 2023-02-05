# Reddit API CLient

TypeScript client for Reddit API.

This is not finished. It does not implement the full Reddit API.
https://www.reddit.com/dev/api/

If you are looking for an npm package for accessing the reddit api.
The Offical Reddit Client may be the one you are looking for
https://github.com/reddit/node-api-client

Endpoints Completed:
/api/v1/access_token
/r/${subreddit}/new/
/r/${subreddit}/hot/
/r/${subreddit}/rising/

Where subreddit is the name of the subredit

Run Unit test

    npm run test

Run e2e test

    npm run e2etest

To Run (using ts-node)

    ts-node runner.ts

https://www.reddit.com/dev/api/
