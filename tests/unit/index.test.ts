import RedditClient from "../../src/index";
import axios from "axios";
import { IListingNewChildren } from "../../src/interfaces/IListingNew";
import { IListings } from "../../src/interfaces/IListings";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const config = {
  apiKey: "123",
  apiSecret: "456",
  userAgent: "ChangeMeClient/0.2",
};

describe("RedditClient service", () => {
  test("new RedditClient object should instance of RedditClient", () => {
    const myRedditClient = new RedditClient(config);

    expect(myRedditClient).toBeInstanceOf(RedditClient);
  });

  test("RedditClient.auth() to call axios", async () => {
    const authResponse = {
      data: {
        access_token: "123",
      },
    };

    mockedAxios.request.mockResolvedValueOnce(authResponse);

    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: "test", password: "testing" });

    expect(mockedAxios.request).toHaveBeenCalled();
  });

  test("/api/subreddit/new should return object with children array empty", async () => {
    const authResponse = {
      data: {
        access_token: "123",
      },
    };

    mockedAxios.request.mockResolvedValueOnce(authResponse);
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: "test", password: "testing" });

    mockedAxios.get.mockResolvedValueOnce({ data: { data: { children: [] } } });
    const posts: IListingNewChildren[] = await myRedditClient.getNewPostsBySubreddit("sideproject", 25, 1);

    expect(posts).toHaveLength(0);
  });

  test("/api/new should return object with children array empty", async () => {
    const authResponse = {
      data: {
        access_token: "123",
      },
    };

    mockedAxios.request.mockResolvedValueOnce(authResponse);
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: "test", password: "testing" });

    mockedAxios.get.mockResolvedValueOnce({ data: { data: { children: [] } } });
    const posts: IListingNewChildren[] = await myRedditClient.getNewPosts(25, 1);

    expect(posts).toHaveLength(0);
  });

  test("/getRandom should return object with children array empty", async () => {
    const authResponse = {
      data: {
        access_token: "123",
      },
    };

    mockedAxios.request.mockResolvedValueOnce(authResponse);
    const myRedditClient = new RedditClient(config);
    await myRedditClient.auth({ username: "test", password: "testing" });

    const arrayResponse = { data: [{ data: { children: [] } }] };
    mockedAxios.get.mockResolvedValueOnce(arrayResponse);
    const listingsBySub: IListings[] = await myRedditClient.getRandom("sideproject");
    expect(listingsBySub).toHaveLength(1);
  });
});
