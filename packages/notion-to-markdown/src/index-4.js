import { Client } from "@notionhq/client"
import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser'
import template from "lodash.template"
// import { NotionBlocksMarkdownParser } from '@notion-stuff/blocks-markdown-parser'

// const instance = NotionBlocksMarkdownParser.getInstance()
const instance = NotionBlocksHtmlParser.getInstance()

const notion = new Client({ auth: process.env.NOTION_TOKEN })

// https://smarterlabs.notion.site/Setting-Up-a-New-Vercel-Website-584a1c27a10642d8869473588a5c1b45
// https://www.notion.so/smarterlabs/Simple-Page-Text-2-614911ed1cc148818c5c33968e9f8dd9



async function parseBlock(blockId, depth = 0, output = []){
	const blockRes = await notion.blocks.children.list({
	  block_id: blockId,
	}).catch(err => {throw err})
	const blocks = blockRes.results
	for(let block of blocks){

		// Add line to output
		output.push(blockToMarkdown(block, depth))

		if(block.has_children){
			await parseBlock(block.id, depth + 1, output)
				.catch(err => {throw err})
		}
	}
	return output
}


!async function() {
  try {
		const pageId = '614911ed1cc148818c5c33968e9f8dd9'
		// const pageRes = await notion.pages.retrieve({ page_id: pageId })
		// console.log(`pageRes`, JSON.stringify(pageRes, null, 3))


		const output = await parseBlock(pageId).catch(err => {throw err})
		console.log(`OUTPUT:\n`, output.join(`\n`))





  }
  catch (error) {
    console.error(error)
  }
}()


function blockToMarkdown(block, depth){
	let tabs = ``
	for(let i = depth; i--;){
		tabs += `\t`
	}

	const { type } = block
	if(type === `paragraph`){
		console.log(`block`, JSON.stringify(block, null, 3))
		return tabs + parseText(block.paragraph.text)
	}


	return tabs + block.id
}

function parseText(items){
	const text = []
	for(let item of items){
		const parsedTextItem = parseTextItem(item)
		text.push(parsedTextItem)
	}
	const str = text.join(``)
	return str
}

function parseTextItem(item){
	if(item.type === `equation`){
		return item.equation.expression
	}


	let str = ``
	if(item.href){
		str = `[${item.text.content}](${item.href})`
	}
	else{
		str = item.text.content
	}
	// Formatting
	const styles = item.annotations
	if(styles.bold){
		str = `**${str}**`
	}
	if(styles.italic){
		str = `*${str}*`
	}
	if(styles.strikethrough){
		str = `~~${str}~~`
	}
	if(styles.underline){
		str = `<ins>${str}</ins>`
	}
	if(styles.code){
		str = '`' + str + '`'
	}
	if(styles.color && styles.color !== `default`){
		str = `<span style="color:${styles.color}">${str}</span>`
	}
	return str
}