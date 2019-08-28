<template lang="pug">
r-radio(v-model="store.value" :disabled="targetDisabled" :options="options" ref="radio")
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import RRadio from '../Radio/index.vue';
import BaseWidget from './BaseWidget';

@Component({
  components: {
    RRadio,
  },
})
export default class WRadio extends Mixins(BaseWidget) {
  resetFields() {
    const radio = this.$refs.radio as RRadio;
    radio.setValue(this.defaultValue || '');
  }
}
</script>
<style lang="stylus" scoped></style>
