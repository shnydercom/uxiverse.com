import { createMachine } from 'xstate'
import { DEFAULT_TOOLTIP } from '../components/TooltipBar'

export interface HostApplicationState {}

export interface PluginState {
  tooltip: string
  searchValue: string | undefined
  confirmedRenameParts: string[]
  hoveredDefinition: string | undefined
}

export interface MainMachineState {
  host: HostApplicationState
  plugin: PluginState
}

const mainMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOi+gLuqgDYDK+q+Y2EYAZqgK7H4AqA9uy+gA4DEACQDyANQCiAJQD6AVQCSUsQBkxAWUUA5VpMSge7WAXTtMukAA9EAWgCMAJhvYAzAAYAnAFYPADicAWOycAdiCnGwAaEABPaz8-bE8ANjs7EJsnf0yAXyzItCxcTCMSckpqWB4wAGN0OnQqji5CfmFxaXlFFXUxAA05VjN9Q0ITM0sEW3tsEO87bzdvRb8nXw9ImIQ3bBtvF0S-We8bN0SXPx8c3JBMdlp4JBB8nDxCEooqGnomFkbuHkGDEZRg9xlZXHZpstEjYPG5-MkghFotYPC4Eh5knYzkcnG5lkEPDk8hhnkVXmR3uVKjU6g1OH8AcNjKYQYgbDY0bNQkEDkFAjtEkF1ii0UkUtj0niVkTHiTCsUKWVGUCWaBQU47IlIU5obD4akkRtbCl0Zi-G4gi5ji4nISrk9lSNVRZrLa0TydTC4X4EYbrMd4mK7HifAtEv5LlkgA */
  createMachine<MainMachineState>({
  context: {
    host: {},
    plugin: {
      tooltip: DEFAULT_TOOLTIP,
      searchValue: undefined,
      confirmedRenameParts: [],
      hoveredDefinition: undefined,
    },
  },
  schema: {
    context: {} as MainMachineState,
    events: {} as { type: 'FOO' },
  },
  id: 'main',
  initial: 'initialState',
  states: {
    initialState: {
      initial: 'defaultTooltip',
      states: {
        defaultTooltip: {
          on: {
            HOVER_UI_ELEM_ENTER: {
              target: 'specificTooltip',
            },
          },
        },
        specificTooltip: {
          on: {
            HOVER_UI_ELEM_EXIT: {
              target: 'defaultTooltip',
            },
          },
        },
      },
    },
  },
})
