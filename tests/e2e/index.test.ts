import * as dotenv from "dotenv";
dotenv.config();

import RedditClient from "../../src/index";
import { IListings } from "../../src/interfaces/IListings";

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

  test("Get getRandomBySubreddit", async () => {
    const config = {
      apiKey: `${process.env.REDDIT_APIKEY}`,
      apiSecret: `${process.env.REDDIT_APISECRET}`,
      userAgent: `${process.env.USERAGENT}`,
    };
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: `${process.env.USERNAME}`, password: `${process.env.PASSWORD}` });
    const listingsSub: IListings[] = await myRedditClient.getRandom("sideproject");
    listingsSub.forEach((listing) => {
      console.log(listing.kind);

      listing.data.children.forEach((post) => {
        console.log(post.data.title);
      });
    });
    expect(listingsSub).toBeInstanceOf(Object);

    const listings: IListings[] = await myRedditClient.getRandom();
    listings.forEach((listing) => {
      console.log(listing.kind);

      listing.data.children.forEach((post) => {
        console.log(post.data.title);
      });
    });
    expect(listings).toBeInstanceOf(Object);
  });

  test("Get Duplicate Posts", async () => {
    const config = {
      apiKey: `${process.env.REDDIT_APIKEY}`,
      apiSecret: `${process.env.REDDIT_APISECRET}`,
      userAgent: `${process.env.USERAGENT}`,
    };
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: `${process.env.USERNAME}`, password: `${process.env.PASSWORD}` });
    const listings: IListings[] = await myRedditClient.getPostDuplicate("113m7lh");
    listings.forEach((listing) => {
      console.log(listing.kind);

      listing.data.children.forEach((post) => {
        console.log(post.data.title);
      });
    });
    expect(listings).toBeInstanceOf(Object);
  });
});
