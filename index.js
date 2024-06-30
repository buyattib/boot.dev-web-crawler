import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main() {
    const inputs = process.argv

    if (inputs.length < 3) {
        console.log("Url to crawl is needed")
        return
    }

    if (inputs.length > 3) {
        console.log("Only one url to crawl is needed")
        return
    }

    const baseUrl = inputs[2]
    console.log(`Crawling started on BASE URL: ${baseUrl}`)

    const pages = await crawlPage(baseUrl)

    printReport(pages) 
}

main()
