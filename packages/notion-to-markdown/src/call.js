import fetch from 'node-fetch'

export default function call(methodName, body){
	return new Promise(resolve => {
		fetch(`https://www.notion.so/api/v3/${methodName}`, {
			method: `POST`,
			headers: {
				"content-type": `application/json`,
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(json => resolve(json))
	})
}