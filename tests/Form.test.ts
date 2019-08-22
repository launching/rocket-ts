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
    {
      label: '性别',
      widget: 'radio',
      name: 'sex'
    }
  ];

  it('render form', async () => {
    const wrapper = mount(RForm, {
      propsData: {
        children,
        defaultModel: () => { 
          return Promise.resolve({pass: '123',
          checkPass: '1234',
          age: '12',
          sex: '1'})
        }
      },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();

    wrapper.find('input[type="password"]').setValue('123')
    await wrapper.vm.$nextTick();

    const vm:any = wrapper.vm as RForm ;
    expect(vm.model.pass).toEqual('123');
  });
});
