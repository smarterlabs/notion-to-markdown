import notionToMarkdown from './notion-to-markdown.js'

// https://smarterlabs.notion.site/Simple-Page-Text-2-614911ed1cc148818c5c33968e9f8dd9
// https://smarterlabs.notion.site/CryoLayer-Documentation-acbce2c61d464deeb16ffc3b865009d3

notionToMarkdown(`acbce2c61d464deeb16ffc3b865009d3`).then(({ structure, markdown }) => {
	console.log(`markdown`, markdown)
	console.log(`structure`, structure)
}).catch(err => {
	console.error(err)
	process.exit(1)
})