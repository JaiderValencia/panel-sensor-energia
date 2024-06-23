import { useId } from 'react'
import PropTypes from 'prop-types'

function Component({ label, placeholder, type, hasError, requirements, requiredError }) {
    const elementId = useId()

    return (
        <div>
            <label htmlFor={elementId} className="block text-white font-medium mb-2">{label.toUpperCase()}</label>
            <input autoComplete={(type != 'password') ? 'true' : 'false'} id={elementId} placeholder={placeholder} type={type} {...requirements} className="bg-[#3b3c41] dark:bg-[#2b2c30] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#6366f1]" />

            {hasError && (
                <p className='text-red-500'>
                    {
                        hasError.type === 'required' ?
                            (
                                requiredError
                            ) :
                            (
                                hasError.message
                            )
                    }
                </p>
            )}
        </div>
    )
}

Component.propTypes = {
    placeholder: PropTypes.string,
    hasError: PropTypes.object,
    requiredError: PropTypes.string,
    type: PropTypes.string.isRequired,
    requirements: PropTypes.any.isRequired,
    label: PropTypes.string,
}

export default Component
