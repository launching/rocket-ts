<template lang="pug">
.r-input
  el-input( :type="type" v-model="store.value" :disabled="targetDisabled" autocomplete="off")
  r-toolbar(:children="toolbar" @handler-click="toolbarHandler" :ctx="this")
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
  type: string = 'string';

  @Prop()
  readonly toolbar?: Array<ButtonItem> | undefined;

  toolbarHandler(child: ButtonItem) {}
}
</script>
<style lang="stylus" scoped>
.r-input
  display inline
</style>
