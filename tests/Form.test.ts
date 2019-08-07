import Vue from 'vue';
import ElementUI from 'element-ui';

import { shallowMount, mount } from '@vue/test-utils';
import RForm from '../src/components/Form/Form.vue';

Vue.use(ElementUI);

describe('RForm.vue', () => {
  const children = [
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
