import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import LocalTable from '@/components/Table/LocalTable.vue';

import { shallowMount, mount } from '@vue/test-utils';

describe('LocalTable.vue', () => {
  const columns = [
    { label: '序号', name: 'id', width: '80' },
    { label: '时间', name: 'timestamp', width: '180' },
    { label: '标题', name: 'title', width: '150' },
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
        },
        {
          text: '草稿',
          size: 'mini',
        },
        {
          text: '删除',
          size: 'mini',
          type: 'danger',
        },
        {
          text: '发布',
          size: 'mini',
          type: 'success',
        },
      ],
    },
  ];

  const filter = {
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
      },
      { icon: 'el-icon-edit', text: '添加', action() {} },
      { icon: 'el-icon-download', text: '导出', action() {} },
    ],
  };

  const hightlightCurrentRow = true;

  const fit = true;

  const data: any = [];
  const border = true;

  it('localTable Snapshot', async () => {
    const wrapper = shallowMount(LocalTable, {
      propsData: {
        columns,
        filter,
        data,
        border,
        fit,
        hightlightCurrentRow,
      },
    });

    await wrapper.vm.$nextTick();
    // expect(wrapper.html()).toMatchSnapshot();
  });

  it('data is function', callback => {
    const wrapper = shallowMount(LocalTable, {
      propsData: {
        columns,
        filter,
        data() {
          return [
            {
              id: '1',
              timestamp: '212',
              title: '123',
              author: '12312',
              importance: '1232',
              pageviews: '124',
              status: '123',
            },
            {
              id: '2',
              timestamp: '212',
              title: '123',
              author: '12312',
              importance: '1232',
              pageviews: '124',
              status: '123',
            },
          ];
        },
        border,
        fit,
        hightlightCurrentRow,
      },
    });

    setTimeout(() => {
      // expect(wrapper.html()).toMatchSnapshot();
      let vm: any = wrapper.vm;
      expect(vm.targetData.length).toBe(2);
      callback();
    }, 200);
  });
});
