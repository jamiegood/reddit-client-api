import IClientOptions from "../interfaces/IClientOptions";
import IClientAuthOptions from "../interfaces/IClientAuthOptions";
import { IListingNew, IListingNewChildren } from "../interfaces/IListingNew";
import { IListings } from "../interfaces/IListings";
declare class RedditClient {
    accessToken: string;
    userAgent: string;
    authConfig: any;
    requestConfig: any;
    constructor(options: IClientOptions);
    setToken(token: string): void;
    setUserAgent(userAgent: string): void;
    auth(authOptions: IClientAuthOptions): Promise<this>;
    private listingRequestor;
    getNewPosts(limit?: number, depth?: number, afterParam?: string | null): Promise<IListingNewChildren[]>;
    getNewPostsBySubreddit(subreddit: string, limit?: number, depth?: number, afterParam?: string | null): Promise<IListingNewChildren[]>;
    getHotPosts(limit?: number, depth?: number, afterParam?: string | null): Promise<IListingNewChildren[]>;
    getHotPostsBySubreddit(subreddit: string, limit?: number, depth?: number, afterParam?: string | null): Promise<IListingNewChildren[]>;
    getRisingPosts(limit?: number, depth?: number, afterParam?: string | null): Promise<IListingNewChildren[]>;
    getRisingPostsBySubreddit(subreddit: string, limit?: number, depth?: number, afterParam?: string | null): Promise<IListingNewChildren[]>;
    getBest(limit?: number, depth?: number, afterParam?: string | null): Promise<IListingNewChildren[]>;
    getBestBySubreddit(subreddit: string, limit?: number, depth?: number, afterParam?: string | null): Promise<IListingNewChildren[]>;
    getPostComments(subbreddit: string, postID: string): Promise<IListingNew>;
    getPostDuplicate(postID: string): Promise<IListings[]>;
    getRandom(subreddit?: string): Promise<IListings[]>;
}
export default RedditClient;
