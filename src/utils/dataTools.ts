import slugify from 'slugify'
import kebabCase from 'lodash/kebabCase'
import React from 'react'
import sessionDB from '../utils/sessionDB'

const getSlug = (name: string) => slugify(kebabCase(name), { lower: true })
const removeDuplicateSlashes = (path: string) => path.replace(/\/+$/, '').replace(/\/+/g, '/')
const isInternalLink = (text: string) => new RegExp('^/.+').test(text)
const isExternalLink = (text: string) => new RegExp('^https?://.+').test(text)

const getInputType = (item: inputItem): 'category' | 'page' | 'link' | null => {
  if (!item.name) return null
  else if (Array.isArray(item.content)) return 'category'
  else if (
    typeof item.content === 'string' &&
    (isInternalLink(item.content) || isExternalLink(item.content))
  )
    return 'link'
  else if (React.isValidElement(item.content) || item.content === null) return 'page'
  return null
}

/**
 * Parse all user defined content and return a structured array.
 * @param items
 * @param basePath
 * @returns
 */
function parse(items: inputData, basePath: string = '/'): data {
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
        items: parse(content, path),
        isActive: false,
        isExpanded: sessionDB.get(path, false),
      } as category)
    } else if (inputType === 'page') {
      output.push({
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
        isExternal: isExternalLink(item.content as string),
      } as link)
    }
  }

  return output
}

/**
 * Loops through each item, child and grandchild grabbing each page.
 * @param  {array} source Expects source array to have been fed through addTypes..
 * @return {array} returns all pages in an array
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

function getCurrentPage(pages: page[], path: string): page | null {
  return pages.find((page) => page.path === path) || null
}

function getPrevPage(pages: page[], currentPath: string): page | null {
  const activeIndex = pages.findIndex((document: page) => document.path === currentPath)
  return pages[activeIndex - 1] ? pages[activeIndex - 1] : null
}

function getNextPage(pages: page[], currentPath: string): page | null {
  const activeIndex = pages.findIndex((document: page) => document.path === currentPath)
  return pages[activeIndex + 1] ? pages[activeIndex + 1] : null
}

/**
 * Return pages that are equal too or descendants of path.
 * @param  {array} pages fed in from adapters/contentTool()
 * @param  {string} path current url
 * @return {array}
 */
function filterPages(pages: page[] = [], path = '') {
  return pages.filter((page) => page.path.startsWith(path))
}

/**
 * Compare a path to each path in page / category items and set boolean result on isActive prop.
 * @param  {array} items fed in from adapters/contentTool()
 * @param  {string} currentPath current url
 * @return {array}
 */
function setActiveMenuItem(items: data = [], currentPath = '') {
  return items.map((item) => {
    if (item.type === 'category') {
      item.items = setActiveMenuItem(item.items, currentPath)
    }
    if (item.type === 'category' || item.type === 'page') {
      item.isActive = item.path === currentPath
    }
    return item
  })
}
function toggleMenu(data: data, path: string) {
  return data.map((item) => {
    if (item.type === 'category' && item.path === path) {
      sessionDB.set(item.path, !item.isExpanded)
      return { ...item, isExpanded: !item.isExpanded }
    } else if (item.type === 'category') {
      item.items = toggleMenu(item.items, path)
    }
    return item
  })
}

export const isActive = (itemPath: string, currentPath: string): boolean => {
  return itemPath === currentPath || currentPath.startsWith(itemPath)
}

export default {
  parse,
  getPages,
  getCurrentPage,
  getPrevPage,
  getNextPage,
  filterPages,
  setActiveMenuItem,
  toggleMenu,
  isActive,
}
