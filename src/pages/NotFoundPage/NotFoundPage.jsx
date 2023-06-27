import React from 'react'
import s from './NotFoundPage.module.css'
import {Link} from 'react-router-dom'
import notFound from '../../assets/images/404.svg'
function NotFoundPage() {
  return (
    <section className={s.notFound}>
        <div className={s.center}>
            <img src={notFound} alt="" />
            <Link to={'/'}>Go back</Link>
        </div>
    </section>
  )
}

export default NotFoundPage