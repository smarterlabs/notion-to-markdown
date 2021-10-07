export default function indentLines(str){
	return str.split(`\n`).map(line => {
		if(!line) return ``
		return `\t` + line
	}).join(`\n`)
}