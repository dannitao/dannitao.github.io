// Content item type for the data structures
export interface ContentItem {
  id: string;
  title: string;
  category: string[];
  img: string;
  date?: string;
}

// Categories type
export type CategoriesType = {
  [key: string]: string;
};

// React props types
export interface ButtonsProps {
  filterItem: (category: string) => void;
  togglePhotos: () => void;
  setItems: Array<(data: ContentItem[]) => void>;
  categories: string[];
}

export interface CardsProps {
  item: ContentItem[];
  pics: boolean;
}

export interface FilterProps {}

export interface HeaderProps {}

export interface AppProps {}
