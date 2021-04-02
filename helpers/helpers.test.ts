import { formatSchedule } from './tvmaze'

describe('formatSchedule', () => {
    it('shows correct schedule format 2', () => {
        const schedule = {
            time: '12:30',
            days: ['Friday']
        }

        expect(formatSchedule(schedule)).toBe('Fridays at 12:30')
    })

    it('shows correct schedule format 2', () => {
        const schedule = {
            time: '12:30',
            days: ['Monday', 'Wednesday']
        }

        expect(formatSchedule(schedule)).toBe('Mondays & Wednesdays at 12:30')
    })

    it('shows correct schedule format 3', () => {
        const schedule = {
            time: '12:30',
            days: ['Monday', 'Wednesday', 'Saturday']
        }

        expect(formatSchedule(schedule)).toBe(
            'Mondays, Wednesdays & Saturdays at 12:30'
        )
    })

    it('shows correct schedule format 4', () => {
        const schedule = {
            time: '09:00',
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        }

        expect(formatSchedule(schedule)).toBe('Weekdays at 09:00')
    })

    it('shows correct schedule format 5', () => {
        const schedule = {
            time: '10:30',
            days: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ]
        }

        expect(formatSchedule(schedule)).toBe('Every day at 10:30')
    })
})
