import IClientOptions from "../interfaces/IClientOptions";
import IClientAuthOptions from "../interfaces/IClientAuthOptions";
import { IListingNew, IListingNewChildren } from "../interfaces/IListingNew";
declare class RedditClient {
    accessToken: string;
    userAgent: string;
    authConfig: any;
    requestConfig: any;
    constructor(options: IClientOptions);
    setToken(token: string): void;
    setUserAgent(userAgent: string): void;
    auth(authOptions: IClientAuthOptions): Promise<this>;
    getNewPosts(subreddit: string, afterParam?: string | null, depth?: number): Promise<IListingNewChildren[]>;
    getPostComments(subbreddit: string, postID: string): Promise<IListingNew>;
}
export default RedditClient;
