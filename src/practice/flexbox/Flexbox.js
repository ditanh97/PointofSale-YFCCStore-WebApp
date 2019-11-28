import React from 'react'
import styles from './Flexbox.module.css'

const Flexbox = () => {
    return(
        <div className={styles.flexContainer} >
            <header className={styles.header}>
                    4
            </header>
            <body>
                <div>1</div>
                <button className={styles.button}>Belut</button>
                <button className={styles.button2}>Belut</button>
                <button className={styles.button3}>Belut</button>
                <div>2</div>
                <div>3</div>

            </body>
        </div>
    )
}

export default Flexbox;