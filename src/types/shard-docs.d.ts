type inputData = {
  type: 'category' | 'page' | 'link';
  name: string;
  url?: string;
  external?: boolean;
  items?: content
  content?: unknown;
}[]

type categoryItem = {
  type: 'category';
  name: string | null;
  path: string;
  items: item[];
  isEmpty: boolean,
  isActive: boolean,
  depth: number
}

type pageItem = {
  type: 'page';
  name: string;
  path: string;
  content: string | React.ReactNode;
  breadcrumbs: breadcrumb[];
  isEmpty: boolean,
  isActive: boolean,
  depth: number
}

type linkItem = {
  type: 'link';
  name: string;
  url: string;
  external: boolean;
  depth: number
}

type item = (categoryItem | pageItem | linkItem)

type breadcrumb = {
  path: string,
  name: string,
  isActive: boolean
}

type paginationPage = {
  name: string,
  path: string
}
