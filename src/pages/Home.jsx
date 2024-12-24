import Navbar from '../components/Navbar/Component'
import WidgetTemplate from '../components/widgetsTemplate/Component'
import SectionCardTemplate from '../components/sectionCardTemplate/Component'
import { startDriver } from '../utils/driver'
import { useEffect } from 'react'

function HomePage() {
    useEffect(() => { startDriver() }, [])

    return (
        <>
            <Navbar />
            <WidgetTemplate />
            <SectionCardTemplate />
        </>
    )
}

export default HomePage
