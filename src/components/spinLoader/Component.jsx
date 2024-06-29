import PropTypes from 'prop-types'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'

function SpinLoader({ fullscreen }) {
    const [className, setClassName] = useState(null)

    useEffect(() => {
        if (fullscreen) {
            return setClassName('fixed inset-0 z-50 flex items-center justify-center bg-[#1a1b1e]')
        }

        return setClassName('flex items-center justify-center m-8')

    }, [fullscreen])

    return (
        <div className={className}>
            <div className={styles.spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

SpinLoader.propTypes = {
    fullscreen: PropTypes.bool
}

export default SpinLoader
