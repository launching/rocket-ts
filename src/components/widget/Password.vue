<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import Input from './Input.vue';
@Component({})
export default class WPassword extends Mixins(Input) {
  type: string = 'password';
}
</script>
