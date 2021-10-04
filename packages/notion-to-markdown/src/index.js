import { Client } from "@notionhq/client"
import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser'
// import { NotionBlocksMarkdownParser } from '@notion-stuff/blocks-markdown-parser'

// const instance = NotionBlocksMarkdownParser.getInstance()
const instance = NotionBlocksHtmlParser.getInstance()

const notion = new Client({ auth: process.env.NOTION_TOKEN })

// https://smarterlabs.notion.site/Setting-Up-a-New-Vercel-Website-584a1c27a10642d8869473588a5c1b45
// https://www.notion.so/smarterlabs/Simple-Page-Text-2-614911ed1cc148818c5c33968e9f8dd9



async function getChildren(blockId){
	const blockRes = await notion.blocks.children.list({
	  block_id: blockId,
	}).catch(err => {throw err})
	const blocks = blockRes.results
	for(let block of blocks){
		if(block.has_children){
			block[block.type].children = await getChildren(block.id).catch(err => {throw err})
		}
	}
	return blocks
}


!async function() {
  try {
		const pageId = '614911ed1cc148818c5c33968e9f8dd9'
		// const pageRes = await notion.pages.retrieve({ page_id: pageId })
		// console.log(`pageRes`, JSON.stringify(pageRes, null, 3))


		const blockRes = await getChildren(pageId).catch(err => {throw err})
		console.log(`blockRes`, JSON.stringify(blockRes, null, 3))


		const markdown = instance.parse(blockRes)

		console.log(`markdown`, markdown)


  }
  catch (error) {
    console.error(error)
  }
}()