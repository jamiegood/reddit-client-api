import * as dotenv from "dotenv";
dotenv.config();

import RedditClient from "../../src/index";

import { IListingNewChildren } from "../../src/interfaces/IListingNew";

describe("testing E2E RedditClient. This calls the Reddit API", () => {
  test("Create new RedditClient and get Subbreddit posts", async () => {
    const config = {
      apiKey: `${process.env.REDDIT_APIKEY}`,
      apiSecret: `${process.env.REDDIT_APISECRET}`,
      userAgent: `${process.env.USERAGENT}`,
    };
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: `${process.env.USERNAME}`, password: `${process.env.PASSWORD}` });
    const posts: IListingNewChildren[] = await myRedditClient.getNewPosts("sideproject");

    posts.forEach((post) => {
      console.log(post.data.title);
      console.log(new Date(post.data.created * 1000));
    });
    expect(posts).toBeInstanceOf(Object);
  });
});
