<template lang="pug">
  el-switch(v-model="store.value" :disabled="targetDisabled" type="string")
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import BaseWidget from './BaseWidget';

@Component({})
export default class WSwitch extends Mixins(BaseWidget) {
  store: { value: string | boolean | null } = {
    value: this.defaultValue || false,
  };
}
</script>
<style lang="stylus" scoped></style>
