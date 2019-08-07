<template lang="pug">
r-checkbox(v-model="store.value" :options="options" :name="name" ref="checkbox")
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import BaseWidget from './BaseWidget';
import RCheckbox from '../Checkbox/Checkbox.vue';

@Component({
  components: {
    RCheckbox,
  },
})
export default class WCheckbox extends Mixins(BaseWidget) {
  store: any = {
    value: this.defaultValue || [],
  };

  resetFields() {
    const checkbox = this.$refs.checkbox as RCheckbox;
    checkbox.setValue(this.defaultValue || []);
  }
}
</script>
<style lang="stylus" scoped></style>
