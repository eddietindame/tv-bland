import * as React from 'react'

import { classList } from '@/helpers/util'
import * as T from './Footer.types'
import * as S from './Footer.module.scss'

const Footer: React.FunctionComponent<T.FooterProps> = (
    props: T.FooterProps
): JSX.Element => {
    return (
        <footer className={classList([props.className, S['footer']])}>
            <div className={S['footer__inner']}>
                &copy; TV Bland {new Date().getFullYear()}{' '}
                <span className={S['footer__separator']}>|</span>{' '}
                <a href="#">Cookies</a>{' '}
                <span className={S['footer__separator']}>|</span>{' '}
                <a href="#">Privacy</a>
            </div>
        </footer>
    )
}

export default Footer
