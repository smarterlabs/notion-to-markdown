const puppeteer = require('puppeteer')
const { outputFile } = require('fs-extra')
const { join } = require('path')
const HtmlToMarkdown = require(`turndown`)

var htmlToMarkdown = new HtmlToMarkdown({})

const defaultConfig = {
	dist: `./dist`,
}
// Crawls Notion site and outputs markdown files
async function notionToMarkdown(userConfig) {
	const config = {
		...defaultConfig,
		...userConfig,
	}
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox'],
	})
	const page = await browser.newPage()

	const foundUrls = [ config.url ]
	const toCrawlUrls = [ config.url ]

	while (toCrawlUrls.length > 0) {
		const url = toCrawlUrls.shift()
		console.log(`Crawling: ${url}`)
		await page.goto(url)
		await page.waitForSelector('.notion-page-content')

		// Get URLs to crawl
		const hrefs = await page.$$eval('a', as => as.map(a => a.href));
		for (const href of hrefs) {
			if(
				!foundUrls.includes(href) &&
				(
					href.startsWith('/') ||
					href.startsWith('https://smarterlabs.notion.site/')
				)
			) {
				foundUrls.push(href)
				toCrawlUrls.push(href)
			}
		}

		// Get contents of Notion doc
		const html = await page.evaluate(() => {
			const scroller = document.querySelector('.notion-scroller')
			if (scroller) {
				return scroller.innerHTML
			}
			return ''
		})

		console.log(`html`, html)
		const md = htmlToMarkdown.turndown(html)
		console.log(`md`, md)
		process.exit(0)

	}
	console.log(`foundUrls`, foundUrls)

	await browser.close()
}

notionToMarkdown({
	url: 'https://smarterlabs.notion.site/CryoLayer-Documentation-812b45a7265845e69471c25a718b81a2',
}).catch(err => {
	console.error(err)
	process.exit(1)
})

module.exports = notionToMarkdown