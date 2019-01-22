<template>
  <div>
    <div style="display: flex;">
      <div style="flex: 1;">
        <Frappe
          id="bar"
          ref="bar"
          :labels="labels"
          title="Bar Chart"
          type="axis-mixed"
          :height="300"
          :axisOptions="{xAxisMode: 'tick'}"
          :colors="['#fff489', '#fa57c1', '#b166cc', '#7572ff', '#69a6f9']"
          :dataSets="barData"
        />
      </div>
      <div style="flex: 1;">
        <Frappe
          id="line"
          ref="line"
          :labels="labels"
          title="Line Chart"
          type="axis-mixed"
          :height="300"
          :axisOptions="{xAxisMode: 'tick'}"
          :colors="['#fa57c1', '#b166cc', '#7572ff', '#69a6f9']"
          :dataSets="lineData"
        />
      </div>
    </div>
    <div>
      <Frappe
        id="area"
        ref="area"
        :labels="labels"
        title="area Chart"
        type="axis-mixed"
        :height="300"
        :axisOptions="{xAxisMode: 'tick'}"
        :colors="['#7572ff', '#69a6f9']"
        :lineOptions="{hideDots: 1, heatline: 1, regionFill: 1}"
        :dataSets="areaData"
      />
    </div>
  </div>
</template>

<script>
import Frappe from "./Frappe";
export default {
  name: "Charts",
  props: {
    chartdata: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  data() {
    const chartdata = this.chartdata;
    const labels = chartdata[0].map(i => i.x);
    const barData = [{ chartType: "bar", values: chartdata[0].map(i => i.y) }];
    const lineData = [
      { chartType: "line", values: chartdata[0].map(i => i.y) }
    ];
    const areaData = [
      { chartType: "line", values: chartdata[0].map(i => i.y) }
    ];
    return {
      labels: labels,
      barData: barData,
      lineData: lineData,
      areaData: areaData
    };
  },
  components: {
    Frappe
  },
  watch: {
    chartdata(n) {
      const labels = n[0].map(i => i.x);
      const barData = [{ chartType: "bar", values: n[0].map(i => i.y) }];
      const lineData = [{ chartType: "line", values: n[0].map(i => i.y) }];
      const areaData = [{ chartType: "line", values: n[0].map(i => i.y) }];
      this.$refs.bar.update({ labels: labels, datasets: barData });
      this.$refs.line.update({ labels: labels, datasets: lineData });
      this.$refs.area.update({ labels: labels, datasets: areaData });
    }
  }
};
</script>
