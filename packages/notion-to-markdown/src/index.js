import pageToMarkdown from './page-to-markdown.js'

// https://smarterlabs.notion.site/Simple-Page-Text-2-614911ed1cc148818c5c33968e9f8dd9

pageToMarkdown(`614911ed1cc148818c5c33968e9f8dd9`).then(markdown => {
	console.log(`markdown`, markdown)
}).catch(err => {
	console.error(err)
	process.exit(1)
})