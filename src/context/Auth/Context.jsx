import { create } from './createProvider'
import propTypes from 'prop-types'

export function Context({ children }) {

    return (
        <create.Provider>
            {children}
        </create.Provider>
    )
}

Context.propTypes = {
    children: propTypes.node.isRequired
}