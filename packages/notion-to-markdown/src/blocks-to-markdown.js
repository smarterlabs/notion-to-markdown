import get from 'lodash/get.js'
import indentLines from './indent-lines.js'
import formatText from './format-text.js'

const group = [
	`numbered_list`,
	`bulleted_list`,
	`to_do`,
]
export default function blocksToMarkdown(blocks, previousBlockType){
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
			// if(text){
			// 	console.log(`text block`, JSON.stringify(block, null, 2))
			// }
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
		// Ignore pages
		else if(type === `page`){
			str += `\n`
		}
		else{
			console.log(`Unknown block type:`, type, JSON.stringify(block, null, 3))
		}


		if(block.content && type !== `page`){
			let childrenMarkdown = blocksToMarkdown(block.content, type)
			str += indentLines(childrenMarkdown)
		}
		previousBlockType = type
	}
	
	// Compact multiple returns
	str = str.replace(/\n\n\n/g, `\n`).trim()

	return str
}