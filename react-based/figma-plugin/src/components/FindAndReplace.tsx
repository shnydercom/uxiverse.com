import React, { MouseEventHandler, useCallback, useContext } from 'react'
import { Icon, Input } from 'react-figma-plugin-ds'
import { PluginContext } from '../browserlogic/context'
import { HoverableElements, PluginActionType } from '../browserlogic/state'

export const FindAndReplace = () => {
  const { dispatch } = useContext(PluginContext)

  const onPreviousClick = useCallback(() => {}, [])
  const onNextClick = useCallback(() => {}, [])
  const onOverwriteReplaceClick = useCallback(() => {}, [])
  const onConfirmReplaceClick = useCallback(() => {}, [])
  const onDeleteClick = useCallback(() => {}, [])

  //input fields

  const onSearchChange = useCallback(() => {}, [])

  const onReplaceChange = useCallback(
    (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: PluginActionType.UsrChangeReplaceInput,
        payload: value,
      })
    },
    []
  )

  const onElemHover: MouseEventHandler<
    HTMLButtonElement | HTMLInputElement
  > = useCallback(event => {
    switch (event.currentTarget.id) {
      case HoverableElements.btnPrevComponent:
      case HoverableElements.btnNextComponent:
      case HoverableElements.inputChangeReplace:
      case HoverableElements.inputCompName:
      case HoverableElements.btnCompTxtToReplace:
      case HoverableElements.btnExecReplace:
      case HoverableElements.btnClear:
        dispatch({
          type: PluginActionType.UsrHover,
          payload: event.currentTarget.id,
        })
      default:
        break
    }
  }, [])

  return (
    <div className="find-and-replace">
      <Icon
        name="caret-left"
        onClick={onPreviousClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          id: HoverableElements.btnPrevComponent,
        }}
      />
      <Input
        placeholder="Find element"
        onChange={onSearchChange}
        icon="search-large"
        onMouseOver={onElemHover}
        id={HoverableElements.inputCompName}
      />
      <Icon
        name="caret-right"
        onClick={onNextClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          id: HoverableElements.btnNextComponent,
        }}
      />

      <Icon
        name="caret-down"
        onClick={onOverwriteReplaceClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          id: HoverableElements.btnCompTxtToReplace,
        }}
      />

      <Icon
        name="play"
        onClick={onConfirmReplaceClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          id: HoverableElements.btnExecReplace,
        }}
      />
      <Input
        placeholder="Rename"
        onChange={onReplaceChange}
        icon="swap"
        onMouseOver={onElemHover}
        id={HoverableElements.inputChangeReplace}
      />
      <Icon
        name="trash"
        onClick={onDeleteClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          id: HoverableElements.btnClear,
        }}
      />
    </div>
  )
}
