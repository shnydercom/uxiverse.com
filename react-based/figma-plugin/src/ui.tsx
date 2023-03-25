/* global document, parent*/

import React from 'react'
import * as ReactDOM from 'react-dom'
import 'react-figma-plugin-ds/figma-plugin-ds.css'
import "overlayscrollbars/css/OverlayScrollbars.css";
import './ui.css'

import { PluginMainLayout } from './PluginMainLayout'
import { GlobalStateProvider } from './browserlogic/state/globalStateProvider';

export interface FigmaPluginRootProps { }

const FigmaPluginRoot = (props: FigmaPluginRootProps) => {
  return (
    <>
      <GlobalStateProvider>
        <PluginMainLayout />
      </GlobalStateProvider>
    </>
  )
}

ReactDOM.render(<FigmaPluginRoot />, document.getElementById('react-page'))
