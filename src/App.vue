<template>
  <div id="app">
    <r-comp-list />
    <div id="nav">
      <router-link to="/">Form</router-link>| <router-link to="/toolbar">ToolBar</router-link>| <router-link to="/localtable">Localtable</router-link>|
      <router-link to="/servicetable">Servicetable</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import RCompList from '@/components/CompList/CompList.vue';
export default {
  components: { RCompList },
};
</script>
<style>
</style>
