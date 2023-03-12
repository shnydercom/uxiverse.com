import { AnyEventObject, BaseActionObject, ResolveTypegenMeta, ServiceMap, State, TypegenDisabled } from "xstate";
import { FigmaSelectionList } from "../communicationInterfaces";
import { HostAppElement, MainMachineState } from "./mainMachine";

export type SelectorType = (emitted: State<MainMachineState, AnyEventObject, any, { value: any; context: MainMachineState; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => string;

export type HostSelectorType = (emitted: State<MainMachineState, AnyEventObject, any, { value: any; context: MainMachineState; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => HostAppElement[];
