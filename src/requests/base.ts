import IClientOptions from "../interfaces/IClientOptions";

let credientials: IClientOptions;

export const setOptions = (options: IClientOptions) => {
  if (!credientials) {
    credientials = options;
  }
};

export const doGetRequest = (url: string): string => {

    
  return "abc";
};
