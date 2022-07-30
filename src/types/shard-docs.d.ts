type inputItem = {
  name: string;
  content: string | inputItem[] | React.ReactNode;
}

type inputData = inputItem[]

type category = {
  type: 'category';
  name: string | null;
  path: string;
  items: data;
  isEmpty: boolean,
  isActive: boolean,
  depth: number
}

type page = {
  type: 'page';
  name: string;
  path: string;
  content: string | React.ReactNode;
  breadcrumbs: breadcrumb[];
  isEmpty: boolean,
  isActive: boolean,
  depth: number
}

type link = {
  type: 'link';
  name: string;
  url: string;
  external: boolean;
  depth: number
}

type item = (category | page | link)

type data = item[]

type breadcrumb = {
  path: string,
  name: string,
  isActive: boolean
}

type paginationPage = {
  name: string,
  path: string
}
