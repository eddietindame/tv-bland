import * as React from 'react'
import useSWR from 'swr'

import TVShowItem from '@/components/TvShowItem'
import { getSchedule } from '@/helpers/tvmaze'
import { classList } from '@/helpers/util'
import * as T from './ShowList.types'
import * as S from './ShowList.module.scss'

const ShowList: React.FunctionComponent<T.ShowListProps> = (
    props: T.ShowListProps
): JSX.Element => {
    const { data, error } = useSWR('schedule', getSchedule)

    if (error) return <>There was an error fetching tv shows.</>
    if (!data) return <>Loading tv shows...</>

    return (
        <div
            className={classList([props.className, S['show-list']])}
            data-testid={T.SHOW_LIST_TESTING_ID}
        >
            <div className={classList(['show-list__inner', 'row'])}>
                {data.map(episode => (
                    <TVShowItem
                        key={episode.id}
                        className={classList([
                            'show-list__item',
                            'col-xl-2',
                            'col-lg-3',
                            'col-md-4',
                            'col-sm-6',
                            'col-6'
                        ])}
                        episode={episode}
                    />
                ))}
            </div>
        </div>
    )
}

export default ShowList
