export interface FormModel {
  [name: string]: any;
}

export interface Validate {
  [name: string]: any;
}
export interface FormItem {
  name: string;
  widget: string;
  validate: Array<any> | object;
}

export interface ButtonItem {
  text: string;
  type: string;
  action: string | Function;
  premise: Function;
}

export interface WidgetStore {
  [name: string]: any;
}

export interface Column {
  label: string;
  name: string;
  type: string;
  children: any;
}
