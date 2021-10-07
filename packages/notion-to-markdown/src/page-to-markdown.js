import getPageBlocks from './get-page-blocks.js'
import blocksToMarkdown from './blocks-to-markdown.js'

export default async function pageToMarkdown(pageId){
	const blocks = await getPageBlocks(pageId)
	const markdown = blocksToMarkdown(blocks)
	return markdown
}