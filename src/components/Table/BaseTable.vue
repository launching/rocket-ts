<template lang="pug">
.r-table
  r-form(v-if="filter" v-bind="filter" ref="filter" @searchClick="search" @cancelClick="search")
  el-table(:data="targetData" :border="border" :fit="fit" :hightlight-current-row="hightlightCurrentRow" v-loading="loading")
    r-table-column(v-for="(column, $index) in columns" :key="$index"
    :label="column.label" :align="column.align" :width="column.width" :name="column.name" :type="column.type" :children="column.children")
  .pagination-container(v-if="localPage")
    el-pagination(layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 40]" :page-size.sync="pagination.pageSize"  background :total.sync="total" :current-page.sync="pagination.page"  )
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  PropSync,
  Inject,
  Watch,
  InjectReactive,
} from 'vue-property-decorator';
import {
  FormModel,
  FormItem,
  Validate,
  WidgetStore,
  ButtonItem,
  Column,
} from '@/components/Interface';

@Component({})
export default class BaseTable extends Vue {
  @Prop({})
  readonly filter?: object | undefined;

  @Prop({})
  readonly columns?: Column;

  @Prop({
    default() {
      return [];
    },
  })
  readonly data!: Array<any>;

  @Prop({})
  readonly border?: boolean;

  @Prop({ default: true })
  readonly localPage?: boolean;

  @Prop({})
  readonly hightlightCurrentRow?: boolean;

  @Prop({})
  readonly fit?: boolean;

  pagination = {
    pageSize: 10,
    page: 1,
  };

  loading: boolean = false;

  filterData: FormModel = {};

  search(params: FormModel, page: number = 0) {}

  get totalTable(): Array<any> {
    return [];
  }

  get targetData(): Array<any> {
    return [];
  }
}
</script>
