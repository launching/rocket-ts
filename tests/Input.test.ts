import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import RInput from '@/components/widget/Input.vue';

import { shallowMount, mount } from '@vue/test-utils';

describe('RInput.vue', () => {
  it('render form', async () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        name: 'name',
      },
      provide: {
        model: { name: '' },
        changeModelItem: () => {},
        initModelItemValidate: () => {},
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
