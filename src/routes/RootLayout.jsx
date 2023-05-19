import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import Input from '../components/Input'
import styles from './RootLayout.module.css'

function RootLayout() {

  return (
    <>
      <div className={styles.mainLayout}>
        <Header />
        <Input />
      </div>
      <Outlet />
    </>
  )
}

export default RootLayout
