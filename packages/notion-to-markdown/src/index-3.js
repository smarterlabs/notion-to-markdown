import fetch from 'node-fetch'
import get from 'lodash/get.js'
import fs from 'fs-extra'

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

async function getPageBlocks(id){
	id = normalizeId(id)

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
				block.content = await getPageBlocks(block.id)
			}
			contents.push(block)
		}
	}

	
	return contents

}

function indentLines(str){
	return str.split(`\n`).map(line => {
		if(!line) return ``
		return `\t` + line
	}).join(`\n`)
}

const group = [
	`numbered_list`,
	`bulleted_list`,
	`to_do`,
]

function formatText(block){
	const parts = get(block, `properties.title`, [])
	let mdStr = ``
	for(let part of parts){
		let [value, formatting] = part
		// Loop through formatting instructions
		formatting = (formatting || []).map(f => {
			const format = f[0]
			if(format === `b`){
				value = `**${value}**`
			}
			else if(format === `i`){
				value = `*${value}*`
			}
			else if(format === `u`){
				value = `_${value}_`
			}
			else if(format === `s`){
				value = `~~${value}~~`
			}
			else if(format === `c`){
				value = `\`${value}\``
			}
			else if(format === `a`){
				value = `[${value}](${f[1]})`
			}
		})
		mdStr += value
	}
	return mdStr
}

function blocksToMarkdown(blocks, previousBlockType){
	let str = ``

	for(let block of blocks){
		const { type } = block
		const text = formatText(block)

		if(previousBlockType !== type || group.indexOf(type) === -1){
			str += `\n\n`
		}
		else{
			str += `\n`
		}

		// Content types
		if(type === `numbered_list`){
			str += `1. ${text}`
		}
		else if(type === `bulleted_list`){
			str += `- ${text}`
		}
		else if(type === `to_do`){
			str += `- [ ] ${text}`
		}
		else if(type === `quote`){
			str += `> ${text}`
		}
		else if(type === `divider`){
			str += `___`
		}
		else if(type === `callout`){
			str += `:::note\n${text}\n:::`
		}
		else if(type === `text`){
			if(text){
				console.log(`text block`, JSON.stringify(block, null, 2))
			}
			str += text
		}
		else if(type === `header`){
			str += `# ${text}`
		}
		else if(type === `sub_header`){
			str += `## ${text}`
		}
		else if(type === `sub_sub_header`){
			str += `### ${text}`
		}
		else if(type === `equation`){
			str += `$$\n${text}\n$$`
		}
		else if(type === `toggle`){
			str += `- ${text}`
		}
		else if(type === `image`){
			const caption = get(block, `properties.caption`, ``)
			const source = get(block, `properties.source`, ``)
			str += `![${caption}](${source})`
		}
		else if(type === `code`){
			const language = get(block, `properties.language`, ``)
			str += `\`\`\`${language}\n${text}\n\`\`\``
		}
		else{
			console.log(`Unknown block type:`, type, JSON.stringify(block, null, 3))
		}


		if(block.content){
			let childrenMarkdown = blocksToMarkdown(block.content, type)
			str += indentLines(childrenMarkdown)
		}
		previousBlockType = type
	}
	
	// Compact multiple returns
	str = str.replace(/\n\n\n/g, `\n`)

	return str
}

async function pageToMarkdown(pageId){
	const blocks = await getPageBlocks(pageId)
	const markdown = blocksToMarkdown(blocks)

	await fs.outputFile(`output.md`, markdown)
	return markdown
}


pageToMarkdown(`614911ed1cc148818c5c33968e9f8dd9`).then(markdown => {
	console.log(`markdown`, markdown)
}).catch(err => {
	console.error(err)
	process.exit(1)
})