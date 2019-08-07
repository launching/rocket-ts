import { Component, Prop, Vue, PropSync, Inject, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import { FormModel, FormItem, Validate, WidgetStore, ButtonItem } from '@/components/Interface';
@Component({})
export default class Widget extends Vue {
  @Prop()
  readonly validate?: Validate | undefined;

  @Prop()
  readonly defaultValue?: any;

  @Prop()
  readonly toolbar?: Array<ButtonItem> | undefined;

  @Inject()
  readonly model!: FormModel;

  @Inject()
  changeModelItem: any;

  @Inject()
  initModelItemValidate: any;

  @Prop(String)
  name!: string;

  @Prop()
  options!: [{ value: string; label: string }];

  @Watch('defaultValue', { immediate: true, deep: true })
  defaultValueHandle(val: any) {
    this.$set(this.store, 'value', val);
  }

  @Watch('model', { deep: true })
  refreshModel(val: any) {
    if (val[this.name] !== undefined) this.$set(this.store, 'value', val[this.name]);
  }

  @Watch('store.value', { immediate: true, deep: true })
  onStoreValueChanged(val: string, oldVal: string) {
    this.changeModelItem(this.name, val);
  }

  store: WidgetStore = {
    value: '',
  };

  // resetFields() {
  //   this.$set(this.store, 'value', this.defaultValue);
  // }

  created() {
    this.initModelItemValidate(this.name, this.validate);
    this.$emit('ready', this.name);
  }

  mounted() {
    return { name: this.name };
  }
}
