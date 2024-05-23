import { useContext } from 'react'
import { AppContext } from '../../AppContext'
type Props = {}

export default function About({ }: Props) {
    const { isMobile } = useContext(AppContext)
    return (
        <div className="page__centered">
            <div className="privacy__container" style={{ width: isMobile ? '95%' : '50%', margin: '2rem' }}>
                <h1>Sobre mí</h1>

            </div>
        </div>
    )
}