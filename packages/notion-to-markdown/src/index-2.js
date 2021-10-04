import notionToMarkdown from 'notion-to-markdown'


!async function(){
	const content = await notionToMarkdown.getPageContent(`614911ed1cc148818c5c33968e9f8dd9`)
	console.log(`content`, content)
}()