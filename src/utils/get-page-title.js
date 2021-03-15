import defaultSettings from '@/settings'

const title = defaultSettings.title || '铁路运输管理'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
