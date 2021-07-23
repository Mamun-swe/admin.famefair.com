
// Formate array data as options
export const OptionMaker = data => {
    let options = []
    if (data && data.length) {
        for (let i = 0; i < data.length; i++) {
            const element = data[i]
            options.push({
                label: element,
                value: element,
            })
        }
    }

    return options
}

// Date formate
export const DateFormate = (date) => {
    date = new Date(date)
    const cdate = date.toDateString()
    return cdate
}