<template lang="pug">
el-date-picker(:type="type" :disabled="targetDisabled" v-model="store.value"  )
</template>
<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import BaseWidget from './BaseWidget';
@Component({
  components: {},
})
export default class WDatePicker extends Mixins(BaseWidget) {
  @Prop()
  type?: string;
}
</script>
<style lang="stylus" scoped>
.r-input
  display inline
</style>
