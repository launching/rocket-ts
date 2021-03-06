<template lang="pug">
.r-form(:style="style")
  el-form(ref="form" v-bind="formProps")
    el-form-item(v-for="(child, $index) in targetChildren" :key="$index" :label="child.label" :prop="propName(child)" :required="child.required" :size="child.size")
      component(:is="itemType(child)"  v-bind="child" ref="widgets" @ready="widgetReady")
    el-form-item(:size="handlerSize")
      r-toolbar(:children="toolbar" @handler-click="toolbarHandler" :ctx="model")
</template>
<script lang="ts">
import { Component, Prop, Mixins, Vue, PropSync, Provide, ProvideReactive, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import { Form as ElForm } from 'element-ui';
import { FormModel, FormItem, ButtonItem, Validate, Visibility } from '@/components/Interface';
import widget from '@/components/widget';
import RToolbar from '@/components/toolBar/index.vue';

@Component({
  components: {
    ...widget,
    RToolbar,
  },
})
export default class RForm extends Mixins(Vue) {
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

  defaultModelCache?: any = {};

  async defaultModelHandler() {
    return _.isFunction(this.defaultModel) ? this.defaultModel() : this.defaultModel;
  }
  @Watch('defaultModel', { immediate: true, deep: true })
  async refreshDefaultModel() {
    const res = await this.defaultModelHandler();
    Object.keys(res).forEach((key: string) => {
      this.$set(this.model, key, res[key]);
      this.defaultModelCache[key] = _.cloneDeep(res[key]);
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
  visibles: Visibility = {};
  widgetList: Array<string> = [];

  get validateOnRuleChange(): boolean {
    return Object.keys(this.widget).some((key: string) => !this.widget[key]);
  }

  get formProps() {
    const { widgetList, toolbar, handlerSize, ...props } = this.$props;
    return {
      ...props,
      model: this.model,
      rules: this.rules,
      validateOnRuleChange: this.validateOnRuleChange,
    };
  }

  get targetChildren(): Array<FormItem> {
    return this.children.filter(item => {
      if (!_.isUndefined(this.visibles[item.name])) {
        return this.visibles[item.name];
      }
      return true;
    });
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

  @Provide()
  initItemVisible(name: string, value: any) {
    this.$set(this.visibles, name, value);
  }

  propName = (child: FormItem) => {
    const unPropWidget = ['datePickerGroup'];
    if (unPropWidget.indexOf(child.widget) > -1) return undefined;
    return child.name;
  };

  get style() {
    return {
      width: `${this.width}px`,
    };
  }

  itemType = (child: { widget: string }) => {
    const widget = child.widget || 'input';
    const widgetName = widget.replace(/([A-Z])/g, e => `-${e.toLowerCase()}`);
    return `w-${widgetName}`;
  };

  validate() {
    return new Promise((resolve, reject) => {
      const ref: ElForm = this.$refs.form as ElForm;
      ref.validate((valid: boolean) => (valid ? resolve(valid) : reject(valid)));
    });
  }

  validateField(name: string | [], callback: any) {
    const ref: any = this.$refs.form;
    ref.validateField(name, callback);
  }

  async submit() {
    const valid = await this.validate();
  }

  async cancel() {
    const form: ElForm = this.$refs.form as ElForm;
    const { widgets } = this.$refs;
    form.clearValidate();
    _.forEach(this.defaultModelCache, (value, key) => {
      this.changeModelItem(key, value);
    });
  }

  widget: { [name: string]: any } = {};

  widgetReady(name: string, defaultValue: any) {
    this.defaultModelCache[name] = _.cloneDeep(this.model[name]);
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
    this.children.forEach(item => this.$set(this.model, item.name, null));
  }
}
</script>
<style lang="stylus"></style>
