import * as React from 'react'
import { FindAndReplace } from './components/FindAndReplace'
import { OntologyResults } from './components/OntologyResults'
import { TooltipBar } from './components/TooltipBar'

export const PluginMainLayout = () => {
  return (
    <div className='main-layout'>
      <FindAndReplace
      /> 
      <OntologyResults />
      <TooltipBar/>
    </div>
  )
}
