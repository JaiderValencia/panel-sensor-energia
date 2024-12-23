import SectionCard from "../components/SectionCard/Component"
import Navbar from '../components/Navbar/Component'
import WidgetTemplate from '../components/widgetsTemplate/Component'
import { startDriver } from '../utils/driver'
import { useEffect } from 'react'

function HomePage() {
    const sections = [
        {
            title: 'Consulta por mes',
            inputName: 'month',
            inputPlaceholder: 'Ingresa el mes y año',
            inputType: 'month'
        },
        {
            title: 'Consulta por intervalo',
            inputName: 'date',
            inputPlaceholder: 'ingresa el intervalo de días',
            inputType: 'date'
        },
    ]

    useEffect(() => { startDriver() }, [])

    return (
        <>
            <Navbar />
            <WidgetTemplate />
            {sections.map((actualSection, index) => (
                <SectionCard
                    key={index}
                    title={actualSection.title}
                    inputName={actualSection.inputName}
                    inputPlaceholder={actualSection.inputPlaceholder}
                    inputType={actualSection.inputType}
                />
            ))}
        </>
    )
}

export default HomePage
