<template>
  <div class="remaining-value-counts column grow">
    <remaining-value-counts-line v-for="n in 9" :key="n" :value="n"/>
    <p>{{totalRemainingValues}} cells left</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import RemainingValueCountsLineComponent from './remaining-value-counts-line';

  export default Vue.extend({
    name: 'remainingValueCounts',
    components: {
      remainingValueCountsLine: RemainingValueCountsLineComponent
    },
    computed: {
      ...mapGetters(['totalRemainingValues'])
    }
  });
</script>
