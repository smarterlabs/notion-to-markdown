// import notion from 'notion-markdown'
import fetch from 'node-fetch'
 
// https://smarterlabs.notion.site/Simple-Page-Text-2-614911ed1cc148818c5c33968e9f8dd9


function normalizeId(id){
	if(!id) return id
	if(id.length === 36) return id // Already normalized
	return `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(16, 4)}-${id.substr(20)}`
}

function call(methodName, body){
	return new Promise(resolve => {
		fetch(`https://www.notion.so/api/v3/${methodName}`, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(json => resolve(json))
	})
}

async function getPage(id){
	id = normalizeId(id)
	console.log(`Getting page:`, id)

	const overview = await call("syncRecordValues", {
		requests: [
		  {
			 id,
			 table: "block",
			 version: -1,
		  },
		],
	}).catch(err => console.log(err))

	if(!overview.recordMap.block[id].value) {
		throw new Error("could not read Notion doc with this ID - make sure public access is enabled")
	}

	const contentIds = overview.recordMap.block[id].value.content
	if(!contentIds) {
		throw new Error("this doc has no content")
	}


	const contents = []
	let recordMap = {}
	let lastChunk
	let hasMorePageChunks = true
 
	while(hasMorePageChunks) {
	  const cursor = lastChunk && lastChunk.cursor || ({ stack: [] })
 
	  const chunk = await call("loadPageChunk", {
			pageId: id,
			limit: 100,
			cursor,
			chunkNumber: 0,
			verticalColumns: false
	  })
 
	  recordMap = { ...recordMap, ...chunk.recordMap.block }
 
	  lastChunk = chunk
 
	  if(chunk.cursor.stack.length === 0){
		hasMorePageChunks = false
	  }
	}
 
	for(let id of contentIds) {
		let block = recordMap[id]
		if(block) {
			block = block.value
			if(block.content){
				block.content = await getPage(block.id)
			}
			contents.push(block)
		}
	}

	
	return contents

}

getPage(`614911ed1cc148818c5c33968e9f8dd9`).then(contents => {
	console.log(`contents`, JSON.stringify(contents, null, 3))
}).catch(err => {
	console.error(err)
	process.exit(1)
})