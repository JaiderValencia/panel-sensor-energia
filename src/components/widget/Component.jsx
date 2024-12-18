import { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'

function Widget({ icon, quantity, typeText, color }) {
    const widget = useRef(null)
    const [clientWidth, setclientWidth] = useState(null)
    const [clientHeight, setclientHeight] = useState(null)

    useEffect(() => {
        setclientWidth(widget.current.clientWidth)
        setclientHeight(widget.current.clientHeight)
    }, [])

    const mouseMove = (e) => {
        const { layerX, layerY } = e.nativeEvent

        const yRotation = (
            (layerX - clientWidth / 2) / clientWidth
        ) * 32

        const xRotation = (
            (layerY - clientHeight / 2) / clientHeight
        ) * 32

        widget.current.style.transform = `scale(1,1) perspective(500px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
    }

    const MouseOut = () => {
        widget.current.style.transform = `perspective(500px) scale(1) rotateX(0) rotateY(0)`
    }


    return (
        <div className={`${styles.widget} ${styles[color]}`} ref={widget} onMouseMove={mouseMove} onMouseOut={MouseOut}>
            <div className={styles.icon}>
                {icon}
            </div>
            <div className={styles.type_container}>
                <span className={styles.quantity}>{quantity}</span>
                <span className={styles.type}>{typeText}</span>
            </div>
        </div>
    )
}

Widget.propTypes = {
    icon: PropTypes.element.isRequired,
    quantity: PropTypes.string,
    typeText: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['green', 'yellow', 'blue']).isRequired
}

export default Widget
