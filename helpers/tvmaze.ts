import axios from 'axios'
import { Schedule, ShowWithCast } from '@/typings/tvmaze'

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
