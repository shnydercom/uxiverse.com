import { AnyEventObject, BaseActionObject, ResolveTypegenMeta, ServiceMap, State, TypegenDisabled } from "xstate";
import { MainMachineState } from "./mainMachine";

export type SelectorType = (emitted: State<MainMachineState, AnyEventObject, any, { value: any; context: MainMachineState; }, ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>>) => string;