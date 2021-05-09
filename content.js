const getAssignemntObjects = () => {
	var obj = []
	const table = document
		.getElementById('dataDiv')
		.getElementsByTagName('tbody')

	console.log(table)
	for (i = 1; i < table.item(0).rows.length; i++) {
		var objCells = table.item(0).rows.item(i)
		obj.push(objCells)
	}

	return obj
}

const modifiedHtml = (content, color) => {
	const contentHtml = content.getElementsByTagName('td')
	// console.log(color)
	contentHtml.item(0).style = `text-align:right; background-color: ${color}`
}

const getDateString = (dateObj) => {
	const dateText = dateObj.getElementsByTagName('td')
	return dateText.length > 3 ? dateText.item(4).innerHTML : null
}

const calulateUrgency = (date) => {
	const now = new Date()
	const diff = Math.round((date - now) / (1000 * 60 * 60 * 24))
	// console.log(diff)
	var urgencyRank = -1
	if (diff <= 1) urgencyRank = 1
	else if (diff <= 2) urgencyRank = 2
	else if (diff >= 2) urgencyRank = 3
	else urgencyRank = 4
	// console.log(urgencyRank)
	return urgencyRank - 1
}

const getColor = (urgencyRank) => {
	const colors = ['#db4c42', '#d1d13f', '#5fd13f', '#f7f7f7', '#4fdee0']
	return colors[urgencyRank]
}

const getEndDate = (dateText) => dateText.substr(27, 51)

const convertStringToDate = (dateString) => new Date(Date.parse(dateString))

const isSubmitted = (content) => {
	const contentHtml = content.getElementsByTagName('td')
	if (contentHtml.length > 1) {
		const temp = contentHtml.item(6).getElementsByTagName('b').item(0)
			.outerText
		return temp == 'Submitted' ? true : false
	}
	return true
}

const main = () => {
	const obj = getAssignemntObjects()
	for (var i = 0; i < obj.length; i++) {
		const dateStr = getDateString(obj[i])
		// console.log(`datestr : ${dateStr}`)
		if (dateStr && !isSubmitted(obj[i])) {
			const deadline = convertStringToDate(getEndDate(dateStr))
			const urgencyRank = calulateUrgency(deadline)
			const color = getColor(urgencyRank)
			modifiedHtml(obj[i], color)
		}
	}
}

setTimeout(main, 2000)
