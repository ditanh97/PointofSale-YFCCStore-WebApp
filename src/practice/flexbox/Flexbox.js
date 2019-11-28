import React from 'react'
import styles from './Flexbox.module.css'

const Flexbox = () => {
    return(
        <div className={styles.flexContainer} >
            <div className={styles.sidebar}></div>
            <div className={styles.fullContent}>
                <div className={styles.header}>1</div>
                <div className={styles.content}>
                    <button className={styles.button}>Belut</button>
                    <button className={styles.button2}>Belut</button>
                    <button className={styles.button3}>Belut</button>
                </div>
            </div>
        </div>
    )
}

export default Flexbox;