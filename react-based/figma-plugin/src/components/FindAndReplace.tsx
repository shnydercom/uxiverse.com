import React from 'react'
import { Icon, Input } from 'react-figma-plugin-ds'

export const FindAndReplace = () => {
  const onPreviousClick = () => {}
  const onNextClick = () => {}
  const onSearchChange = () => {}
  const onReplaceChange = () => {}
  const onDeleteClick = () => {}
  const onConfirmReplace = () => {}
  return (
    <div className="find-and-replace">
      <Icon name="caret-left" onClick={onPreviousClick} />
      <Input placeholder="Find" onChange={onSearchChange} icon="search-large" />
      <Icon name="caret-right" onClick={onNextClick} />

      <Icon name="caret-down" onClick={onNextClick} />

      <Icon name="play"  onClick={onConfirmReplace} />
      <Input placeholder="Replace" onChange={onReplaceChange} icon="swap" />
      <Icon name="trash" onClick={onDeleteClick} />
    </div>
  )
}
