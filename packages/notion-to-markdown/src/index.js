import potion from '../../potion/api/html.js'

!async function(){
	const res = await potion({
		query: {
			// https://smarterlabs.notion.site/Setting-Up-a-New-Vercel-Website-584a1c27a10642d8869473588a5c1b45
			id: `584a1c27a10642d8869473588a5c1b45`,
		}
	}, {
		json: obj => console.log(`obj`, obj),
		send: str => console.log(`str`, str),
	})
}()
console.log(`potion`, potion)