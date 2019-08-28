<template lang="pug">
el-select(v-model="store.value" :disabled="disabled" :clearable="clearable")
  el-option(v-for="option in targetOptions" :key="option.label" :label="option.label" :value="option.value" )
</template>
<script lang="ts">
import { Component, Prop, Vue, PropSync, Inject, Watch, Model, Emit, Mixins } from 'vue-property-decorator';
import _ from 'lodash';
import { FormModel, FormItem } from '@/components/Interface';
import BaseComp from '../BaseComp';

@Component({})
export default class RRadio extends Mixins(BaseComp) {
  @Prop(Boolean)
  readonly clearable?: boolean;
}
</script>
<style lang="stylus" scoped></style>
