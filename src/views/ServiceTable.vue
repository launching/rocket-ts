<template lang="pug">
.div
  r-service-table(:filter="filter" :columns="columns" :data="data" border fit hightlight-current-row :localPage="true" ref="table")
  r-form(v-bind="elForm")
</template>
<script>
import RServiceTable from '@/components/Table/ServiceTable.vue';
import RForm from '@/components/Form/Form.vue';
import Vue from 'vue';
import * as api from '@/api/articles';
export default {
  components: {
    RServiceTable,
    RForm,
  },
  data() {
    return {
      filter: {
        inline: true,
        children: [
          { widget: 'input', name: 'title' },
          {
            widget: 'select',
            name: 'importance',
            clearable: true,
            options: [
              {
                label: 1,
                value: 1,
              },
              {
                label: 2,
                value: 2,
              },
              {
                label: 3,
                value: 3,
              },
            ],
          },
          {
            widget: 'select',
            name: 'type',
            clearable: true,
            options: [
              { value: 'CN', label: 'China' },
              { value: 'US', label: 'USA' },
              { value: 'JP', label: 'Japan' },
              { value: 'EU', label: 'Eurozone' },
            ],
          },
        ],
        toolbar: [
          {
            icon: 'el-icon-search',
            type: 'primary',
            text: '搜索',
            action: 'SEARCH',
          },
          {
            text: '取消',
            action: 'CANCEL',
          },
          { icon: 'el-icon-edit', text: '添加', action() {} },
          { icon: 'el-icon-download', text: '导出', action() {} },
        ],
      },
      border: true,
      hightlightCurrentRow: true,
      fit: true,
      columns: [
        { label: '序号', name: 'id', width: '80' },
        { label: '时间', name: 'timestamp' },
        { label: '标题', name: 'title' },
        { label: '作者', name: 'author', width: '180' },
        { label: '重要性', name: 'importance', width: '110' },
        { label: '阅读数', name: 'pageviews', width: '95' },
        { label: '状态', name: 'status', type: 'tag', width: '100' },
        {
          label: '操作',
          type: 'toolbar',
          width: '230',
          children: [
            {
              type: 'primary',
              text: '编辑',
              size: 'mini',
              action: child => {
                this.elForm.defaultModel = child;
              },
            },
            {
              text: '草稿',
              size: 'mini',
              premise: child => child.status !== 'draft',
              action: child => this.handleModifyStatus(child, 'draft'),
            },
            {
              text: '删除',
              size: 'mini',
              type: 'danger',
              premise: child => child.status !== 'deleted',
              action: child => this.handleModifyStatus(child, 'deleted'),
            },
            {
              text: '发布',
              size: 'mini',
              type: 'success',
              premise: child => child.status !== 'published',
              action: child => this.handleModifyStatus(child, 'published'),
            },
          ],
        },
      ],
      data(params) {
        return api
          .getArticles({
            ...params.filter,
            page: params.pagination.page,
            limit: params.pagination.pageSize,
            sort: '+id',
          })
          .then(res => res.data);
      },
      elForm: {
        children: [
          {
            label: '类型',
            name: 'type',
            widget: 'select',
            defaultValue: 'CN',
            options: [
              { value: 'CN', label: 'China' },
              { value: 'US', label: 'USA' },
              { value: 'JP', label: 'Japan' },
              { value: 'EU', label: 'Eurozone' },
            ],
          },
          {
            label: '时间',
            name: 'timestamp',
            widget: 'datePicker',
            type: 'datetime',
          },
          { label: '标题', name: 'title', widget: 'input' },
          {
            label: '状态',
            name: 'status',
            widget: 'select',
            defaultValue: 'published',
            options: ['published', 'draft', 'deleted'],
          },
          {
            label: '重要性',
            name: 'importance',
            widget: 'rate',
            max: 3,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
          },
          { label: '点评', name: 'abstractContent', widget: 'textarea' },
        ],
        width: '460',
        labelWidth: '80px',
        defaultModel: {},
        toolbar: [
          {
            type: 'primary',
            text: '立即创建',
            action: 'SUBMIT',
          },
          {
            text: '取消',
            action: 'CANCEL',
          },
        ],
      },
    };
  },
  methods: {
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success',
      });
      row.status = status;
    },
  },
};
</script>
