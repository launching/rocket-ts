<template lang="pug">
el-dialog(:title="title", :visible.sync="store.visibleShow")
  r-form( v-if="store.visibleShow" v-bind="form" @cancelClick="close" )
</template>
<script lang="ts">
import { Component, Vue, Mixins, Prop, Watch } from 'vue-property-decorator';
import RForm from '../Form/Form.vue';
import _ from 'lodash';
@Component({
  components: {
    RForm,
  },
})
export default class DialogForm extends Mixins(Vue) {
  @Prop(String)
  title?: string;

  store = {
    visibleShow: false,
  };

  @Prop(Object)
  form?: object;

  open = () => {
    this.store.visibleShow = true;
  };

  close = () => {
    this.store.visibleShow = false;
  };
}
</script>