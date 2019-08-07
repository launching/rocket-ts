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
import { Column, FormModel } from '@/components/Interface';
import BaseTable from './BaseTable.vue';
import RForm from '@/components/Form/Form.vue';
import RTableColumn from '@/components/Table/TableColumn.vue';
@Component({
  components: {
    RForm,
    RTableColumn,
  },
})
export default class RServiceTable extends Mixins(BaseTable) {
  originData: Array<any> = [];

  total: number = 0;

  async dataHandler() {
    if (!_.isFunction(this.data)) {
      throw new Error('data params must be Function');
    }

    return this.data({
      filter: this.filterData,
      pagination: this.pagination,
    });
  }

  @Watch('data', { immediate: true, deep: true })
  async refreshData() {
    this.loading = true;
    const { items, total } = await this.dataHandler();
    this.loading = false;
    if (_.isArray(items) && _.isNumber(total)) {
      this.originData = items;
      this.total = total;
    } else {
      throw new Error('data must return Object {items:Array, total: number} ');
    }
  }

  @Watch('pagination', { deep: true })
  refreshPagination() {
    this.refreshData();
  }

  search(params: FormModel, page: number = 1): void {
    this.filterData = params;
    this.pagination = {
      ...this.pagination,
      page,
    };
  }

  get totalTable() {
    return this.originData;
  }

  get targetData() {
    return this.totalTable;
  }
}
</script>
<style lang="stylus" scoped>
.r-table
  .pagination-container
    padding 32px 16px
</style>
