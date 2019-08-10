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
  text: string| undefined;
  type: string |undefined;
  action: string | Function| undefined;
  premise: string | boolean | Function | undefined;
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
