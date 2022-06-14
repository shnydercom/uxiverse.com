/* global document, parent*/

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Text, Input, Title, Button } from 'react-figma-plugin-ds'
import 'react-figma-plugin-ds/figma-plugin-ds.css'
import './ui.css'

import OtherApp from './App'

declare function require(path: string): string

export interface FigmaPluginRootProps {}

const FigmaPluginRoot = (props: FigmaPluginRootProps) => {
  const [count, setCount] = React.useState(5)
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
  }

  return (
    <div>
      <img src={require('./logo.svg')} />
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
      </Button>
    </div>
  )
}

ReactDOM.render(<FigmaPluginRoot />, document.getElementById('react-page'))
