import get from 'lodash/get.js'
import getPageBlocks from './get-page-blocks.js'
import blocksToMarkdown from './blocks-to-markdown.js'
import slugify from 'slug'

function parseBlocks(blocks, markdown = [], pageIds = [], structure = {}, depth = []) {
	for(let block of blocks){
		if(block.type == `page` && !pageIds.includes(block.id)){
			console.log(`page block`, JSON.stringify(block, null, 2))
			pageIds.push(block.id)
			const title = get(block, `properties.title[0][0]`)
			const slug = slugify(title)
			const dir = depth.length ? depth.join(`/`) : ``
			const path = `/${dir}/${slug}`
			structure[block.id] = {
				title,
				slug,
				dir,
				path,
				blocks: {},
			}
			markdown.push({
				title,
				slug,
				dir,
				path,
				markdown: blocksToMarkdown(block.content),
			})
			if(block.content){
				const currentDepth = [...depth, slug]
				parseBlocks(block.content, markdown, pageIds, structure[block.id].blocks, currentDepth)
			}
		}
	}
	return { markdown, structure }
}

export default async function pageToMarkdown(pageId){
	const blocks = await getPageBlocks(pageId)

	const { markdown, structure } = parseBlocks(blocks)

	return { markdown, structure }
}