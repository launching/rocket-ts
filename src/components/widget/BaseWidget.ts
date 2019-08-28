import { Component, Prop, Vue, Inject, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import { FormModel, Validate, WidgetStore, ButtonItem } from '@/components/Interface';
@Component({})
export default class Widget extends Vue {
  @Prop()
  readonly validate?: Validate | undefined;

  @Prop()
  readonly defaultValue?: any;

  @Prop({
    default() {
      return true;
    },
  })
  readonly visible?: any;

  @Prop({
    default() {
      return false;
    },
  })
  readonly disabled?: any;

  @Inject()
  readonly model!: FormModel;

  @Inject()
  changeModelItem: any;

  @Inject()
  initModelItemValidate: any;

  @Inject()
  initItemVisible: any;

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

  async visibleHandler() {
    return _.isFunction(this.visible) ? this.visible() : this.visible;
  }

  @Watch('visible', { immediate: true, deep: true })
  async refreshVisible() {
    let res = await this.visibleHandler();
    this.initItemVisible(this.name, res);
  }

  async disabledHandler() {
    return _.isFunction(this.disabled) ? this.disabled() : this.disabled;
  }

  @Watch('disabled', { immediate: true, deep: true })
  async refreshDisabled() {
    const res = await this.disabledHandler();
    this.targetDisabled = !!res;
  }

  store: WidgetStore = {
    value: '',
  };

  targetDisabled: boolean = false;

  created() {
    this.initModelItemValidate(this.name, this.validate);
    this.$emit('ready', this.name);
  }
}
