import Vue from 'vue';
import ElementUI from 'element-ui';

import { shallowMount, mount } from '@vue/test-utils';
import RInput from '@/components/widget/Input.vue';

Vue.use(ElementUI);

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
