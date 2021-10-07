import get from 'lodash/get.js'
import getPageBlocks from './get-page-blocks.js'
import blocksToMarkdown from './blocks-to-markdown.js'
import slugify from 'slug'

async function parseBlocks(blocks, markdown = [], pageIds = [], structure = [], depth = []) {
	for(let block of blocks){
		if(block.type == `page` && !pageIds.includes(block.id)){
			// console.log(`page block`, JSON.stringify(block, null, 2))
			pageIds.push(block.id)
			const title = get(block, `properties.title[0][0]`)
			const slug = slugify(title)
			let dir = depth.length ? `${depth.join(`/`)}/` : ``
			if(dir === `/`) dir = ``
			const path = `${dir}${slug}`
			const str = await blocksToMarkdown(block.content)

			let hasChildren
			for(let child of block.content){
				if(child.type == `page`){
					hasChildren = true
					break
				}
			}

			let items = []
			if(!hasChildren){
				structure.push({
					type: `doc`,
					id: path,
					label: title,
				})
			}
			else{
				if(str){
					items.push({
						type: `doc`,
						id: path,
						label: title,
					})
				}
				structure.push({
					type: `category`,
					label: title,
					items,
				})
			}
			markdown.push({
				title,
				slug,
				dir,
				path,
				markdown: str,
				hasChildren: !!(block.content && block.content.length),
			})

			
			// Parse contents
			if(block.content){
				const currentDepth = [...depth, slug]
				await parseBlocks(block.content, markdown, pageIds, items, currentDepth)
			}
		}
	}
	return { markdown, structure }
}

export default async function pageToMarkdown(pageId){
	const blocks = await getPageBlocks(pageId)

	const { markdown, structure } = await parseBlocks(blocks)

	return { markdown, structure }
}