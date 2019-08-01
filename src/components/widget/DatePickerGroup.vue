<template lang="pug">
.r-date-picker-group
  el-col(:span="11")
    el-form-item(:prop="getStartName")
      el-date-picker(:type="type" v-model="store.value.start" style="width: 100%;")
  el-col.line(:span="2") -
  el-col(:span="11")
    el-form-item(:prop="getEndName")
      el-date-picker(:type="type" v-model="store.value.end" style="width: 100%;")
</template>
<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import { WidgetStore } from '@/components/Interface';
import BaseWidget from './BaseWidget';

@Component({})
export default class WDatePickerGroup extends Mixins(BaseWidget) {
  @Prop()
  type?: string;

  store: WidgetStore = {
    value: {
      start: '',
      end: '',
    },
  };

  get getStartName() {
    return `${this.name}.start`;
  }

  get getEndName() {
    return `${this.name}.end`;
  }

  resetFields() {
    this.store = {
      value: {
        start: '',
        end: '',
      },
    };

    if (this.defaultValue && this.defaultValue.start) {
      this.store.value.start = this.defaultValue.start;
    }
    if (this.defaultValue && this.defaultValue.end) {
      this.store.value.end = this.defaultValue.end;
    }
  }

  created() {
    if (this.defaultValue && this.defaultValue.start) {
      this.store.value.start = this.defaultValue.start;
    }
    if (this.defaultValue && this.defaultValue.end) {
      this.store.value.end = this.defaultValue.end;
    }

    if (this.validate) {
      this.initModelItemValidate(`${this.name}.end`, this.validate.end);
      this.initModelItemValidate(`${this.name}.start`, this.validate.start);
    }

    this.$emit('ready', this.name);
  }
}
</script>

<style lang="stylus" scoped>
.r-date-picker-group
  display inline

  .line
    text-align center
</style>
