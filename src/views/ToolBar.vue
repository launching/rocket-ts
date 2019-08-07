<template lang="pug">
r-tool-bar(:children="toolbar")
</template>
<script>
import RToolBar from '../components/toolBar/index.vue';

export default {
  components: {
    RToolBar,
  },
  data() {
    return {
      toolbar: [
        {
          type: 'primary',
          text: '立即创建',
          action: 'SUBMIT',
          premise() {
            return true;
          },
        },
        {
          text: '新增域名',
          premise() {
            return new Promise((resolve) => {
              setTimeout(() => resolve(true), 1000);
            });
          },
          action: (child) => {
          },
        },
        {
          text: '取消',
          action: 'CANCEL',
          premise() {
            return Promise.resolve(true);
          },
        },
      ],
    };
  },
};
</script>
