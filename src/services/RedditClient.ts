import axios from "axios";

import IClientOptions from "../interfaces/IClientOptions";
import IClientAuthOptions from "../interfaces/IClientAuthOptions";
import { IListingNew, IListingNewChildren } from "../interfaces/IListingNew";
import { setuid } from "process";
interface IListingRequestor {
  subreddit: string | null;
  listType: string;
  limit: number;
  depth: number;
  afterParam?: string | null;
}

const BASE_URL = "https://oauth.reddit.com/";
class RedditClient {
  accessToken: string = "";
  userAgent: string = "";

  authConfig: any = {
    method: "post",
    url: "https://www.reddit.com/api/v1/access_token",
    headers: {
      "User-Agent": this.userAgent,
    },
    auth: {
      username: "",
      password: "",
    },
    data: {},
  };

  requestConfig: any = {
    headers: {
      "User-Agent": this.userAgent,
      Authorization: "",
    },
  };

  constructor(options: IClientOptions) {
    if (!options.apiKey) {
      throw Error("API Key need to be provided");
    }

    if (!options.apiSecret) {
      throw Error("API Secret needs to be provided");
    }

    if (!options.userAgent) {
      throw Error("User Agent needs to be provided");
    }

    this.authConfig.auth = {
      username: options.apiKey,
      password: options.apiSecret,
    };

    this.setUserAgent(options.userAgent);
  }

  setToken(token: string) {
    this.accessToken = token;
  }
  setUserAgent(userAgent: string) {
    this.authConfig.headers["User-Agent"] = userAgent;
    this.requestConfig.headers["User-Agent"] = userAgent;
  }

  public async auth(authOptions: IClientAuthOptions): Promise<this> {
    this.authConfig.params = {
      grant_type: "password",
      username: authOptions.username,
      password: authOptions.password,
    };
    try {
      const response = await axios.request(this.authConfig);

      this.setToken(response.data.access_token);
      this.requestConfig.headers.Authorization = `Bearer ${this.accessToken}`;

      return this;
    } catch (error) {
      console.log(error);
      throw Error("Reddit auth call failed.");
    }
  }

  private async listingRequestor(listingRequest: IListingRequestor): Promise<IListingNewChildren[]> {
    let { subreddit, listType, limit, depth, afterParam } = listingRequest;
    const url = `${BASE_URL}${subreddit}${listType}/?after=${afterParam}&limit=${limit}`;
    const newDepth = depth - 1;
    try {
      const response = await axios.get<IListingNew>(`${url}`, this.requestConfig);
      const parsedPosts = response.data.data.children as IListingNewChildren[];
      afterParam = response.data.data.after;

      if (afterParam && newDepth > 0) {
        const additionalPosts = await this.listingRequestor({ subreddit: subreddit, listType: listType, limit: limit, depth: newDepth, afterParam: afterParam });
        return [...parsedPosts, ...additionalPosts];
      }
      return parsedPosts;
    } catch (error) {
      console.log(error);
      throw Error("listingRequestor error");
    }
  }
  public async getNewPosts(limit: number = 25, depth: number = 10, afterParam?: string | null): Promise<IListingNewChildren[]> {
    if (!this.accessToken) {
      throw Error("Unable to make request. Authentication has not been established");
    }

    const listingRequest = {
      subreddit: "",
      listType: "new",
      limit: limit,
      depth: depth,
      afterParam: afterParam || "",
    };

    try {
      const posts: IListingNewChildren[] = await this.listingRequestor(listingRequest);
      return posts;
    } catch (error) {
      console.log(error);
      throw Error("getNewPostsBySubreddit error");
    }
  }

  public async getNewPostsBySubreddit(subreddit: string, limit: number = 25, depth: number = 10, afterParam?: string | null): Promise<IListingNewChildren[]> {
    if (!this.accessToken) {
      throw Error("Unable to make request. Authentication has not been established");
    }

    const listingRequest = {
      subreddit: subreddit ? `r/${subreddit}/` : "",
      listType: "new",
      limit: limit,
      depth: depth,
      afterParam: afterParam || "",
    };

    try {
      const posts: IListingNewChildren[] = await this.listingRequestor(listingRequest);
      return posts;
    } catch (error) {
      console.log(error);
      throw Error("getNewPostsBySubreddit error");
    }
  }

