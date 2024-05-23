import React, { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react'
import { dataObj } from '../../types'
import { AppContext } from '../../AppContext'
import { BeatLoader } from 'react-spinners'

type Props = {
    label: string
    options: string[] | number[] | dataObj[]
    value: string | number | dataObj
    objKey?: string | number
    selected: any
    setSelected: (value: any) => void
    isTime?: boolean
    isDate?: boolean
    locale?: string
    maxHeight?: string
    style?: React.CSSProperties
    multiselect?: boolean
    loading?: boolean
    disabled?: boolean
}

export default function Dropdown(props: Props) {
    const [openDrop, setOpenDrop] = useState(false)
    const { isMobile } = useContext(AppContext)
    const dropRef = useRef<HTMLDivElement>(null)
    const optionsRef = useRef<HTMLDivElement>(null)
    const selectRef = useRef<HTMLDivElement>(null)

    const {
        label,
        selected,
        setSelected,
        options,
        value,
        objKey,
        isTime,
        isDate,
        locale,
        maxHeight,
        style,
        multiselect,
        loading,
        disabled
    } = props

    const dropdownStyles: React.CSSProperties = { ...style, opacity: disabled ? .5 : 1, pointerEvents: disabled ? 'none' : 'unset', cursor: disabled ? 'not-allowed' : '' }

    useEffect(() => {
        const dropdownListener = () => window.addEventListener('mouseup', (e: MouseEvent) => {
            try {
                const className = (e.target as HTMLElement).className || ''
                if (className.includes('section') && [dropRef.current, selectRef.current].includes(e.target as HTMLDivElement)) return
                if (!className.includes('dropdown')) setOpenDrop(false)
                if (className.includes('dropdown')
                    && !className.includes('option')
                    && e.target !== dropRef.current) setOpenDrop(false)
            } catch (err) {
                console.error(err)
            }
        })
        dropdownListener()

        return window.removeEventListener('mouseup', dropdownListener)
    }, [])

    useEffect(() => {
        if (dropRef.current && optionsRef.current) {
            const bounding = dropRef.current.getBoundingClientRect()
            if (bounding) {
                optionsRef.current.style.marginTop = (bounding.height - 2).toFixed(0) + 'px'
                optionsRef.current.style.width = (bounding.width + (isMobile ? 0 : -2)).toFixed(0) + 'px'
            }
        }
    }, [openDrop])

    const getSelectValues = () => {
        if (value && Array.isArray(value) && value.length) {
            return value.map((val: dataObj | string | number) =>
                !val ? '' : typeof val === 'string' || typeof val === 'number' ? val :
                    objKey && val[objKey] ? val[objKey] : '')
        }
        return []
    }

    const getSelectValue = () => {
        if (value && typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
            if (isDate) return value ? new Date(value).toLocaleDateString(locale || 'sv-SE') : 'Seleccionar'
            if (isTime) return value ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Seleccionar'
            else return value
        }
        return objKey && selected && selected[objKey] ? selected[objKey] : 'Seleccionar'
    }

    const renderSelectedItem = () => {
        return <div
            className={`dropdown__select`}
            style={{
                border: openDrop ? '1px solid #105ec6' : '1px solid lightgray',
                borderBottomRightRadius: openDrop ? 0 : '',
                borderBottomLeftRadius: openDrop ? 0 : '',
                filter: openDrop ? 'brightness(95%)' : ''
            }}
            ref={selectRef}
            onClick={() => setOpenDrop(!openDrop)}>
            <p className={`dropdown__selected`}>
                {getSelectValue()}
            </p>
            < p className={`dropdown__selected`}>▾</p>
        </div>
    }

    const removeItem = (index: number) => {
        const newSelection = [...selected]
        newSelection.splice(index, 1)
        setSelected(newSelection)
    }

    const renderSelectedItems = () => {
        return <div
            className={`dropdown__select`}
            style={{
                border: openDrop ? '1px solid #105ec6' : '1px solid lightgray',
                borderBottomRightRadius: openDrop ? 0 : '',
                borderBottomLeftRadius: openDrop ? 0 : '',
                filter: openDrop ? 'brightness(95%)' : ''
            }}
            ref={selectRef}
            onClick={() => setOpenDrop(!openDrop)}>
            <div
                className={`dropdown__selected`}
                style={{
                    height: multiselect ? 'fit-content' : '',
                    flexWrap: multiselect ? 'wrap' : 'unset',
                }}>
                {getSelectValues().length ? getSelectValues()?.map((val, i) =>
                    <span key={i} className={`dropdown__selected-multi-item`}>
                        <p className='dropdown__selected-multi-label'>{val}</p>
                        <p className='dropdown__selected-multi-remove' onClick={() => removeItem(i)}>X</p>
                    </span>
                ) : <p style={{ padding: 0 }} className={`dropdown__selected`}>Seleccionar</p>}
            </div>
            < p className={`dropdown__selected`}>▾</p>
        </div>
    }

    const renderDropDownOptions = () => {
        return <div
            className={`dropdown__options`}
            style={{ borderTop: 'none', maxHeight: maxHeight || '' }}
            ref={optionsRef}>
            {options.length ?
                options.map((option: any, i: number) =>
                    <p
                        key={i}
                        className={`dropdown__option`}
                        onClick={() => {
                            if (multiselect) {
                                if (objKey && selected.filter((el: dataObj) => el[objKey] && el[objKey] === option[objKey]).length) return setOpenDrop(false)
                                if (selected.filter((el: any) => el === option).length) return setOpenDrop(false)
                                const newSelection = [...selected]
                                setSelected(newSelection.concat(option))
                            }
                            else setSelected(option)
                            setOpenDrop(false)
                        }}>
                        {isDate ? new Date(option).toLocaleDateString(locale || 'sv-SE') :
                            isTime ? new Date(option).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
                                objKey ? option[objKey] : option}
                    </p>)
                :
                <p className={`dropdown__option`} style={{ borderTop: 'none' }}>Cargando...</p>
            }
        </div>
    }

    const renderLoading = () => {
        return (
            <div className={`dropdown__select`}>
                <p
                    className={`dropdown__selected`}
                    style={{
                        height: multiselect ? 'fit-content' : '',
                        flexWrap: multiselect ? 'wrap' : 'unset',
                    }}>
                    <BeatLoader color='lightgray' size='1rem' />
                </p>
            </div >
        )
    }

    const renderMultiSelect = () => {
        return (
            <div className={`dropdown__container`} style={dropdownStyles}>
                {label ? <p className={`dropdown__label`}>{label}</p> : ''}
                <div ref={dropRef} className={`dropdown__select-section`}>
                    {loading ? renderLoading() : renderSelectedItems()}
                    {openDrop ? renderDropDownOptions() : ''}
                </div>
            </div >
        )
    }

    const renderSimpleSelect = () => {
        return (
            <div className={`dropdown__container`} style={dropdownStyles}>
                {label ? <p className={`dropdown__label`}>{label}</p> : ''}
                <div ref={dropRef} className={`dropdown__select-section`}>
                    {loading ? renderLoading() : renderSelectedItem()}
                    {openDrop ? renderDropDownOptions() : ''}
                </div>
            </div >
        )
    }


    return multiselect ? renderMultiSelect() : renderSimpleSelect()
}
