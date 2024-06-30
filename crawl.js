import { JSDOM } from 'jsdom'

export function normalizeURL(url) {
    const urlObject = new URL(url)
    const pathname = urlObject.pathname
    const endsWithSlash = pathname.at(-1) === '/'

    return urlObject.host + (endsWithSlash ? pathname.slice(0, -1) : pathname)
}

export function getURLsFromHTML(htmlString, baseUrl) {
    const dom = new JSDOM(htmlString)
    const anchors = dom.window.document.querySelectorAll('a')
    const urls = []

    for (const a of anchors) {
        if (!a.hasAttribute('href')) {
            continue
        }

        const href = a.getAttribute('href')
        try {
            const urlObject = new URL(href, baseUrl)
            urls.push(urlObject.href)
        } catch(e) {
            console.log(e)
        }
    }

    return urls
}

async function fetchPage(url) {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`There was an error fetching the requested url: ${url}`)
    }
    if (!response.headers.get('content-type').includes('text/html')) {
        throw new Error(`The content is not text: ${url}`)
    }

    const text = await response.text()
    return text
}

export async function crawlPage(baseUrl, currentUrl = baseUrl, pages = {}) {
    const baseUrlObj = new URL(baseUrl)
    const currentUrlObj = new URL(currentUrl)
    if (baseUrlObj.hostname !== currentUrlObj.hostname) {
        return pages
    }

    const normalizedCurrentUrl = normalizeURL(currentUrl)
    if (normalizedCurrentUrl in pages) {
        pages[normalizedCurrentUrl] += 1
        return pages
    }
    pages[normalizedCurrentUrl] = 1
    
    let currentHtml
    try {
        currentHtml = await fetchPage(currentUrl)
    } catch (e) {
        console.log(e.message)
        return pages
    }
    
    const urls = getURLsFromHTML(currentHtml, currentUrl)
    urls.forEach(async url => {
        await crawlPage(baseUrl, url, pages)
    })

    return pages
}

