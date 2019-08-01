<template lang="pug">
.r-input
  el-input( :type="type" v-model="store.value" autocomplete="off")
  r-toolbar(:children="toolbar" @handler-click="toolbarHandler" :ctx="this")
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
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

  toolbarHandler(child: ButtonItem) {
    console.dir(child.text);
  }
}
</script>
<style lang="stylus" scoped>
.r-input
  display inline
</style>
