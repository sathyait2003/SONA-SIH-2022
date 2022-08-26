import MeiliSearch from "meilisearch";

async function saveToMeilisearch(index: string, data: any[]) {
    const client = new MeiliSearch({
        host: process.env.MEILI_URL || '',
        apiKey: process.env.MEILI_KEY || ''
    })
    //client.index('cases').updateFilterableAttributes(['category'])
    for(var i = 0; i < data.length; i++) {
        let temp = await client.index(index).addDocuments(data[i])
        console.log(temp.status, temp.taskUid)
    }
}

export {saveToMeilisearch}