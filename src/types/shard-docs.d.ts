type paginationPage = {
  name: string,
  path: string
}

type tree = (contentItemCategory | contentItemDocument | contentItemLink)[]

interface baseContentItem {
  type: 'category' | 'document' | 'link';
  name: string;
  url?: string;
  external?: boolean;
  items?: baseContentItem[]
  document?: unknown;
}

type breadcrumb = {
  path: string,
  name: string,
  isActive: boolean
}

type contentItemCategory = {
  type: 'category';
  name: string | null;
  path: string;
  items: (contentItemCategory | contentItemDocument | contentItemLink)[];
  isEmpty: boolean,
  isActive: boolean,
  depth: number
}

type contentItemDocument = {
  type: 'document';
  name: string;
  path: string;
  document: string | React.ReactNode;
  breadcrumbs: breadcrumb[];
  isEmpty: boolean,
  isActive: boolean,
  depth: number
}

type contentItemLink = {
  type: 'link';
  name: string;
  url: string;
  external: boolean;
  depth: number
}