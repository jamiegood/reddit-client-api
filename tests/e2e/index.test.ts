import * as dotenv from "dotenv";
dotenv.config();

import RedditClient from "../../src/index";

import { IListingNewChildren } from "../../src/interfaces/IListingNew";

describe("testing E2E RedditClient. This calls the Reddit API", () => {
  test("Create new RedditClient and get new posts", async () => {
    const config = {
      apiKey: `${process.env.REDDIT_APIKEY}`,
      apiSecret: `${process.env.REDDIT_APISECRET}`,
      userAgent: `${process.env.USERAGENT}`,
    };
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: `${process.env.USERNAME}`, password: `${process.env.PASSWORD}` });
    const posts: IListingNewChildren[] = await myRedditClient.getNewPosts(2, 2);
    posts.forEach((post) => {
      console.log(post.data.title);
      //console.log(new Date(post.data.created * 1000));
    });
    expect(posts).toBeInstanceOf(Object);
  });

  test("Create new RedditClient and get New posts by Subbreddit", async () => {
    const config = {
      apiKey: `${process.env.REDDIT_APIKEY}`,
      apiSecret: `${process.env.REDDIT_APISECRET}`,
      userAgent: `${process.env.USERAGENT}`,
    };
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: `${process.env.USERNAME}`, password: `${process.env.PASSWORD}` });
    const posts: IListingNewChildren[] = await myRedditClient.getNewPostsBySubreddit("sideproject", 2, 2);
    posts.forEach((post) => {
      console.log(post.data.title);
      //console.log(new Date(post.data.created * 1000));
    });
    expect(posts).toBeInstanceOf(Object);
  });

  test("Create new RedditClient and get Best posts", async () => {
    const config = {
      apiKey: `${process.env.REDDIT_APIKEY}`,
      apiSecret: `${process.env.REDDIT_APISECRET}`,
      userAgent: `${process.env.USERAGENT}`,
    };
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: `${process.env.USERNAME}`, password: `${process.env.PASSWORD}` });
    const posts: IListingNewChildren[] = await myRedditClient.getBest(2, 2);
    posts.forEach((post) => {
      console.log(post.data.title);
      //console.log(new Date(post.data.created * 1000));
    });
    expect(posts).toBeInstanceOf(Object);
  });

  test("Get BestBySubreddit posts", async () => {
    const config = {
      apiKey: `${process.env.REDDIT_APIKEY}`,
      apiSecret: `${process.env.REDDIT_APISECRET}`,
      userAgent: `${process.env.USERAGENT}`,
    };
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: `${process.env.USERNAME}`, password: `${process.env.PASSWORD}` });
    const posts: IListingNewChildren[] = await myRedditClient.getBestBySubreddit("sideproject", 2, 2);
    posts.forEach((post) => {
      console.log(post.data.title);
      console.log(new Date(post.data.created * 1000));
    });
    expect(posts).toBeInstanceOf(Object);
  });

  test("Get Rising posts", async () => {
    const config = {
      apiKey: `${process.env.REDDIT_APIKEY}`,
      apiSecret: `${process.env.REDDIT_APISECRET}`,
      userAgent: `${process.env.USERAGENT}`,
    };
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: `${process.env.USERNAME}`, password: `${process.env.PASSWORD}` });
    const posts: IListingNewChildren[] = await myRedditClient.getRisingPosts(2, 2);
    posts.forEach((post) => {
      console.log(post.data.title);
      console.log(new Date(post.data.created * 1000));
    });
    expect(posts).toBeInstanceOf(Object);
  });

  test("Get getRisingPostsBySubreddit posts", async () => {
    const config = {
      apiKey: `${process.env.REDDIT_APIKEY}`,
      apiSecret: `${process.env.REDDIT_APISECRET}`,
      userAgent: `${process.env.USERAGENT}`,
    };
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: `${process.env.USERNAME}`, password: `${process.env.PASSWORD}` });
    const posts: IListingNewChildren[] = await myRedditClient.getRisingPostsBySubreddit("sideproject", 2, 2);
    posts.forEach((post) => {
      console.log(post.data.title);
      console.log(new Date(post.data.created * 1000));
    });
    expect(posts).toBeInstanceOf(Object);
  });
});
