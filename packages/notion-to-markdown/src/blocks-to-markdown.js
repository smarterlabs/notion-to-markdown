import get from 'lodash/get.js'
import indentLines from './indent-lines.js'
import formatText from './format-text.js'
import urlencode from "urlencode"


const group = [
	`numbered_list`,
	`bulleted_list`,
	`to_do`,
]
export default async function blocksToMarkdown(blocks, origin, previousBlockType){
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
			// console.log(`image block`, JSON.stringify(block, null, 3))
			const caption = get(block, `properties.caption`, ``)
			let source = get(block, `properties.source`, ``)

			// URL from API is private, so we need to recreate the public URL
			const format = block.format || {}
			const info = format.copied_from_pointer || {}
			let publicSource = `https://${origin}/image/${urlencode(source)}?table=${info.table}&id=${block.id}&spaceId=${info.spaceId}`

			const w = format.block_width
			const h = format.block_height
			const style = {
				marginLeft: `auto`,
				marginRight: `auto`,
				width: w,
				height: h,
				maxWidth: `100%`,
			}
			str += `<p style={${JSON.stringify(style)}}><img src="${publicSource}" alt="${caption}" /></p>
			`
			// str += `![${caption}](${publicSource})`
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
			let childrenMarkdown = await blocksToMarkdown(block.content, origin, type)
			str += indentLines(childrenMarkdown)
		}
		previousBlockType = type
	}
	
	// Compact multiple returns
	str = str.replace(/\n\n\n/g, `\n`).trim()

	return str
}