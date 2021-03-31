import axios from 'axios'
import { ScheduleResponse } from '@/typings/tvmaze'

export const tvmaze = axios.create({
    baseURL: 'https://api.tvmaze.com'
})

export const getSchedule = () =>
    tvmaze({ url: '/schedule' }).then(
        ({ data }: { data: ScheduleResponse }) => data
    )
