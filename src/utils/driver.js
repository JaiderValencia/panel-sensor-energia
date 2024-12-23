import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

//elements
import { widgetsTemplate as widgets } from '../components/widgetsTemplate/styles.module.css'
import { section } from '../components/SectionCard/styles.module.css'

export const startDriver = () => {
    if (localStorage.getItem('driver')) return

    const sections = document.querySelectorAll(`.${section}`)
    
    const driverObj = driver({
        nextBtnText: 'Siguiente',
        prevBtnText: 'Atrás',
        doneBtnText: 'Finalizar',
        progressText: '{{current}} de {{total}}',
        showProgress: true,
        allowClose: false,
        showButtons: [
            'next',
            'previous'
        ],
        steps: [
            { popover: { title: 'Bienvenido', description: 'Esta es la página para poder consultar el consumo que ha registrado tu sensor de energía en tu vivienda' } },
            { element: `.${widgets}`, popover: { title: 'Widgets', description: 'En esta sección se mostrará en tiempo real el consumo que registra el sensor' } },
            { element: sections[0], popover: { title: 'Consulta por mes', description: 'En esta sección podrás consultar el consumo de energía de un mes en específico' } },
            {
                element: sections[1],
                popover: {
                    title: 'Consulta por intervalo',
                    description: 'En esta sección podrás consultar el consumo de energía en un intervalo específico de tiempo',
                    onNextClick: () => {
                        localStorage.setItem('driver', true)
                        driverObj.moveNext()
                    }
                }
            },
        ]
    })

    driverObj.drive()
}