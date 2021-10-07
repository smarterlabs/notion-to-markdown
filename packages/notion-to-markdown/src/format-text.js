import get from 'lodash/get.js'

export default function formatText(block){
	const parts = get(block, `properties.title`, [])
	let mdStr = ``
	for(let part of parts){
		let [value, formatting] = part
		// Loop through formatting instructions
		formatting = (formatting || []).map(f => {
			const format = f[0]
			if(format === `b`){
				value = `**${value}**`
			}
			else if(format === `i`){
				value = `*${value}*`
			}
			else if(format === `u`){
				value = `_${value}_`
			}
			else if(format === `s`){
				value = `~~${value}~~`
			}
			else if(format === `c`){
				value = `\`${value}\``
			}
			else if(format === `a`){
				value = `[${value}](${f[1]})`
			}
		})
		mdStr += value
	}
	return mdStr
}