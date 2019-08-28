/* eslint none */
<template lang="pug">
  .home
    
    //- r-radio(v-model="labelPosition" :options="options")
    div 动态增减表单项
    //- r-form(class="self-form" :inline="true" :children="childrenSelf" :label-position="labelPosition" label-width="80px" :toolbar="toolbar" :status-icon="true" size="mini" handlerSize="large" ref="selfForm")
    div 自定义校验规则
    //- r-form(:children="childrenLogin" width="460" :label-position="labelPosition" label-width="80px" :toolbar="toolbar" :status-icon="true" ref="loginForm")
    div 基本表单
    r-form(:children="children" width="460" :label-position="labelPosition" label-width="80px" :toolbar="toolbar" :defaultModel="defaultModel")
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import RForm from '@/components/Form/Form.vue';
import RCompList from '@/components/CompList/CompList.vue';
import RRadio from '@/components/Radio/index.vue';
import { ButtonItem } from '@/components/Interface';
export default {
  components: {
    RForm,
    RRadio,
    RCompList,
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      let model = this.$refs.loginForm.model;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (model.checkPass !== '') {
          this.$refs.loginForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      let model = this.$refs.loginForm.model;
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== model.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'right',
      options() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve([{ label: 'left' }, { label: 'right' }, { label: 'top' }]);
          }, 1000);
        });
      },
      defaultModel() {
        return Promise.resolve({
          name: '张三',
          region: 'beijing',
          date: { start: 2564193555828, end: 2564193555828 },
          delivery: false,
          type: ['线下主题活动'],
          resource: '线下场地免费',
          desc: '活动形式2',
        });
      },
      children: [
        {
          label: '活动名称',
          widget: 'input',
          name: 'name',
          defaultValue: '张瀚',
          disabled: true,
          validate: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur',
            },
          ],
        },
        {
          label: '活动区域',
          widget: 'select',
          name: 'region',
          disabled: true,
          defaultValue: 'shanghai',
          options() {
            return new Promise(resolve => {
              resolve([{ label: '区域一', value: 'shanghai' }, { label: '区域二', value: 'beijing' }]);
            });
          },
          validate: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        },
        {
          label: '活动时间',
          widget: 'datePickerGroup',
          name: 'date',
          type: 'date',
          disabled: true,
          required: true,
          defaultValue: {
            start: Date.now(),
            end: Date.now(),
          },
          validate: {
            start: [
              {
                type: 'date',
                required: true,
                message: '请选择日期',
                trigger: 'change',
              },
            ],
            end: [
              {
                type: 'date',
                required: true,
                message: '请选择时间',
                trigger: 'change',
              },
            ],
          },
        },
        {
          label: '即时配送',
          widget: 'switch',
          disabled: true,
          defaultValue: true,
          name: 'delivery',
        },
        {
          label: '活动性质',
          disabled: true,
          widget: 'checkbox',
          name: 'type',
          defaultValue: ['地推活动'],
          options() {
            return new Promise(resolve => {
              resolve([{ label: '美食/餐厅线上活动' }, { label: '地推活动' }, { label: '线下主题活动' }, { label: '单纯品牌曝光' }]);
            });
          },
          validate: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个活动性质',
              trigger: 'change',
            },
          ],
        },
        {
          label: '特殊资源',
          widget: 'radio',
          disabled: true,
          defaultValue: '线上品牌商赞助',
          name: 'resource',
          emum: 'system.sex',
          options() {
            return new Promise(resolve => {
              resolve([{ label: '线上品牌商赞助' }, { label: '线下场地免费' }]);
            });
          },
          validate: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
        },
        {
          label: '活动形式',
          widget: 'textarea',
          disabled: true,
          name: 'desc',
          defaultValue: '活动形式',
          validate: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
        },
      ],
      childrenLogin: [
        {
          label: '密码',
          widget: 'password',
          name: 'pass',
          validate: [{ validator: validatePass, trigger: 'blur' }],
        },
        {
          label: '确认密码',
          widget: 'password',
          name: 'checkPass',
          validate: [{ validator: validatePass2, trigger: 'blur' }],
        },
        {
          label: '年龄',
          widget: 'number',
          name: 'age',
          validate: [{ validator: checkAge, trigger: 'blur' }],
        },
      ],

      domain: {
        label: '域名',
        widget: 'input',
        name: Date.now().toString(),
        validate: [{ required: true, message: '域名不能为空', trigger: 'blur' }],
        toolbar: [
          {
            text: '删除',
            action: child => {
              console.dir(child.name);
              this.childrenSelf = this.childrenSelf.filter(item => {
                return item.name !== child.name;
              });
            },
          },
        ],
      },
      childrenSelf: [
        {
          label: '邮箱',
          widget: 'input',
          name: 'email',
          validate: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ],
        },
        {
          size: 'large',
          label: '域名',
          widget: 'input',
          name: Date.now().toString(),
          validate: [{ required: true, message: '域名不能为空', trigger: 'blur' }],
          toolbar: [
            {
              text: '删除',
              action: child => {
                this.childrenSelf = this.childrenSelf.filter(item => {
                  return item.name !== child.name;
                });
              },
            },
          ],
        },
      ],
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
    };
  },
};
</script>
<style lang="stylus">
.self-form
  /deep/ .el-input
    margin-right 10px
    width 270px
    vertical-align top
</style>
