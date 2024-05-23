import Magu from '../../assets/images/site/magu-wpp.jpg'
import GoBack from '../../assets/icons/arrow-left.svg'
import Options from '../../assets/icons/options.svg'
import DoubleCheck from '../../assets/icons/double-check.svg'
import Smiley from '../../assets/icons/smile.svg'
import Send from '../../assets/icons/send.svg'
import { useHistory } from 'react-router-dom'
import { KeyboardEvent, KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import { dataObj } from '../../types'
import { updateMessageSession } from '../../services/app'

type Props = {
    onClose?: () => void
    message?: string
}

export default function WhatsappChat({ onClose, message }: Props) {
    const [allMessages, setAllMessages] = useState<dataObj[]>([])
    const [messagesSent, setMessagesSent] = useState(false)
    const [messagesRead, setMessagesRead] = useState(false)
    const [sentResponse, setSentResponse] = useState(false)
    const [sessionId, setSessionId] = useState('')
    const [data, setData] = useState<any>({ message })
    const history = useHistory()
    const chatRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (allMessages.length) {
            if (!sentResponse) {
                setSentResponse(true)
                setTimeout(() => setMessagesSent(true), 1500)
                setTimeout(() => setMessagesRead(true), 3000)

                setTimeout(() => {
                    const newMessage = {
                        text: 'Hola! Gracias por escribirme. Estaré contestando tu consulta tan pronto como pueda.',
                        response: true,
                        date: new Date()
                    }
                    setAllMessages(prev => prev.concat(newMessage))
                }, 5000)

                setTimeout(() => {
                    const newMessage = {
                        text: 'Mientras tanto, escribí tu nombre, consulta y teléfono o email para ponerme en contacto contigo.',
                        response: true,
                        date: new Date()
                    }

                    setAllMessages(prev => prev.concat(newMessage))
                }, 8000)
            }
            else if (allMessages.length >= 3) updateSession()
        }
    }, [allMessages])

    const updateData = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const sendMessage = () => {
        const newMessage = {
            text: data.message,
            response: false,
            date: new Date()
        }
        setAllMessages(prev => prev.concat(newMessage))
        setData({ message: '' })
        if (chatRef.current) chatRef.current.scrollTo({ behavior: 'smooth', top: chatRef.current.scrollHeight })
    }

    const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.code === 'Enter') {
            e.preventDefault()
            sendMessage()
        }
    }

    const updateSession = async () => {
        try {
            const session = await updateMessageSession({
                _id: sessionId,
                messages: JSON.stringify(allMessages)
            })
            if (session) setSessionId(session._id)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="whatsapp__container">
            <div className="whatsapp__box">
                <div className="whatsapp__header">
                    <div className="whatsapp__header-info">
                        <img src={GoBack} onClick={onClose} alt="Go Back" className="whatsapp__header-goback" />
                        <img src={Magu} alt="Profile" className="whatsapp__header-img" />
                        <div className="whatsapp__header-text">
                            <p className="whatsapp__header-name" onClick={() => history.push('/sobre-mi')}>Lic. M. Agustina Sotelo</p>
                            <p className="whatsapp__header-status">{messagesRead && allMessages.length < 3 ? 'escribiendo...' : 'online'}</p>
                        </div>
                    </div>
                    <img src={Options} alt="Options" className="whatsapp__header-options" />
                </div>

                <div className="whatsapp__chat" ref={chatRef}>
                    {allMessages.map(msg =>
                        <div
                            className="whatsapp__chat-message"
                            style={{
                                backgroundColor: msg.response ? 'white' : '',
                                borderTopRightRadius: msg.response ? '.5rem' : 0,
                                borderTopLeftRadius: msg.response ? 0 : '.5rem',
                                alignSelf: msg.response ? 'flex-start' : ''
                            }}>
                            <p className="whatsapp__chat-message-text">{msg.text}</p>
                            <div className="whatsapp__chat-message-status">
                                <p className="whatsapp__chat-message-time">{new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                {msg.response || !messagesSent ? '' :
                                    <img
                                        src={DoubleCheck}
                                        alt="Sent"
                                        className="whatsapp__chat-message-check"
                                        style={{
                                            filter: messagesRead ? 'invert(50%) sepia(63%) saturate(5099%) hue-rotate(172deg) brightness(99%) contrast(101%)' : ''
                                        }}
                                    />}
                            </div>
                        </div>
                    )}
                </div>

                <div className="whatsapp__footer">
                    <div className="whatsapp__input">
                        <img src={Smiley} alt="" className="whatsapp__input-emojis" />
                        <textarea className="whatsapp__input-box" value={data.message} onKeyDown={handleEnter} onChange={e => updateData('message', e)} />
                    </div>
                    <div className="whatsapp__send-container" onClick={sendMessage}>
                        <img src={Send} alt="Send" className="whatsapp__send-svg" />
                    </div>
                </div>
            </div>
        </div>
    )
}