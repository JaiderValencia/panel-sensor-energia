import { useState, useEffect } from 'react'
import { getLastRecordRequest } from '../../api/graphics'
import Widget from '../widget/Component'
import styles from './styles.module.css'

function WidgetsTemplate() {
    const [lastRecord, setLastRecord] = useState(null)

    const widgets = [
        {
            icon: (<svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2L1 21h22M12 6l7.5 13h-15m9.5-5h-1.5l1.5-3h-4v4h1v3l3-4Z"></path>
            </svg>),
            typeText: 'VOLTAJE',
            quantity: lastRecord?.voltage || 'Sin valor',
            type: 'green'
        },
        {
            icon: (<svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.684 3.603c.521-.659.03-1.603-.836-1.603h-6.716a1.06 1.06 0 0 0-.909.502l-5.082 8.456c-.401.666.103 1.497.908 1.497h3.429l-3.23 8.065c-.467 1.02.795 1.953 1.643 1.215L20 9.331h-6.849l4.533-5.728Z">
                </path>
            </svg>),
            typeText: 'CORRIENTE',
            quantity: lastRecord?.current || 'Sin valor',
            type: 'yellow'
        },
        {
            icon: (<svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M16 9v4.66l-3.5 3.51V19h-1v-1.83L8 13.65V9h8m0-6h-2v4h-4V3H8v4h-.01C6.9 6.99 6 7.89 6 8.98v5.52L9.5 18v3h5v-3l3.5-3.51V9c0-1.1-.9-2-2-2V3z">
                </path>
            </svg>),
            typeText: 'POTENCIA',
            quantity: lastRecord?.power || 'Sin valor',
            type: 'yellow'
        },
        {
            icon: (<svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M16 9v4.66l-3.5 3.51V19h-1v-1.83L8 13.65V9h8m0-6h-2v4h-4V3H8v4h-.01C6.9 6.99 6 7.89 6 8.98v5.52L9.5 18v3h5v-3l3.5-3.51V9c0-1.1-.9-2-2-2V3z">
                </path>
            </svg>),
            typeText: 'KWH',
            quantity: lastRecord?.kwh || 'Sin valor',
            type: 'blue'
        },
    ]

    const getLastRecord = async () => {

        const { data: lastRecord } = await getLastRecordRequest()

        if (lastRecord) {
            lastRecord.kwh = (lastRecord.power / 1000).toFixed(3)
        }

        console.log(lastRecord)


        setLastRecord(lastRecord)
    }

    useEffect(() => {
        setInterval(() => {
            getLastRecord()
        }, 10000)
    }, [])

    return (
        <section className={styles.widgetsTemplate}>
            {widgets.map((actualWidget, index) => (
                <Widget
                    key={index}
                    icon={actualWidget.icon}
                    color={actualWidget.type}
                    typeText={actualWidget.typeText}
                    quantity={actualWidget.quantity}
                />
            ))}
        </section>
    )
}

export default WidgetsTemplate
