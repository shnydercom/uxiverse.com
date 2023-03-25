import { AnyEventObject, BaseActionObject, ResolveTypegenMeta, ServiceMap, State, TypegenDisabled } from "xstate";
import { HostAppElement } from "../../communicationInterfaces";
import { MainMachineXSCtx } from "./mainMachine";

export type SelectorType = (emitted: State<MainMachineXSCtx, AnyEventObject, any, { value: any; context: MainMachineXSCtx; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => string;

export type HostSelectorType = (emitted: State<MainMachineXSCtx, AnyEventObject, any, { value: any; context: MainMachineXSCtx; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => HostAppElement[];

export type FocusSelectorType = (emitted: State<MainMachineXSCtx, AnyEventObject, any, { value: any; context: MainMachineXSCtx; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => HostAppElement | undefined;

export type StateMatchSelectorType = (emitted: State<MainMachineXSCtx, AnyEventObject, any, { value: any; context: MainMachineXSCtx; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => boolean;


export type SearchValueSelectorType = (emitted: State<MainMachineXSCtx, AnyEventObject, any, { value: any; context: MainMachineXSCtx; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => string | undefined;
export type IsOpenSelectorType = (emitted: State<MainMachineXSCtx, AnyEventObject, any, { value: any; context: MainMachineXSCtx; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => boolean;