import Vue from 'vue';
import ElementUI from 'element-ui';

import { shallowMount, mount } from '@vue/test-utils';
import RToolBar from '@/components/toolBar/index.vue';
import { ButtonItem } from '@/components/Interface';

Vue.use(ElementUI);

describe('ToolBar.vue', () => {
  const globalToolbar = [
    {
      type: 'primary',
      text: '立即创建',
      action: () => {},
    },
    {
      text: '新增域名',
      action: 'SUBMIT',
    },
    {
      text: '取消',
      action: 'CANCEL',
    },
  ];

  it('rend button', async () => {
    const wrapper = shallowMount(RToolBar, {
      propsData: {
        children: globalToolbar,
      },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('click button targget click', async () => {
    const action = jest.fn();
    globalToolbar[0].action = action;
    const wrapper = mount(RToolBar, {
      propsData: {
        children: globalToolbar,
      },
    });

    await wrapper.vm.$nextTick();

    const button = wrapper.find('button');
    button.trigger('click');
    expect(action).toHaveBeenCalled();
  });

  it('premise is undefined button is show', async () => {
    const wrapper = mount(RToolBar, {
      propsData: {
        children: globalToolbar,
      },
    });
    await wrapper.vm.$nextTick();
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(3);
  });

  it('premise is true button is show', async () => {
    const toolbar = [
      {
        text: '新增域名',
        action: 'SUBMIT',
        premise: () => true,
      },
    ];
    const wrapper = mount(RToolBar, {
      propsData: {
        children: toolbar,
      },
    });
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(1);
  });

  it('premise is true button is hidden', async () => {
    const toolbar = [
      {
        text: '新增域名',
        action: 'SUBMIT',
        premise() {
          return true;
        },
      },
      {
        text: '域名',
        action: 'SUBMIT',
        premise() {
          return false;
        },
      },
    ];

    const wrapper = mount(RToolBar, {
      propsData: {
        children: toolbar,
      },
    });
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(1);
  });

  it('premise is promise hidden button is hidden', (callback) => {
    const toolbar = [
      {
        text: '新增域名',
        action: 'SUBMIT',
        premise() {
          return Promise.resolve(true);
        },
      },
      {
        text: '域名',
        action: 'SUBMIT',
        premise() {
          return Promise.resolve(false);
        },
      },
    ];
    const wrapper = mount(RToolBar, {
      propsData: {
        children: toolbar,
      },
    });

    setTimeout(() => {
      const buttons = wrapper.findAll('button');
      expect(buttons.length).toBe(1);
      callback();
    }, 100);
  });

  it('premise is Promise true after 1000s', (callback) => {
    const toolbar = [
      {
        text: '新增域名',
        action: 'SUBMIT',
        premise() {
          return new Promise((resolve) => {
            setTimeout(() => resolve(true), 1000);
          });
        },
      },
    ];
    const wrapper = mount(RToolBar, {
      propsData: {
        children: toolbar,
      },
    });

    setTimeout(() => {
      const buttons = wrapper.findAll('button');
      expect(buttons.length).toBe(1);
      callback();
    }, 1100);
  });
});
