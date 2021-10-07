import normalizeId from './normalize-id.js'
import call from './call.js'

export default async function getPageBlocks(id){
	id = normalizeId(id)

	const overview = await call(`syncRecordValues`, {
		requests: [
			{
				id,
				table: `block`,
				version: -1,
			},
		],
	}).catch(err => console.log(err))

	if(!overview.recordMap.block[id].value) {
		throw new Error(`could not read Notion doc with this ID - make sure public access is enabled`)
	}

	const contentIds = overview.recordMap.block[id].value.content
	if(!contentIds) {
		throw new Error(`this doc has no content`)
	}


	const contents = []
	let recordMap = {}
	let lastChunk
	let hasMorePageChunks = true
 
	while(hasMorePageChunks) {
		const cursor = lastChunk && lastChunk.cursor || ({ stack: [] })

		const chunk = await call(`loadPageChunk`, {
			pageId: id,
			limit: 100,
			cursor,
			chunkNumber: 0,
			verticalColumns: false,
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
				block.content = await getPageBlocks(block.id)
			}
			contents.push(block)
		}
	}

	
	return contents

}