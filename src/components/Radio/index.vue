<template lang="pug">
el-radio-group(v-model="store.value")
  el-radio(v-for="option in targetOptions" :key="option.label" :label="option.label")
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  PropSync,
  Inject,
  Watch,
  Model,
  Emit,
  Mixins,
} from 'vue-property-decorator';
import _ from 'lodash';
import { FormModel, FormItem } from '@/components/Interface';
import BaseComp from '../BaseComp';

@Component({})
export default class RRadio extends Mixins(BaseComp) {}
</script>
<style lang="stylus" scoped></style>
