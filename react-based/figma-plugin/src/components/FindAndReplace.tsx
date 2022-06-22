import React, { useContext } from 'react'
import { Icon, Input } from 'react-figma-plugin-ds'
import { PluginContext } from '../browserlogic/context'
import { HoverableElements, PluginActionType } from '../browserlogic/state'

export interface FindAndReplaceProps {
  onPreviousClick: () => void
  onNextClick: () => void
  onSearchChange: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  onReplaceChange: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  onDeleteClick: () => void
  onConfirmReplaceClick: () => void
}

export const FindAndReplace = (props: FindAndReplaceProps) => {
  const {
    onPreviousClick,
    onNextClick,
    onSearchChange,
    onDeleteClick,
    onConfirmReplaceClick,
  } = props

  const { dispatch } = useContext(PluginContext)

  const onOverwriteReplaceClick = () => {}
  
  const onReplaceChange = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: PluginActionType.UsrChangeReplaceInput,
      payload: value,
    })
  }

  return (
    <div className="find-and-replace">
      <Icon name="caret-left" onClick={onPreviousClick} />
      <Input
        placeholder="Find component"
        onChange={onSearchChange}
        icon="search-large"
      />
      <Icon name="caret-right" onClick={onNextClick} />

      <Icon name="caret-down" onClick={onOverwriteReplaceClick} />

      <Icon name="play" onClick={onConfirmReplaceClick} />
      <Input placeholder="Rename" onChange={onReplaceChange} icon="swap" />
      <Icon name="trash" onClick={onDeleteClick} />
    </div>
  )
}
