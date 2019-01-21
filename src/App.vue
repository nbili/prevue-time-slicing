<template>
  <div id="root">
    <div class="container">
      <div class="demo">
        <div style="display: block;">
          <Clock/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
import Clock from "./components/Clock";
export default {
  name: "app",
  components: {
    Clock
  },
  mounted() {}
};
</script>

<style>
</style>
