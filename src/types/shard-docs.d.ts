type inputItem = {
  name: string
  content: string | inputItem[] | React.ReactNode
}

type inputData = inputItem[]

type category = {
  type: 'category'
  name: string
  path: string
  items: data
  isEmpty: boolean
  isActive: boolean
  isExpanded: boolean
}

type page = {
  type: 'page'
  name: string
  path: string
  content: string | React.ReactNode
  isEmpty: boolean
  isActive: boolean
}

type link = {
  type: 'link'
  name: string
  url: string
  isExternal: boolean
}

type item = category | page | link

type data = item[]

type paginationPage = {
  name: string
  path: string
}
