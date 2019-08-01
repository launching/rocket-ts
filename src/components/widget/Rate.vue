<template lang="pug">
.r-w-rate 
  el-rate(v-model="store.value" :colors="colors" :max="max")
</template>
<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import BaseWidget from './BaseWidget';
import { ButtonItem } from '../Interface';
import RToolbar from '../toolBar/index.vue';
@Component({
  components: {
    RToolbar,
  },
})
export default class WInput extends Mixins(BaseWidget) {
  @Prop()
  colors?: Array<string> | string;

  @Prop()
  max?: number;
}
</script>
<style lang="stylus" scoped>
.r-w-rate
  display inline-block
  margin-top 8px
</style>
