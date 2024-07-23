import { lazy, Suspense } from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'

function SectionCard({ title, inputType, inputPlaceholder, inputName }) {
    const MonthInput = lazy(() => import('../monthInput/Component'))
    const IntervalInput = lazy(() => import('../IntervalInput/Component'))

    const Content = () => {
        return (
            <div className={styles.content}>
                <Suspense fallback={<p>Cargando...</p>}>
                    {
                        inputType.toLowerCase() == 'month'
                            ? <MonthInput
                                inputName={inputName}
                                inputPlaceholder={inputPlaceholder}
                                inputType={inputType}
                                styles={{ input: styles.input, formBtn: styles.formBtn }}
                            />
                            : <IntervalInput
                                inputName={inputName}
                                inputPlaceholder={inputPlaceholder}
                                inputType={inputType}
                                styles={{ input: styles.input, formBtn: styles.formBtn }}
                            />
                    }
                </Suspense>
            </div>
        )
    }


    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h3>{title}</h3>
            </div>
            <Content />
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
