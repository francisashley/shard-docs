import slugify from 'slugify'
import kebabCase from 'lodash/kebabCase'
import React from 'react'
import sessionDB from '../utils/sessionDB'

// Helpers
const getSlug = (name: string) => slugify(kebabCase(name), { lower: true })
const removeDuplicateSlashes = (path: string) => path.replace(/\/+$/, '').replace(/\/+/g, '/')
const isInternalLink = (text: string) => new RegExp('^/.+').test(text)
const isExternalLink = (text: string) => new RegExp('^https?://.+').test(text)
const isLink = (text: string) => isExternalLink(text) || isInternalLink(text)

/**
 * Identify the type of input item.
 */
function getInputType(item: inputItem): 'category' | 'page' | 'link' | null {
  if (!item.name) return null
  else if (Array.isArray(item.content)) return 'category'
  else if (typeof item.content === 'string' && isLink(item.content)) return 'link'
  else if (React.isValidElement(item.content) || item.content === null) return 'page'
  return null
}

/**
 * Parse all input data.
 */
function parse(items: inputData, basePath: string = '/', pageId: number = 0): data {
  const output = []

  for (const item of items) {
    const inputType = getInputType(item)
    const path = removeDuplicateSlashes(`${basePath}/${getSlug(item.name || '')}`)

    if (inputType === 'category') {
      const content = (item.content || []) as inputData
      output.push({
        type: 'category',
        name: item.name,
        path,
        items: parse(content, path, pageId++),
        isActive: false,
        isExpanded: false,
      } as category)
    } else if (inputType === 'page') {
      output.push({
        pageId: pageId++,
        type: 'page',
        name: item.name,
        path,
        content: item.content,
        isActive: false,
      } as page)
    } else if (inputType === 'link') {
      output.push({
        type: 'link',
        name: item.name,
        url: item.content,
        isExternal: false,
      } as link)
    }
  }

  return output
}

/**
 * Update states related to the current page.
 */
function updatePathStates(items: data, basePath: string = '/', currentPath: string = ''): data {
  const isActive = (
    itemPath: string,
    basePath: string,
    currentPath: string,
    pageId?: number
  ): boolean => {
    if (pageId === 0 && basePath === currentPath) return true
    return itemPath === currentPath || currentPath.startsWith(itemPath)
  }
  return items.map((item) => {
    if (item.type === 'category') {
      return {
        ...item,
        items: updatePathStates(item.items, basePath, currentPath),
        isActive: isActive(item.path, basePath, currentPath),
        isExpanded: sessionDB.get(item.path, false),
      }
    } else if (item.type === 'page') {
      return {
        ...item,
        isActive: isActive(item.path, basePath, currentPath, item.pageId),
      }
    } else if (item.type === 'link') {
      return {
        ...item,
        isExternal: isExternalLink(item.url),
      }
    }
    return item
  })
}

/**
 * Toggle a category's expand/collapse state.
 */
function toggleMenuExpandedState(data: data, path: string) {
  return data.map((item) => {
    if (item.type === 'category' && item.path === path) {
      sessionDB.set(item.path, !item.isExpanded)
      return { ...item, isExpanded: !item.isExpanded }
    } else if (item.type === 'category') {
      item.items = toggleMenuExpandedState(item.items, path)
    }
    return item
  })
}

/**
 * Return all the pages in a flattened array.
 */
function getPages(items: data, accumulator: page[] = []) {
  for (const item of items) {
    if (item.type === 'category') {
      accumulator = getPages(item.items || [], accumulator)
    } else if (item.type === 'page') {
      accumulator = [...accumulator, item]
    }
  }
  return accumulator
}

/**
 * Get the current page.
 */
function getCurrentPage(pages: page[], path: string = '', basePath: string = '/'): page | null {
  if (path === basePath) return pages[0]
  return pages.find((page) => page.path === path) || null
}

/**
 * Get the prev page.
 */
function getPrevPage(pages: page[], currentPath: string = ''): page | null {
  const activeIndex = pages.findIndex((document: page) => document.path === currentPath)
  return pages[activeIndex - 1] ? pages[activeIndex - 1] : null
}

/**
 * get the next page.
 */
function getNextPage(pages: page[], currentPath: string = '', basePath: string = ''): page | null {
  if (currentPath === basePath) return pages[1] || null

  const activeIndex = pages.findIndex((document: page) => document.path === currentPath)
  return pages[activeIndex + 1] ? pages[activeIndex + 1] : null
}

export default {
  parse,
  updatePathStates,
  toggleMenuExpandedState,
  getPages,
  getCurrentPage,
  getPrevPage,
  getNextPage,
}
