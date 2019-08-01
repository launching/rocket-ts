<template lang="pug">
r-select(v-model="store.value" :options="options" :clearable="clearable" ref="select")
</template>
<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import BaseWidget from './BaseWidget';
import RSelect from '../Select/Select.vue';
@Component({
  components: {
    RSelect,
  },
})
export default class WSelect extends Mixins(BaseWidget) {
  @Prop(Boolean)
  readonly clearable?: boolean;

  resetFields() {
    const select = this.$refs.select as RSelect;
    select.setValue(this.defaultValue || '');
  }
}
</script>
<style lang="stylus" scoped></style>
