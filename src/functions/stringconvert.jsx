export const namedStringCapitalize = (str) => {
    const splitName = str.split(' ')
    const result = splitName.map(each => each.charAt(0).toUpperCase() + each.slice(1)).join(' ')
    if (result === 'Admin') {
        return ''
    } else {
        return result
    }
}