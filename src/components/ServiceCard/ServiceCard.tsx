import React from 'react'
import Button from '../Button/Button'

type Props = {
    image?: string
    title?: string
    price?: string
    description?: string
    buttonLabel?: string
    handleButton: () => any
    delay?: string
    handleReadMore: () => any
}

export default function ServiceCard(props: Props) {
    const {
        image,
        title,
        price,
        description,
        buttonLabel,
        handleButton,
        handleReadMore,
        delay
    } = props

    return (
        <div className='servicecard__container' style={{ animationDelay: delay || '0' }}>
            <div className="servicecard__content">
                {image ?
                    <div className="servicecard__image-wrapper">
                        <img src={image} alt="" className="servicecard__image" />
                    </div>
                    : ''}
                {title ? <p className="servicecard__title">{title}</p> : ''}
                {price ? <p className="servicecard__price">{price}</p> : ''}
                {description ? <p className="servicecard__description">{description}</p> : ''}
                <div className="servicecard__btns">
                    <Button
                        label={buttonLabel}
                        handleClick={handleButton}
                        bgColor='#efb3a2'
                        style={{ width: '100%', borderRadius: '.7rem' }}
                    />

                    <Button
                        label='Leer más'
                        handleClick={handleReadMore}
                        bgColor='transparent'
                        textColor='#efb3a2'
                        style={{ width: '100%', borderRadius: '.7rem' }}
                    />
                </div>
            </div>
        </div>
    )
}