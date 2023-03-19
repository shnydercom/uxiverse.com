import { AnyEventObject, BaseActionObject, ResolveTypegenMeta, ServiceMap, State, TypegenDisabled } from "xstate";
import { HostAppElement } from "../communicationInterfaces";
import { MainMachineState } from "./mainMachine";

export type SelectorType = (emitted: State<MainMachineState, AnyEventObject, any, { value: any; context: MainMachineState; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => string;

export type HostSelectorType = (emitted: State<MainMachineState, AnyEventObject, any, { value: any; context: MainMachineState; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => HostAppElement[];

export type FocusSelectorType = (emitted: State<MainMachineState, AnyEventObject, any, { value: any; context: MainMachineState; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => HostAppElement | undefined;

export type StateMatchSelectorType = (emitted: State<MainMachineState, AnyEventObject, any, { value: any; context: MainMachineState; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => boolean;


export type SearchValueSelectorType = (emitted: State<MainMachineState, AnyEventObject, any, { value: any; context: MainMachineState; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => string | undefined;