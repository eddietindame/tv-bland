import axios from 'axios'
import { Schedule, ShowWithCast, ShowSchedule } from '@/typings/tvmaze'

export const tvmaze = axios.create({
    baseURL: 'https://api.tvmaze.com'
})

export const getSchedule = () =>
    tvmaze({ url: '/schedule' }).then(({ data }: { data: Schedule }) => data)

export const getShowWithCastById = (id: number) =>
    tvmaze({
        url: `/shows/${id}`,
        params: { embed: 'cast' }
    }).then(({ data }: { data: ShowWithCast }) => data)

/**
 * Formats show schedule into displayable string
 * @param schedule - ShowSchedule type (object)
 * @returns string
 */
export const formatSchedule = (schedule: ShowSchedule) => {
    let days

    if (schedule.days.length === 7) days = 'Every day'
    else if (
        schedule.days.length === 5 &&
        schedule.days.includes('Monday') &&
        schedule.days.includes('Tuesday') &&
        schedule.days.includes('Wednesday') &&
        schedule.days.includes('Thursday') &&
        schedule.days.includes('Friday')
    )
        days = 'Weekdays'
    else {
        if (schedule.days.length > 1) {
            const lastDay = schedule.days.pop()
            days =
                schedule.days.map(day => day + 's').join(', ') +
                ` & ${lastDay}s`
        } else days = schedule.days[0] + 's'
    }

    const time = schedule.time ? ` at ${schedule.time}` : ''

    return days + time
}
