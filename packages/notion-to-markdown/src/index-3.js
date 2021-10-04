import notion from 'notion-markdown';
import fetch from 'node-fetch';
 


fetch('https://www.notion.so/api/v3/loadPageChunk', {
  method: 'POST',
  headers: {
	 "content-type": "application/json"
  },
  body: JSON.stringify({
		pageId: `614911ed1cc148818c5c33968e9f8dd9`,
		limit: 100,
		chunkNumber: 0,
		verticalColumns: false
  })
}).then(res => res.json()).then(res => {
	console.log(`res`, res)
  // Please put the contents of `res.recordMap.block` in the notion function.
  console.log(notion(Object.values(res.recordMap.block)));
}).catch(err => {
	console.error(err)
})