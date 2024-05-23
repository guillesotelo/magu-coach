import React, { useEffect } from 'react'
import { onChangeEventType } from '../../types'

type Props = {
    name: string
    updateData?: (name: string, e: onChangeEventType) => void
    className?: string
    type?: string
    label?: string
    placeholder?: string
    value: string | number | readonly string[] | undefined
    cols?: number
    rows?: number
    style?: React.CSSProperties
    disabled?: boolean
    onSubmit?: () => void
    resize?: 'vertical' | 'horizontal' | 'both'
}

export default function InputField(props: Props) {
    let isEnterKeyListenerAdded = false

    const {
        value,
        name,
        label,
        updateData,
        className,
        type,
        placeholder,
        cols,
        rows,
        style,
        disabled,
        onSubmit,
        resize
    } = props

    useEffect(() => {
        if (onSubmit) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Enter') onSubmit()
            }
            if (!isEnterKeyListenerAdded) {
                document.addEventListener('keydown', handleKeyDown)
                isEnterKeyListenerAdded = true
            }
            return () => {
                document.removeEventListener('keydown', handleKeyDown)
                isEnterKeyListenerAdded = false
            }
        }
    }, [onSubmit])

    return type === 'textarea' ?
        <div className='inputfield__container' style={style}>
            {label ? <h2 className={`inputfield__label`}>{label}</h2> : ''}
            <textarea
                className={className || `textarea__default`}
                placeholder={placeholder || ''}
                onChange={e => updateData ? updateData(name, e) : null}
                value={value}
                cols={cols}
                rows={rows}
                disabled={disabled}
                style={{ resize: resize || 'none' }}
            />
        </div>
        :
        <div className='inputfield__container' style={style}>
            {label ? <h2 className={`inputfield__label`}>{label}</h2> : ''}
            <input
                type={type || 'text'}
                className={className || `inputfield__default`}
                placeholder={placeholder || ''}
                onChange={e => updateData ? updateData(name, e) : null}
                value={value}
                disabled={disabled}
            />
        </div>
}