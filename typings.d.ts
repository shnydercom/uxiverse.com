declare module "*.json" {
  const value: any;
  export default value;
}
declare module "*.scss" {
  const content: any;
  export default content;
}
declare module "*.css" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}
declare module "*.svg" {
  const content: any;
  export default content;
}

//convenience types
type ArrayElemType<T> = T extends (infer Elem)[] ? Elem : T;
