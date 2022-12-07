import RedditClient from "../../src/index";

describe("testing new RedditClient returns an object of type RedditClient", () => {
  test("new RedditClient object should instance of RedditClient", () => {
    const config = {
      apiKey: "123",
      apiSecret: "456",
      userAgent: "ChangeMeClient/0.2",
    };
    const myRedditClient = new RedditClient(config);

    expect(myRedditClient).toBeInstanceOf(RedditClient);
  });
});
