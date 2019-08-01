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
import { Column, FormModel } from '@/components/Interface';
import BaseTable from './BaseTable.vue';
import RForm from '@/components/Form/Form.vue';
import RTableColumn from '@/components/Table/TableColumn.vue';
import _ from 'lodash';
@Component({
  components: {
    RForm,
    RTableColumn,
  },
})
export default class RLocalTable extends Mixins(BaseTable) {
  search(params: FormModel, page: number = 0) {
    this.filterData = {
      ...params,
    };
  }

  originData: Array<any> = [];

  async dataHandler() {
    return _.isFunction(this.data) ? this.data() : this.data;
  }

  @Watch('data', { immediate: true, deep: true })
  async refreshData() {
    this.loading = true;
    const res = await this.dataHandler();
    this.loading = false;
    if (!_.isArray(res)) {
      throw new Error('data is must be Array type');
    }
    this.originData = res;
  }

  get totalTable() {
    return this.originData.filter(item => {
      let temp = true;
      for (var key in this.filterData) {
        if (!this.filterData[key] && this.filterData[key] !== false) {
          continue;
        }

        if (_.isString(item[key])) {
          temp = temp && !!~(item[key] as string).indexOf(this.filterData[key]);
        } else {
          temp = temp && +item[key] === +this.filterData[key];
        }
      }
      return !!temp;
    });
  }

  get targetData() {
    const { page, pageSize } = this.pagination;
    return this.totalTable.slice((page - 1) * pageSize, pageSize * page);
  }

  get total() {
    return this.totalTable.length;
  }
}
</script>
<style lang="stylus" scoped>
.r-table
  .pagination-container
    padding 32px 16px
</style>
