import Swal from 'sweetalert2'
import { monthGraphicRequest } from '../../api/graphics'
import PropTypes from 'prop-types'
import { useState } from 'react'

function MonthInput({ inputType, inputPlaceholder, inputName, setGraphicData, setLoading, styles }) {
    const [inputValue, setInputValue] = useState("")


    const handleOnChange = (e) => setInputValue(e.target.value)

    const handleConsult = async () => {
        if (!inputValue) {
            return Swal.fire({
                title: 'Debes poner algo',
                icon: 'error'
            })
        }

        if (!new Date(inputValue).getTime()) {
            return Swal.fire({
                title: 'Debes poner el mes y el año',
                icon: 'error'
            })
        }
        const [year, month] = inputValue.split('-')

        try {
            setLoading(true)
            setGraphicData([])
            const response = await monthGraphicRequest({ year, month })

            if (!response) {
                throw new Error()
            }

            setGraphicData(response.data.map((actualRecord) => ({
                time: actualRecord.date,
                value: actualRecord.summation
            })))
        } catch ({ response }) {
            if (response?.status == 404) {
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
        }
        setLoading(false)
    }

    return (
        <>
            <input min="2024-01" className={styles.input} onChange={handleOnChange} type={inputType} placeholder={inputPlaceholder} name={inputName} />
            <button onClick={handleConsult} type='submit' className={styles.formBtn}>consultar</button>
        </>
    )
}

MonthInput.propTypes = {
    inputType: PropTypes.string.isRequired,
    inputPlaceholder: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    setGraphicData: PropTypes.func,
    setLoading: PropTypes.func,
    styles: PropTypes.object
}

export default MonthInput
