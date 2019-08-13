<template lang="pug">
.rv-login
  r-form( :children="children" :toolbar="toolbar" width="500" :defaultModel="defaultModel")
</template>
<script lang="ts">
import { Component, Prop, Vue, PropSync, Inject, Watch, Model, Emit, Mixins } from 'vue-property-decorator';
import RForm from '@/components/Form/Form.vue';
import { FormModel } from '@/components/Interface';
import { isValidUsername } from '@/utils/validate';

@Component({
  components: {
    RForm,
  },
})
export default class RVLogin extends Mixins(Vue) {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidUsername(value)) {
      callback(new Error('Please enter the correct user name'));
    } else {
      callback();
    }
  };
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'));
    } else {
      callback();
    }
  };

  defaultModel = {
    name: 'admin',
    password: '123456',
  };

  children = [
    {
      label: '用户名',
      name: 'name',
      widget: 'input',
      validate: [
        {
          required: true,
          trigger: 'blur',
        },
        {
          validator: this.validateUsername,
          trigger: 'blur',
        },
      ],
    },
    {
      label: '密码',
      name: 'password',
      widget: 'password',
      validate: [
        {
          required: true,
          trigger: 'blur',
        },
        { validator: this.validatePassword, trigger: 'blur' },
      ],
    },
  ];
  toolbar = [
    {
      type: 'primary',
      text: '登陆',
      action: (model: FormModel) => {
        console.dir(model);
      },
    },
  ];
}
</script>