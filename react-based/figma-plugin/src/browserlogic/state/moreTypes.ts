import {
  AnyEventObject,
  BaseActionObject,
  ResolveTypegenMeta,
  ServiceMap,
  State,
  TypegenDisabled,
} from 'xstate'
import { HostAppElement } from '../../communicationInterfaces'
import { MainMachineXSCtx } from './mainMachine'
import { RtLdGraph } from '@uxiverse.com/jsonld-tools'
import { AllMainMachineStateEvents } from './stateEvents'

export type SelectorType = (
  emitted: State<
    MainMachineXSCtx,
    AnyEventObject,
    any,
    { value: any; context: MainMachineXSCtx },
    ResolveTypegenMeta<
      TypegenDisabled,
      AnyEventObject,
      BaseActionObject,
      ServiceMap
    >
  >
) => string

export type HostSelectorType = (
  emitted: State<
    MainMachineXSCtx,
    AnyEventObject,
    any,
    { value: any; context: MainMachineXSCtx },
    ResolveTypegenMeta<
      TypegenDisabled,
      AnyEventObject,
      BaseActionObject,
      ServiceMap
    >
  >
) => HostAppElement[]

export type FocusSelectorType = (
  emitted: State<
    MainMachineXSCtx,
    AnyEventObject,
    any,
    { value: any; context: MainMachineXSCtx },
    ResolveTypegenMeta<
      TypegenDisabled,
      AnyEventObject,
      BaseActionObject,
      ServiceMap
    >
  >
) => HostAppElement | undefined

export type StateMatchSelectorType = (
  emitted: State<
    MainMachineXSCtx,
    AnyEventObject,
    any,
    { value: any; context: MainMachineXSCtx },
    ResolveTypegenMeta<
      TypegenDisabled,
      AnyEventObject,
      BaseActionObject,
      ServiceMap
    >
  >
) => boolean

export type SearchValueSelectorType = (
  emitted: State<
    MainMachineXSCtx,
    AnyEventObject,
    any,
    { value: any; context: MainMachineXSCtx },
    ResolveTypegenMeta<
      TypegenDisabled,
      AnyEventObject,
      BaseActionObject,
      ServiceMap
    >
  >
) => string | undefined
export type IsOpenSelectorType = (
  emitted: State<
    MainMachineXSCtx,
    AnyEventObject,
    any,
    { value: any; context: MainMachineXSCtx },
    ResolveTypegenMeta<
      TypegenDisabled,
      AnyEventObject,
      BaseActionObject,
      ServiceMap
    >
  >
) => boolean
export type GraphSelectorType = (
  emitted: State<
    MainMachineXSCtx,
    AnyEventObject,
    any,
    { value: any; context: MainMachineXSCtx },
    ResolveTypegenMeta<
      TypegenDisabled,
      AnyEventObject,
      BaseActionObject,
      ServiceMap
    >
  >
) => RtLdGraph | undefined

export type MainMachineSelectorArg = State<MainMachineXSCtx, AllMainMachineStateEvents, any, {
  value: any;
  context: MainMachineXSCtx;
}, ResolveTypegenMeta<TypegenDisabled, AllMainMachineStateEvents, BaseActionObject, ServiceMap>>