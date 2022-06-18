import React from 'react'
import { Icon, Input } from 'react-figma-plugin-ds'

export interface FindAndReplaceProps {
  onPreviousClick: () => void
  onNextClick: () => void
  onSearchChange: ((value: string, event: React.ChangeEvent<HTMLInputElement>) => void)
  onReplaceChange: ((value: string, event: React.ChangeEvent<HTMLInputElement>) => void)
  onDeleteClick: () => void
  onConfirmReplaceClick: () => void
}

export const FindAndReplace = (props: FindAndReplaceProps) => {
  const {
    onPreviousClick,
    onNextClick,
    onSearchChange,
    onReplaceChange,
    onDeleteClick,
    onConfirmReplaceClick,
  } = props

  const onOverwriteReplaceClick = () => {}

  return (
    <div className="find-and-replace">
      <Icon name="caret-left" onClick={onPreviousClick} />
      <Input placeholder="Find component" onChange={onSearchChange} icon="search-large" />
      <Icon name="caret-right" onClick={onNextClick} />

      <Icon name="caret-down" onClick={onOverwriteReplaceClick} />

      <Icon name="play" onClick={onConfirmReplaceClick} />
      <Input placeholder="Rename" onChange={onReplaceChange} icon="swap" />
      <Icon name="trash" onClick={onDeleteClick} />
    </div>
  )
}
