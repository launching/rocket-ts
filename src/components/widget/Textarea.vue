<template lang="pug">
  el-input(v-model="store.value" :disabled="targetDisabled" type="textarea")
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import BaseWidget from './BaseWidget';

@Component({})
export default class WTextarea extends Mixins(BaseWidget) {}
</script>
