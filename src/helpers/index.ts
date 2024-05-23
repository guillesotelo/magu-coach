import { dataObj, onChangeEventType } from "../types"

export const chunkArray = (arr: any[], chunkSize: number) => {
    const result = []
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize))
    }
    return result
}

export const sortArray = (arr: any[], key: string | number, order?: boolean) => {
    return arr.slice().sort((a: any, b: any) => {
        const aValue = a[key]
        const bValue = b[key]
        if (typeof aValue !== 'number' && !aValue) return 1
        if (typeof bValue !== 'number' && !bValue) return -1
        return order ? aValue < bValue ? 1 : -1 : aValue < bValue ? -1 : 1
    })
}

export const filterArray = (arr: any[], key: string | number, filter: string) => {
    return arr.filter(element => element[key].toLocaleLowerCase().includes(filter))
}

export const goToUrl = (url: string) => {
    const anchor = document.createElement('a')
    anchor.target = '_blank'
    anchor.href = url
    anchor.click()
}

export const isTooBright = (color: string | undefined) => {
    color = color === 'gray' ? '#808080' :
        color === 'lightgray' ? '#d3d3d3' :
            color === 'black' ? '#000000' :
                color === 'white' ? '#ffffff' : color
    if (!color || !color.includes('#')) return false
    const hexToRgb = (hex: string) =>
        hex.match(/[A-Za-z0-9]{2}/g)?.map((v) => parseInt(v, 16))
    const [r, g, b] = hexToRgb(color) || []
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255)
    const threshold = 0.5
    return luminance > threshold
}

export const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => position,
            (error) => {
                console.error("Error getting location:", error)
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser")
    }
}

export const toHex = (str: string) => {
    var result = ''
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16)
    }
    return result
}

export const getUser = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}

export const getDate = (dateString: Date | number | string | undefined) => {
    if (dateString) {
        const date = new Date(dateString)
        if (date.getHours() === 24) date.setHours(0)
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
    }
}

export const parseDateTime = (time: Date) => {
    const string = time ?
        getDate(time)
        : 'No data'
    return string ? string.split(' ').join(' - ') : ''
}

export const getDateWithGivenHour = (hour: number) => {
    /* Build dates with given hours passed */
    const today = new Date()
    today.setMinutes(0)
    today.setSeconds(0)
    today.setHours(today.getHours() - hour)
    return today.toLocaleString()
}

export const updateData = (key: string, e: onChangeEventType, data: dataObj, setData: (value: any) => void) => {
    const value = e.target.value
    setData({ ...data, [key]: value })
}

export const parsePrice = (amount: number) => {
    if (!amount) return ''
    let amountString = ''
    String(amount).split('').reverse().forEach((letter, i) => {
        if (i !== 0 && i % 3 === 0) amountString += `,`
        amountString += `${letter}`
    })
    return `$ ${amountString.split('').reverse().join('')}`
}

export const parseMessageUri = (msg: string) => {
    if (msg) return encodeURIComponent(msg)
    return msg
}

export const scrollToSection = (section: string) => {
    setTimeout(() => {
        const element = document.getElementById(section)
        console.log(element)
        if (element) element.scrollIntoView({  block: 'start', inline: 'start' })
    }, 200)
}

export const getTime = (date: Date | string | number) => {
    return new Date(date).toLocaleString('ES-es', { hour: '2-digit', minute: '2-digit' })
}

export const getAges = () => Array.from({ length: 103 }).map((_, i) => i + 18)
