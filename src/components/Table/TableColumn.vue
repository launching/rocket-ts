<template lang="pug">
el-table-column(:label="label" :align="align" :width="width")
  template(slot-scope="scope")
    r-toolbar( v-if="type==='toolbar'" :children="children" :ctx="scope.row")
    el-tag(v-else-if="type==='tag'") {{scope.row[name]}}
    span(v-else) {{ scope.row[name] }}
</template>
<script lang="ts">
import { Component, Prop, Vue, PropSync, Inject, Watch, Model, Emit } from 'vue-property-decorator';
import { Column, ButtonItem } from '@/components/Interface';

import RToolbar from '@/components/toolBar/index.vue';

@Component({
  components: { RToolbar },
})
export default class RTable extends Vue {
  @Prop({})
  label?: string;

  @Prop({})
  align?: string;

  @Prop({})
  width?: string;

  @Prop({})
  name?: string;

  @Prop({})
  type?: string;

  @Prop({})
  children?: Array<ButtonItem>;
}
</script>
