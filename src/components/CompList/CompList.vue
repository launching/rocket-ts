<template lang="pug">
.r-comp-list(draggable="true" @drag.native="drag" style="style")
  el-button(@click="clickComp" class="el-button") COMP
  el-drawer(
    close-on-press-escape 
    model="false" 
    :append-to-body="true"  
    direction="rtl" 
    size="30%" 
    title="editor" 
    :visible.sync="store.show")
    el-tabs(type="card")
      el-tab-pane(label="widgets")
        el-tree(:data="widgetTree")

</template>
<script>
import _ from 'lodash';
import Widgets from '../widget';
console.dir(Widgets);
export default {
  components: {},
  data() {
    return {
      widgetTree: [],
      store: { show: false },
      style: {},
    };
  },
  methods: {
    clickComp() {
      this.store.show = true;
    },
    drag(e) {
      console.dir(e);
      e.preventDefault();
    },
  },
  created() {
    const widgetTree = [];
    Object.keys(Widgets).map(key => {
      const item = {};
      item.id = `widget-${key}`;
      item.label = key;
      item.children = _.map(Widgets[key].options.props, (item, key) => {
        return {
          id: 'widget-${key}-${key}',
          label: key,
        };
      });
      widgetTree.push(item);
    });

    this.widgetTree = widgetTree;
  },
};
</script>
<style lang="stylus">
.r-comp-list
  position fixed
  right:10px
</style>
