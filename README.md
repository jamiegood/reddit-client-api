# Reddit API CLient

TypeScript client for the Reddit API.

⚠️This is not finished.⚠️ It does not implement the full Reddit API.
https://www.reddit.com/dev/api/

If you are looking for an npm package for accessing the reddit api.
The Offical Reddit Client may be the one you are looking for
https://github.com/reddit/node-api-client

## Introduction

The purpose of this repo is to create a Reddit Client with TypeScript. I'm on a TypeScript learning journey so I reckon this is a great way to learn.

If you are also interested in learning TypeScript feel free to contribute.

Read the [Contributing Guide](https://github.com/jamiegood/reddit-client-api/blob/main/CONTRIBUTING.md) to get started. Then pick an endpoint from the Reddit API docs and create a pull request.

Just be sure to add unit and e2e tests 🙏🏼

## Goals

- [ ] Include most the official Reddit api endpoints
- [ ] Promise-based
- [ ] Fully typed. Both for query parameters and responses.

## Work in Progress

Endpoints Completed so far:

Mostly the 'listing section' https://www.reddit.com/dev/api/#section_listings

- /api/v1/access_token
- /new/
- /r/_subreddit_/new/
- /hot/
- /r/_subreddit_/hot/
- /rising/
- /r/_subreddit_/rising/
- /hot/
- /r/_subreddit_/hot/
- /r/best/
- /r/_subreddit_/best/
- /r/_subreddit_/random/
- /r/_subreddit_/comments/_postId_
- /duplicates/_postId_

Where _subreddit_ is the name of the subredit

## Install

```sh
    npm i reddit-client-api
```

## Usage

```typescript
    import RedditClient from "reddit-client-api";

    const config = {
      apiKey: `${process.env.REDDIT_APIKEY}`,
      apiSecret: `${process.env.REDDIT_APISECRET}`,
      userAgent: `${process.env.USERAGENT}`,
    };
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: `${process.env.USERNAME}`, password: `${process.env.PASSWORD}` });

    // get Rising Posts limited to 2 posts per page and 2 pages
    const risingPosts = await myRedditClient.getRisingPosts(2, 2);
    // get Rising Posts by Subreddit sideproject
    const risingSideprojectPosts = await myRedditClient.getRisingPostsBySubreddit('sideproject', 2, 2);

    // get New Posts limited to 2 posts per page and 2 pages
    const newPosts = await myRedditClient.getNewPosts(2, 2);
    // get New Posts by Subreddit sideproject
    const newSideprojectPosts = await myRedditClient.getNewPostsBySubreddit('sideproject', 2, 2);

    // get Hot Posts limited to 2 posts per page and 2 pages
    const hotPosts = await myRedditClient.getHotPosts(2, 2);
    // get Hot Posts by Subreddit sideproject
    const hotSideprojectPosts = await myRedditClient.getHotPostsBySubreddit('sideproject', 2, 2);

    // get Hot Posts limited to 2 posts per page and 2 pages
    const bestPosts = await myRedditClient.getBestPosts(2, 2);
    // get Hot Posts by Subreddit sideproject
    const bestSideprojectPosts = await myRedditClient.getBestBySubreddit('sideproject', 2, 2);


    // get duplicate posts
    const duplicateListingForPost = await myRedditClient.getPostDuplicate(postID);
    // get random
    const randomPost = await myRedditClient.getRandom();
```

## License

This project is licensed under the [MIT License](https://github.com/jamiegood/reddit-client-api/blob/main/LICENSE)

## Get Help

Reach out on [https://thefullstack.network/u/jamie](https://thefullstack.network/u/jamie)
Open an issue on GitHub

## Contributions

The goal of this repo is to learn TypeScript so please feel free to contribute.
Pull requests are always welcome, and I'll do my best to do reviews as fast as I can.

In the case of a bug report, bugfix or a suggestions, please feel very free to open an issue too.

Please refer to the [contribution guide](https://github.com/jamiegood/reddit-client-api/blob/main/CONTRIBUTING.md) to see how to get started.

## References

https://www.reddit.com/dev/api/
