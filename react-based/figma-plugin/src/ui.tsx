/* global document, parent*/

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'react-figma-plugin-ds/figma-plugin-ds.css'
import "overlayscrollbars/css/OverlayScrollbars.css";
import './ui.css'

import { PluginMainLayout } from './PluginMainLayout'
import { PluginContext } from './browserlogic/context'
import { initialState, pluginReducer } from './browserlogic/state'

declare function require(path: string): string

export interface FigmaPluginRootProps {}

const FigmaPluginRoot = (props: FigmaPluginRootProps) => {
  /* const [count, setCount] = React.useState(5)
  const onInputChange = (value, event) => {
    setCount(event.target.value)
  }

  const onCreate = event => {
    event.preventDefault()
    parent.postMessage(
      { pluginMessage: { type: 'create-rectangles', count } },
      '*'
    )
  }

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }*/
  const [state, dispatch] = React.useReducer(pluginReducer, initialState)

  return (
    <>
      <PluginContext.Provider value={{ state, dispatch }}>
        <PluginMainLayout />
      </PluginContext.Provider>
      {/*<img src={require('./logo.svg')} />
      <Title level="h1" size="xlarge" weight="bold">
        Icon Maker
      </Title>
      <Text size="small">Count:</Text>
      <Input
        type="text"
        defaultValue="5"
        icon="frame"
        iconColor="blue"
        placeholder="helloIAmAPlaceholder"
        onChange={onInputChange}
      />
      <Button onClick={onCreate}>Create</Button>
      <Button isSecondary onClick={onCancel}>
        Cancel
  </Button>*/}
    </>
  )
}

ReactDOM.render(<FigmaPluginRoot />, document.getElementById('react-page'))
