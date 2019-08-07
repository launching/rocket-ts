<template lang="pug">
.r-toolbar
  el-button(v-for="child in children" :key="child.text" v-if="premiseStatus[child.text]"
  :type="child.type" :size="child.size" :icon="child.icon"
  @click="handlerClick(child)") {{child.text}}
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import { ButtonItem } from '@/components/Interface';
@Component({})
export default class Toolbar extends Vue {
  @Prop(Object)
  readonly ctx?: object;

  @Prop({
    type: Array,
    default() {
      return [];
    },
  })
  readonly children!: Array<ButtonItem>;

  @Emit()
  async handlerClick(child: ButtonItem) {
    if (_.isFunction(child.action)) {
      await child.action(this.ctx);
    }
    return child;
  }

  premiseStatus: any = {};

  async premiseHandler(child: ButtonItem) {
    if (_.isFunction(child.premise)) {
      return child.premise(this.ctx);
    }
    return _.isUndefined(child.premise) ? true : child.premise;
  }

  @Watch('children', { immediate: true, deep: true })
  refreshPremise() {
    this.children.forEach(async (child) => {
      const status = await this.premiseHandler(child);
      this.$set(this.premiseStatus, child.text, status);
    });
  }
}
</script>
<style lang="stylus">
.r-toolbar
  display inline-block
</style>
