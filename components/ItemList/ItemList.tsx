import React, { useState } from 'react'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'

import { classList } from '@/helpers/util'
import * as T from './ItemList.types'
import * as S from './ItemList.module.scss'

const ItemList: React.FunctionComponent<T.ItemListProps> = (
    props: T.ItemListProps
): JSX.Element => {
    const [moreToShow, setMoreToShow] = useState(props.items.length > 4)
    const [items, setItems] = useState(
        moreToShow ? props.items.slice(0, 4) : props.items
    )

    const showMore = () => {
        const itemsLength = items.length + 4
        setItems(props.items.slice(0, itemsLength))
        if (itemsLength >= props.items.length) setMoreToShow(false)
    }

    return (
        <ul
            className={classList([
                props.className,
                S['item-list'],
                props.mobileGrid && S['item-list--mobile-grid']
            ])}
        >
            {items.map((item, i) => (
                <li key={i} className={S['item-list__item']}>
                    {item.image && (
                        <div
                            className={classList([
                                S['item-list__item__thumbnail'],
                                props.fallback &&
                                    S['item-list__item__thumbnail--fallback']
                            ])}
                        >
                            {props.fallback ? (
                                <Skeleton
                                    circle={true}
                                    height={58}
                                    width={58}
                                />
                            ) : (
                                <Image
                                    src={
                                        item.image.src || '/img/placeholder.jpg'
                                    }
                                    alt={item.image.alt}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            )}
                        </div>
                    )}
                    <div
                        className={classList([
                            S['item-list__item__inner'],
                            props.fallback &&
                                S['item-list__item__inner--fallback']
                        ])}
                    >
                        <div className={S['item-list__item__key']}>
                            {props.fallback ? <Skeleton /> : item.key}
                        </div>
                        <div className={S['item-list__item__value']}>
                            {props.fallback ? <Skeleton /> : item.value}
                        </div>
                    </div>
                </li>
            ))}
            {!props.fallback && moreToShow && (
                <li key="button" className={classList([
                    S['item-list__item'],
                    S['item-list__item--button']
                ])}>
                    <button
                        className={S['item-list__button']}
                        onClick={showMore}
                        onKeyPress={e => {
                            if (e.key === 'Enter') showMore()
                        }}
                    >
                        Show more
                    </button>
                </li>
            )}
        </ul>
    )
}

export default ItemList
