<template lang="pug">
el-checkbox-group(v-model="store.value")
  el-checkbox(:label="option.label" :name="name" v-for="(option, $index) in targetOptions" :key="option.label")
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
import { FormModel, FormItem } from '@/components/Interface';
import _ from 'lodash';
import BaseComp from '../BaseComp';

@Component({})
export default class RRCheckbox extends Mixins(BaseComp) {
  @Prop()
  name!: string;
}
</script>

