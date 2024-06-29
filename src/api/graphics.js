import axios from './axios'
import Cookies from 'js-cookie'

export const monthGraphicRequest = ({ month, year }) => axios.get('/summonth', {
    params: { month, year },
    headers: {
        Token: Cookies.get('Token')
    },
})

export const intervalGraphicRequest = ({ initialDate, finalDate }) => axios.get('/getinterval', {
    params: { initialDate, finalDate },
    headers: {
        Token: Cookies.get('Token')
    }
})