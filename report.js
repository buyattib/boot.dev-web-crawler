export function printReport(pages) {
    console.log('Starting report...')
    
    const sorted = Object.entries(pages).sort((a,b) => {
        if (a[1] === b[1]) {
            return a[0].localeCompare(b[0])
        }
        return b[1] - a[1]
    })

    sorted.forEach(elem => {
        console.log(`Found ${elem[1]} internal links to ${elem[0]}`)
    })

}
