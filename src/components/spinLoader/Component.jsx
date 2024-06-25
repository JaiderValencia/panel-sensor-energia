import styles from './styles.module.css'

function SpinLoader() {

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#1a1b1e]'>
            <div className={styles.spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default SpinLoader
