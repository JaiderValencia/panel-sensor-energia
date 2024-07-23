import { useState } from 'react'
import PropTypes from 'prop-types'
import Flatpickr from 'react-flatpickr'
import { intervalGraphicRequest } from '../../api/graphics'
import "flatpickr/dist/themes/dark.css"
import moment from 'moment'
import Swal from 'sweetalert2'
import SpinLoader from '../spinLoader/Component'
import Chart from '../Chart/Component'

function IntervalInput({ inputName, inputType, inputPlaceholder, styles }) {
    const [graphicData, setGraphicData] = useState([])
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState([])

    const handleOnChange = (value) => (
        setInputValue(value))

    const handleConsult = async () => {
        try {
            if (!inputValue.length) {
                return Swal.fire({
                    title: 'Debes poner algo',
                    icon: 'error'
                })
            }

            const [rawInitialDate, rawFinalDate] = inputValue

            if (!new Date(rawFinalDate).getTime() || !new Date(rawInitialDate).getTime()) {
                return Swal.fire({
                    title: 'Debes poner fechas válidas',
                    icon: 'error'
                })
            }

            setLoading(true)
            setGraphicData([])

            const { data } = await intervalGraphicRequest({
                initialDate: moment(rawInitialDate).format('Y-M-D'),
                finalDate: moment(rawFinalDate).format('Y-M-D'),
            })

            if (!data) {
                throw new Error()
            }

            setGraphicData(data.data.map((actualRecord) => ({
                time: actualRecord.date,
                value: actualRecord.summation,
            })))
        } catch ({ response }) {
            if (response?.status == 404 || response?.status == 400) {
                Swal.fire({
                    title: "Error",
                    text: response.data.meta.message,
                    icon: "error"
                })
            }

            if (!response || response.status == 500) {
                Swal.fire({
                    title: "Algo ha pasado, intenta nuevamente o en otro momento",
                    icon: "error"
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Flatpickr
                value={inputValue}
                onChange={handleOnChange}
                name={inputName}
                type={inputType}
                placeholder={inputPlaceholder}
                className={styles.input}
                options={{
                    mode: 'range',
                    minDate: '2024-01-01',
                    position: 'auto center',
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                }}
            />
            <button onClick={handleConsult} type='submit' className={styles.formBtn}>consultar</button>
            {loading && (
                <SpinLoader fullscreen={false} />
            )}
            {graphicData.length > 0 ? (
                <Chart data={graphicData} />
            ) : (
                null
            )}
        </>
    )
}

IntervalInput.propTypes = {
    inputType: PropTypes.string.isRequired,
    inputPlaceholder: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    styles: PropTypes.object
}


export default IntervalInput
