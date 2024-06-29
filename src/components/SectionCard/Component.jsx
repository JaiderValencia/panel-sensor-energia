import { useState, lazy, Suspense } from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import Chart from '../Chart/Component'
import SpinLoader from '../spinLoader/Component'

function SectionCard({ title, inputType, inputPlaceholder, inputName }) {
    const [graphicData, setGraphicData] = useState([])
    const [loading, setLoading] = useState(false)

    const MonthInput = lazy(() => import('../monthInput/Component'))
    const IntervalInput = lazy(() => import('../IntervalInput/Component'))

    const Form = () => {
        return (
            <Suspense fallback={<p>Cargando...</p>} className={styles.form}>
                {
                    inputType.toLowerCase() == 'month'
                        ? <MonthInput
                            inputName={inputName}
                            inputPlaceholder={inputPlaceholder}
                            inputType={inputType}
                            setGraphicData={setGraphicData}
                            setLoading={setLoading}
                            styles={{ input: styles.input, formBtn: styles.formBtn }}
                        />
                        : <IntervalInput
                            inputName={inputName}
                            inputPlaceholder={inputPlaceholder}
                            inputType={inputType}
                            setGraphicData={setGraphicData}
                            setLoading={setLoading}
                            styles={{ input: styles.input, formBtn: styles.formBtn }} />
                }
            </Suspense>
        )
    }


    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h3>{title}</h3>
            </div>
            <div className={styles.content}>
                <Form />
                {loading && (
                    <SpinLoader fullscreen={false} />
                )}
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
