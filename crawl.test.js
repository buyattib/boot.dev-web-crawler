import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from './crawl.js'


// url normalization ----------------
const urlInputs = [
    'https://blog.boot.dev/path/',
    'https://blog.boot.dev/path',
    'http://blog.boot.dev/path/',
    'http://blog.boot.dev/path',
    'http://blog.boot.dev/path?q=1&a=2',
    'http://blog.boot.dev/path/?q=1&a=2',
    'http://BlOg.boot.dev/path',
]
const normalizedUrl = 'blog.boot.dev/path'

for (let url of urlInputs) {
    test(`normalize URL ${url} to be ${normalizedUrl}`, () => {
        expect(normalizeURL(url)).toEqual(normalizedUrl)
    });
}

// urls from html ----------------

const htmlBody = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>

        <a href="/relative"><span>Go to Boot.dev/relative</span></a>
        <a><span>Go to</span></a>
    </body>
</html>`
const baseUrl = 'https://blog.boot.dev'
const foundUrls = [
    'https://blog.boot.dev/',
    'https://blog.boot.dev/relative',
]

test('Get all the urls from html', () => {
    expect(getURLsFromHTML(htmlBody, baseUrl)).toEqual(foundUrls)
})
