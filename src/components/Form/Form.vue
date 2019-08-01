<template lang="pug">
.r-form(:style="style")
  el-form(:model="model" :label-width="labelWidth" :inline="inline" :label-position="labelPosition" ref="form" :rules="rules" :validateOnRuleChange="validateOnRuleChange" :status-icon="statusIcon" :size="size") 
    el-form-item(v-for="(child, $index) in children" :key="$index" :label="child.label" :prop="propName(child)" :required="child.required" :size="child.size")
      component(:is="itemType(child)"  v-bind="child")
    el-form-item(:size="handlerSize")
      r-toolbar(:children="toolbar" @handler-click="toolbarHandler" :ctx="model")
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  PropSync,
  Provide,
  ProvideReactive,
  Watch,
} from 'vue-property-decorator';
import {
  FormModel,
  FormItem,
  ButtonItem,
  Validate,
} from '@/components/Interface';
// import { Form as ElForm } from 'element-ui';
import _ from 'lodash';
import RInput from '@/components/widget/Input.vue';
import RSelect from '@/components/widget/Select.vue';
import RCheckbox from '@/components/widget/Checkbox.vue';
import RRadio from '@/components/widget/Radio.vue';
import RSwitch from '@/components/widget/Switch.vue';
import RTextarea from '@/components/widget/Textarea.vue';
import RPassword from '@/components/widget/Password.vue';
import RNumber from '@/components/widget/Number.vue';
import RDatePicker from '@/components/widget/DatePicker.vue';
import RDatePickerGroup from '@/components/widget/DatePickerGroup.vue';
import RRate from '@/components/widget/Rate.vue';
import RToolbar from '@/components/toolBar/index.vue';
import { ElementUIComponent } from 'element-ui/types/component';
// import BaseWidget from '@/components/widget/BaseWidget';
@Component({
  components: {
    RInput,
    RSelect,
    RCheckbox,
    RRadio,
    RSwitch,
    RDatePicker,
    RDatePickerGroup,
    RToolbar,
    RTextarea,
    RPassword,
    RNumber,
    RRate,
  },
})
export default class Form extends Vue {
  @Prop(Array)
  readonly children!: Array<FormItem>;

  @Prop(String)
  readonly labelWidth?: String;

  @Prop({
    default() {
      return {};
    },
  })
  readonly defaultModel?: any;

  async defaultModelHandler() {
    return _.isFunction(this.defaultModel)
      ? this.defaultModel()
      : this.defaultModel;
  }
  @Watch('defaultModel', { immediate: true, deep: true })
  async refreshDefaultModel(val: any) {
    const res = await this.defaultModelHandler();
    Object.keys(res).forEach(key => {
      this.$set(this.model, key, res[key]);
    });
  }

  @Prop(Array)
  readonly toolbar?: Array<ButtonItem>;

  @Prop(String)
  readonly width?: string;

  @Prop(Boolean)
  readonly statusIcon?: boolean;

  @Prop(Boolean)
  readonly inline?: boolean;

  @Prop(String)
  readonly labelPosition?: string;

  @Prop(String)
  readonly size?: string;

  @Prop(String)
  readonly handlerSize?: string;

  rules: Validate = {};

  widgetList: Array<string> = [];

  get validateOnRuleChange(): boolean {
    return Object.keys(this.widget).some((key: string) => !this.widget[key]);
  }

  @Provide()
  model: FormModel = {};

  @Provide()
  changeModelItem(name: string, value: any) {
    this.$set(this.model, name, value);
  }

  @Provide()
  initModelItemValidate(name: string, value: any) {
    this.$set(this.rules, name, value);
  }

  propName(child: FormItem): string | undefined {
    const unPropWidget = ['datePickerGroup'];
    if (~unPropWidget.indexOf(child.widget)) return undefined;
    return child.name;
  }

  get style() {
    return {
      width: `${this.width}px`,
    };
  }

  itemType(child: { widget: string }): string {
    child.widget = child.widget || 'input';
    const widgetName = child.widget.replace(
      /([A-Z])/g,
      e => `-${e.toLowerCase()}`
    );
    return `r-${widgetName}`;
  }

  validate() {
    return new Promise((resolve, reject) => {
      const ref: any = this.$refs.form;
      ref.validate((valid: boolean) =>
        valid ? resolve(valid) : reject(valid)
      );
    });
  }
  validateField(name: string | [], callback: any) {
    const ref: any = this.$refs.form;
    ref.validateField(name, callback);
  }
  async submit() {
    try {
      const valid = await this.validate();
    } catch (e) {}
  }

  cancel() {
    const form: any = this.$refs.form;
    const widgets: any = this.$refs.widgets;
    if (Array.isArray(widgets)) {
      widgets.forEach(item => item.resetFields());
    } else {
      widgets.resetFields();
    }
    form.resetFields();
  }

  widget: { [name: string]: any } = {};
  widgetReady(name: string) {
    this.widget[name] = {
      ...this.widget[name],
    };
  }

  async toolbarHandler(child: ButtonItem) {
    if (child.action === 'SUBMIT') {
      this.submit();
    } else if (child.action === 'CANCEL') {
      this.cancel();
      this.$emit('cancelClick', this.model);
    } else if (child.action === 'SEARCH') {
      this.$emit('searchClick', this.model);
    }
  }

  created() {
    this.children.forEach(item => {
      this.$set(this.model, item.name, null);
    });
  }
}
</script>
<style lang="stylus"></style>