  public async getHotPosts(limit: number = 25, depth: number = 10, afterParam?: string | null): Promise<IListingNewChildren[]> {
    if (!this.accessToken) {
      throw Error("Unable to make request. Authentication has not been established");
    }

    const listingRequest = {
      subreddit: "",
      listType: "hot",
      limit: limit,
      depth: depth,
      afterParam: afterParam || "",
    };

    try {
      const posts: IListingNewChildren[] = await this.listingRequestor(listingRequest);
      return posts;
    } catch (error) {
      console.log(error);
      throw Error("getNewPostsBySubreddit error");
    }
  }

  public async getHotPostsBySubreddit(subreddit: string, limit: number = 25, depth: number = 10, afterParam?: string | null): Promise<IListingNewChildren[]> {
    if (!this.accessToken) {
      throw Error("Unable to make request. Authentication has not been established");
    }

    const listingRequest = {
      subreddit: subreddit ? `r/${subreddit}/` : "",
      listType: "hot",
      limit: limit,
      depth: depth,
      afterParam: afterParam || "",
    };

    try {
      const posts: IListingNewChildren[] = await this.listingRequestor(listingRequest);
      return posts;
    } catch (error) {
      console.log(error);
      throw Error("getNewPostsBySubreddit error");
    }
  }

  public async getRisingPosts(limit: number = 25, depth: number = 10, afterParam?: string | null): Promise<IListingNewChildren[]> {
    if (!this.accessToken) {
      throw Error("Unable to make request. Authentication has not been established");
    }

    const listingRequest = {
      subreddit: "",
      listType: "rising",
      limit: limit,
      depth: depth,
      afterParam: afterParam || "",
    };

    try {
      const posts: IListingNewChildren[] = await this.listingRequestor(listingRequest);
      return posts;
    } catch (error) {
      console.log(error);
      throw Error("getNewPostsBySubreddit error");
    }
  }

  public async getRisingPostsBySubreddit(subreddit: string, limit: number = 25, depth: number = 10, afterParam?: string | null): Promise<IListingNewChildren[]> {
    if (!this.accessToken) {
      throw Error("Unable to make request. Authentication has not been established");
    }

    const listingRequest = {
      subreddit: subreddit ? `r/${subreddit}/` : "",
      listType: "rising",
      limit: limit,
      depth: depth,
      afterParam: afterParam || "",
    };

    try {
      const posts: IListingNewChildren[] = await this.listingRequestor(listingRequest);
      return posts;
    } catch (error) {
      console.log(error);
      throw Error("getNewPostsBySubreddit error");
    }
  }

  public async getBest(limit: number = 25, depth: number = 10, afterParam?: string | null): Promise<IListingNewChildren[]> {
    if (!this.accessToken) {
      throw Error("Unable to make request. Authentication has not been established");
    }
    const listingRequest = {
      subreddit: "",
      listType: "best",
      limit: limit,
      depth: depth,
      afterParam: afterParam || "",
    };

    try {
      const posts: IListingNewChildren[] = await this.listingRequestor(listingRequest);
      return posts;
    } catch (error) {
      console.log(error);
      throw Error("getBest error");
    }
  }

  public async getBestBySubreddit(subreddit: string, limit: number = 25, depth: number = 10, afterParam?: string | null): Promise<IListingNewChildren[]> {
    if (!this.accessToken) {
      throw Error("Unable to make request. Authentication has not been established");
    }
    const listingRequest = {
      subreddit: subreddit ? `r/${subreddit}/` : "",
      listType: "best",
      limit: limit,
      depth: depth,
      afterParam: afterParam || "",
    };

    try {
      const posts: IListingNewChildren[] = await this.listingRequestor(listingRequest);
      return posts;
    } catch (error) {
      console.log(error);
      throw Error("getBestBySubreddit error");
    }
  }

  public async getPostComments(subbreddit: string, postID: string): Promise<IListingNew> {
    try {
      const response = await axios.get(`${BASE_URL}/r/${subbreddit}/comments/${postID}`, this.requestConfig);
      return response.data as IListingNew;
    } catch (error) {
      console.log(error);
      throw Error("getNewPosts error");
    }
  }
}

export default RedditClient;
