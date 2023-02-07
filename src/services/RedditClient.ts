import axios from "axios";

import IClientOptions from "../interfaces/IClientOptions";
import IClientAuthOptions from "../interfaces/IClientAuthOptions";
import { IListingNew, IListingNewChildren } from "../interfaces/IListingNew";

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
      const response = await axios(this.authConfig);

      this.setToken(response.data.access_token);
      this.requestConfig.headers.Authorization = `Bearer ${this.accessToken}`;

      return this;
    } catch (error) {
      console.log(error);
      throw Error("Reddit auth call failed.");
    }
  }
  public async getNewPosts(subreddit: string, limit: number = 25, depth: number = 10, afterParam?: string | null): Promise<IListingNewChildren[]> {
    if (!this.accessToken) {
      throw Error("Unable to make request. Authentication has not been established");
    }

    console.log(`DEPTH:: ${depth}`);

    const newDepth = depth - 1;
    try {
      const response = await axios.get<IListingNew>(`https://oauth.reddit.com/r/${subreddit}/new/?after=${afterParam}&limit=${limit}`, this.requestConfig);
      const parsedPosts = response.data.data.children as IListingNewChildren[];
      afterParam = response.data.data.after;

      if (afterParam && newDepth > 0) {
        const additionalPosts = await this.getNewPosts(subreddit, limit, newDepth, afterParam);
        return [...parsedPosts, ...additionalPosts];
      }
      return parsedPosts;
    } catch (error) {
      console.log(error);
      throw Error("getNewPosts error");
    }
  }

  public async getHotPosts(subreddit: string, limit: number = 25, depth: number = 10, afterParam?: string | null): Promise<IListingNewChildren[]> {
    if (!this.accessToken) {
      throw Error("Unable to make request. Authentication has not been established");
    }

    console.log(`DEPTH:: ${depth}`);

    const newDepth = depth - 1;
    try {
      const response = await axios.get<IListingNew>(`https://oauth.reddit.com/r/${subreddit}/hot/?after=${afterParam}&limit=${limit}`, this.requestConfig);
      const parsedPosts = response.data.data.children as IListingNewChildren[];
      afterParam = response.data.data.after;

      if (afterParam && newDepth > 0) {
        const additionalPosts = await this.getNewPosts(subreddit, limit, newDepth, afterParam);
        return [...parsedPosts, ...additionalPosts];
      }
      return parsedPosts;
    } catch (error) {
      console.log(error);
      throw Error("getNewPosts error");
    }
  }

  public async getRisingPosts(subreddit: string, limit: number = 25, depth: number = 10, afterParam?: string | null): Promise<IListingNewChildren[]> {
    if (!this.accessToken) {
      throw Error("Unable to make request. Authentication has not been established");
    }

    console.log(`DEPTH:: ${depth}`);

    const newDepth = depth - 1;
    try {
      const response = await axios.get<IListingNew>(`https://oauth.reddit.com/r/${subreddit}/rising/?after=${afterParam}&limit=${limit}`, this.requestConfig);
      const parsedPosts = response.data.data.children as IListingNewChildren[];
      afterParam = response.data.data.after;

      if (afterParam && newDepth > 0) {
        const additionalPosts = await this.getNewPosts(subreddit, limit, newDepth, afterParam);
        return [...parsedPosts, ...additionalPosts];
      }
      return parsedPosts;
    } catch (error) {
      console.log(error);
      throw Error("getNewPosts error");
    }
  }

  public async getPostComments(subbreddit: string, postID: string): Promise<IListingNew> {
    try {
      const response = await axios.get(`https://oauth.reddit.com/r/${subbreddit}/comments/${postID}`, this.requestConfig);
      return response.data as IListingNew;
    } catch (error) {
      console.log(error);
      throw Error("getNewPosts error");
    }
  }
}

export default RedditClient;
