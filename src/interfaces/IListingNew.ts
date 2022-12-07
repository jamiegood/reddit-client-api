interface IListingNew {
  kind: string;
  data: {
    after: string;
    dist: number;
    children: Array<IListingNewChildren>;
  };
  created_at: string;
  id: number;
  id_str: string;
  name: string;
  position?: any;
  query: string;
}

interface IListingNewChildren {
  kind: string;
  data: IListingNewChildrenData;
}

interface IListingNewChildrenData {
  subreddit: string;
  title: string;
  name: string;
  created: number;
  selftext: string;
}

export { IListingNew, IListingNewChildren, IListingNewChildrenData };
