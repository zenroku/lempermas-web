export const monthName = (dateData) => {
    switch (dateData + 1) {
        case 1: {
            return 'Januari'
        }
        case 2: {
            return 'Februari'
        }
        case 3: {
            return 'Maret'
        }
        case 4: {
            return 'April'
        }
        case 5: {
            return 'Mei'
        }
        case 6: {
            return 'Juni'
        }
        case 7: {
            return 'Juli'
        }
        case 8: {
            return 'Agustus'
        }
        case 9: {
            return 'September'
        }
        case 10: {
            return 'Oktober'
        }
        case 11: {
            return 'November'
        }
        case 12: {
            return 'Desember'
        }
        default: {
            break;
        }
    }
}

export const milliSecondToStringDate = (milliseconds) => {
    let nowDate = new Date(milliseconds)
    let date = nowDate.getDate()
    let month = nowDate.getMonth()
    let year = nowDate.getFullYear()

    const dateString = `${date} ${monthName(month)} ${year}`
    return dateString
}

export function updatedTimeForSinglePost(millis, uploadTime) {
    const perNow = 6000
    const perMinute = perNow * 10
    const perHour = perMinute * 60
    const perDay = perHour * 24
    const perWeek = perDay * 7
    if (millis >= perWeek) {
        return `${milliSecondToStringDate(uploadTime)}`
    } else if (millis >= perDay) {
        const day = Math.floor(millis / perDay)
        return `${day} hari yang lalu`
    } else if (millis >= perHour) {
        const hour = Math.floor(millis / perHour)
        return `${hour} jam yang lalu`
    } else if (millis >= perMinute) {
        const minute = Math.floor(millis / perMinute);
        return `${minute} menit yang lalu`
    } else if (millis >= perNow) {
        return `Baru saja`
    }

}

export const newlyProduct = (timeNow, lasUpdate) => {
    const day = 86400000
    if ((timeNow - lasUpdate) >= day) {
        return true
    } else {
        return false
    }
}

export const greeting = () => {
    const time = new Date().getHours()

    if (time >= 3 && time <= 11) {
        return 'Selamat Pagi...'
    }

    if (time >= 12 && time <= 14) {
        return 'Selamat Siang...'
    }

    if (time >= 15 && time <= 17) {
        return 'Selamat Sore...'
    }

    if (time >= 18 || time <= 3) {
        return 'Selamat Malam...'
    }

}