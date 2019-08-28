import { Component, Prop, Vue, PropSync, Inject, Watch, Model } from 'vue-property-decorator';
import _ from 'lodash';
import { FormModel, FormItem, Validate, WidgetStore, ButtonItem } from '@/components/Interface';
@Component({})
export default class Comp extends Vue {
  @Prop()
  @Model('update:value')
  value?: any;

  targetOptions = [];
  @Prop(Boolean)
  disabled?: boolean;

  @Prop()
  options!: [{ value: string; label: string }];

  @Watch('store.value')
  onStoreValueChanged(val: any, oldVal: any) {
    this.$emit('update:value', val);
  }

  @Watch('value', { deep: true })
  refreshValue(val: any) {
    this.$set(this.store, 'value', val);
  }

  // 所有的信息都转异步
  async optionsHandler() {
    return _.isFunction(this.options) ? this.options() : this.options;
  }

  @Watch('option', { immediate: true, deep: true })
  async refreshOption() {
    const res: any = await this.optionsHandler();
    if (!Array(res)) {
      throw new Error('option is must be Array Type');
    }
    this.targetOptions = res.map((item: any) => {
      if (_.isString(item)) {
        return { label: item, value: 'item' };
      }

      return item;
    });
  }

  store: { value: any } = {
    value: this.value,
  };

  setValue(value: any) {
    this.store.value = value;
  }
}
