/* global document, parent*/

import React from 'react'
import * as ReactDOM from 'react-dom'
import 'react-figma-plugin-ds/figma-plugin-ds.css'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import './ui.css'

import { PluginMainLayout } from './PluginMainLayout'
import { GlobalStateProvider } from './browserlogic/state/globalStateProvider'
import { OntologyProvider } from './browserlogic/naming-recommendations/OntologyProvider'

export interface FigmaPluginRootProps {}

const FigmaPluginRoot = (props: FigmaPluginRootProps) => {
  return (
    <GlobalStateProvider>
      <OntologyProvider>
        <PluginMainLayout />
      </OntologyProvider>
    </GlobalStateProvider>
  )
}

ReactDOM.render(<FigmaPluginRoot />, document.getElementById('react-page'))
