import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import RToolbar from '../src/components/toolBar/index.vue';
// .add('with text', () => '<my-button>with text</my-button>')
//   .add('with emoji', () => '<my-button>😀 😎 👍 💯</my-button>')
//   .add('as a component', () => ({
//     components: { MyButton },
//     template: '<my-button :rounded="true">rounded</my-button>'
//   }));
storiesOf('RToolBar', module)
  .add('button', () => ({
    components: { RToolbar },
    template: '<r-toolbar children="[]" ></r-toolbar>',
  }));
