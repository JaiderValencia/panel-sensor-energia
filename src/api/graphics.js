import axios from './axios'

export const getLastRecordRequest = () => axios.get('/getlastrecord', {    
})

export const monthGraphicRequest = ({ month, year }) => axios.get('/summonth', {
    params: { month, year },    
})

export const intervalGraphicRequest = ({ initialDate, finalDate }) => axios.get('/getinterval', {
    params: { initialDate, finalDate },    
})