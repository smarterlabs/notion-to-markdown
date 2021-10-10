import notionToMarkdown from './notion-to-markdown.js'
import { join } from 'path'
import { outputFile } from 'fs-extra'

// https://smarterlabs.notion.site/Simple-Page-Text-2-614911ed1cc148818c5c33968e9f8dd9
// https://smarterlabs.notion.site/CryoLayer-Documentation-acbce2c61d464deeb16ffc3b865009d3

const markdownDist = `../docsify/src/docs`
const structureDist = `../docsify/src/sidebar.md`

function structureToMarkdown(structure){
	let str = []
	for(let link of structure){
		if(!link.id){
			str.push(`- ${link.label}`)
		}
		else{
			str.push(`- [${link.label}](${link.id})`)
		}
		if(link.items){
			let lines = structureToMarkdown(link.items).split(`\n`).map(line => {
				return `\t${line}`
			})
			str = [
				...str,
				...lines,
			]
		}
	}
	return str.join(`\n`)
}

async function notionSiteToMarkdown(url){
	const parsed = new URL(url)
	const host = parsed.host
	
	const notionId = url.split(`-`).pop()
	let { structure, markdown } = await notionToMarkdown(notionId, host)

	// Write files
	for(let file of markdown){
		const markdownPath = join(markdownDist, file.path + `.md`)
		await outputFile(markdownPath, file.markdown)
	}

	// Write Docusaurus sidebars.js file
	const sidebarMarkdown = structureToMarkdown(structure)
	await outputFile(structureDist, sidebarMarkdown)
}

notionSiteToMarkdown(`https://smarterlabs.notion.site/CryoLayer-Documentation-acbce2c61d464deeb16ffc3b865009d3`).catch(err => {
	console.error(err)
	process.exit(1)
})