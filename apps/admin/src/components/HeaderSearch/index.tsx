import { SearchOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { AutoComplete, Input } from 'antd'
import type { AutoCompleteProps } from 'antd/es/auto-complete'
import classNames from 'classnames'
import useMergedState from 'rc-util/es/hooks/useMergedState'
import React, { useRef } from 'react'
import styles from './index.less'

export interface HeaderSearchProps {
  onSearch?: (value?: string) => void
  onChange?: (value?: string) => void
  onVisibleChange?: (b: boolean) => void
  className?: string
  placeholder?: string
  options: AutoCompleteProps['options']
  defaultVisible?: boolean
  visible?: boolean
  defaultValue?: string
  value?: string
}

const HeaderSearch: React.FC<HeaderSearchProps> = props => {
  const { className, defaultValue, onVisibleChange, placeholder, visible, defaultVisible, ...restProps } = props

  const inputRef = useRef<InputRef | null>(null)

  const [value, setValue] = useMergedState<string | undefined>(defaultValue, {
    value: props.value,
    onChange: props.onChange
  })

  const [searchMode, setSearchMode] = useMergedState(defaultVisible ?? false, {
    value: visible,
    onChange: onVisibleChange
  })

  const inputClass = classNames(styles.input, {
    [styles.show]: searchMode
  })
  return (
    <div
      className={classNames(className, styles.headerSearch)}
      onClick={() => {
        setSearchMode(true)
        if (inputRef.current)
          inputRef.current.focus()
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          if (onVisibleChange)
            onVisibleChange(searchMode)
        }
      }}>
      <SearchOutlined
        key='Icon'
        style={{
          cursor: 'pointer'
        }} />
      <AutoComplete
        className={inputClass}
        key='AutoComplete'
        onChange={completeValue => setValue(completeValue)}
        options={restProps.options}
        value={value}>
        <Input
          aria-label={placeholder}
          defaultValue={defaultValue}
          onBlur={() => {
            setSearchMode(false)
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (restProps.onSearch)
                restProps.onSearch(value)
            }
          }}
          placeholder={placeholder}
          ref={inputRef}
          size='small' />
      </AutoComplete>
    </div>
  )
}

export default HeaderSearch
