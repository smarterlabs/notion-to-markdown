import notionToMarkdown from './notion-to-markdown.js'
import { join } from 'path'
import { outputFile } from 'fs-extra'

// https://smarterlabs.notion.site/Simple-Page-Text-2-614911ed1cc148818c5c33968e9f8dd9
// https://smarterlabs.notion.site/CryoLayer-Documentation-acbce2c61d464deeb16ffc3b865009d3

const markdownDist = `../docusaurus/docs`
const structureDist = `../docusaurus/structure.js`

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
	await outputFile(structureDist, `module.exports = ${JSON.stringify(structure, null, 3)}`)
}

notionSiteToMarkdown(`https://smarterlabs.notion.site/CryoLayer-Documentation-acbce2c61d464deeb16ffc3b865009d3`).catch(err => {
	console.error(err)
	process.exit(1)
})