<template>
  <div id="root">
    <div class="container">
      <div class="rendering">
        <label
          v-for="(o, i) in options"
          :key="i"
          :class="strategy === o.strategy ? 'selected': null"
        >
          <input type="radio" :checked="strategy === o.strategy" @change="handleChange(o.strategy)">
          {{o.label}}
        </label>
      </div>
      <div class="demo">
        <input
          :class="`input ${strategy}`"
          placeholder="longer input → more components and DOM nodes"
          v-model="value"
          @input="handleInput"
        >
        <div>
          <Charts :chartdata="data"/>
        </div>
        <div v-show="showClock">
          <Clock/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Clock from "./components/Clock";
import Charts from "./components/Charts";
import { getStreamData } from "./utils";

export default {
  name: "app",
  components: {
    Clock,
    Charts
  },
  data() {
    return {
      value: "",
      data: getStreamData(""),
      strategy: "sync",
      showDemo: true,
      showClock: false,
      options: [
        { strategy: "sync", label: "Synchronous" },
        { strategy: "debounced", label: "Debounced" },
        { strategy: "async", label: "Concurrent" }
      ]
    };
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.key.toLowerCase() === "?") {
        e.preventDefault();
        this.showClock = !this.showClock;
      }
    });
    this.debouncedHandleChange = _.debounce(this.debouncedHandleChange, 1000);
  },
  methods: {
    getStreamData,
    handleInput(e) {
      const value = e.target.value;
      const strategy = this.strategy;
      switch (strategy) {
        case "sync":
          this.data = getStreamData(this.value);
          break;
        case "debounced":
          this.debouncedHandleChange(value);
          break;
        default:
          break;
      }
    },
    debouncedHandleChange(value) {
      if (this.strategy === "debounced") {
        this.data = getStreamData(this.value);
      }
    },
    handleChange(val) {
      this.strategy = val;
    }
  }
};
</script>

<style>
</style>
