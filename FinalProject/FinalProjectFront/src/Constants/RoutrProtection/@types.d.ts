// FUNCTIONAL COMONENT

export type FC<T> = (props: T) => ReactNode;

export type FCP = FC<{ children: ReactNode }>;


export interface IPostSortingProps {
    icon: React.ComponentType<{ size: number }>;
    activeHook: boolean;
    type: "totalVotes" | "datetime" | "comments";
    tooltip: string;
  }
  
  export interface IPostOrderProps {
    icon: React.ComponentType<{ size: number }>;
    activeHook: boolean;
    type: "ascending" | "descending";
    tooltip: string;
  }
  
  export interface PostListValues {
    sortElement?: keyof IPostDisplay;
    orderBy?: string;
    posts: IPostDisplay[];
  }