import { useState } from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import Chart from '../Chart/Component'
import MonthInput from '../monthInput/Component'
import IntervalInput from '../IntervalInput/Component'

function SectionCard({ title, inputType, inputPlaceholder, inputName }) {
    const [graphicData, setGraphicData] = useState([])

    const Form = () => {
        if (inputType.toLowerCase() == 'month') {
            return (<div className={styles.form}>
                <MonthInput
                    inputName={inputName}
                    inputPlaceholder={inputPlaceholder}
                    inputType={inputType}
                    setGraphicData={setGraphicData}
                    styles={{ input: styles.input, formBtn: styles.formBtn }}
                />
            </div>)
        }

        if (inputType.toLowerCase() == 'date') {
            return (<div className={styles.form}>
                <IntervalInput
                    inputName={inputName}
                    inputPlaceholder={inputPlaceholder}
                    inputType={inputType}
                    setGraphicData={setGraphicData}
                    styles={{ input: styles.input, formBtn: styles.formBtn }} />
            </div>)
        }
    }


    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h3>{title}</h3>
            </div>
            <div className={styles.content}>
                <Form />
                {graphicData.length > 0 ? (
                    <Chart data={graphicData} />
                ) : (
                    null
                )}
            </div>
        </section>
    )
}

SectionCard.propTypes = {
    title: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    inputPlaceholder: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
}

export default SectionCard
