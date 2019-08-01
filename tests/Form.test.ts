import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import RForm from '../src/components/Form/Form.vue';

import { shallowMount, mount } from '@vue/test-utils';

describe('RForm.vue', () => {
  let children = [
    {
      label: '密码',
      widget: 'password',
      name: 'pass',
    },
    {
      label: '确认密码',
      widget: 'password',
      name: 'checkPass',
    },
    {
      label: '年龄',
      widget: 'number',
      name: 'age',
    },
  ];

  it('render form', async () => {
    const wrapper = shallowMount(RForm, {
      propsData: {
        children,
      },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
