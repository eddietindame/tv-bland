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

    return (
        <div className={classList([props.className, S['show-list']])}>
            <div className={classList([S['show-list__inner'], 'row'])}>
                {data
                    ? data.map(episode => (
                          <TVShowItem
                              key={episode.id}
                              className={classList([
                                  S['show-list__item'],
                                  'col-xl-2',
                                  'col-lg-3',
                                  'col-md-4',
                                  'col-sm-6',
                                  'col-6'
                              ])}
                              episode={episode}
                              testId={T.SHOW_ITEM_TEST_ID}
                          />
                      ))
                    : Array(18)
                          .fill('')
                          .map((_e, i) => (
                              <TVShowItem
                                  key={i}
                                  className={classList([
                                      S['show-list__item'],
                                      'col-xl-2',
                                      'col-lg-3',
                                      'col-md-4',
                                      'col-sm-6',
                                      'col-6'
                                  ])}
                                  testId={T.SHOW_ITEM_FALLBACK_TEST_ID}
                              />
                          ))}
            </div>
        </div>
    )
}

export default ShowList
