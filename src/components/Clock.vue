<template>
  <div class="stutterer">
    <svg height="310px" width="310">
      <circle @click="handleClick" class="clockFace" :cx="155" :cy="155" :r="150" ref="faceRef"></circle>
      <g ref="arcGroupRef">
        <path class="arcHand" v-for="(frame, i) in FRAMES" :key="i"></path>
      </g>
      <path class="clockHand" ref="clockHandRef"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Clock",
  data: function() {
    return {
      SPEED: 0.003 / Math.PI,
      FRAMES: 10,
      frame: null,
      hitCounter: 0,
      rotation: 0,
      t0: Date.now(),
      arcs: []
    };
  },
  mounted() {
    this.frame = requestAnimationFrame(this.animate);
    if (this.$refs.faceRef) {
      this.$refs.faceRef.addEventListener("click", this.handleClick);
    }
  },
  updated() {
    console.log("componentDidUpdate()", this.$refs.faceRef);
  },
  destroyed() {
    this.$refs.faceRef.removeEventListener("click", this.handleClick);
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  },
  methods: {
    animate: function() {
      const now = Date.now();
      const td = now - this.t0;
      this.rotation = (this.rotation + this.SPEED * td) % (2 * Math.PI);
      this.t0 = now;

      this.arcs.push({ rotation: this.rotation, td });

      let lx, ly, tx, ty;
      if (this.arcs.length > this.FRAMES) {
        this.arcs.forEach(({ rotation, td }, i) => {
          lx = tx;
          ly = ty;
          const r = 145;
          tx = 155 + r * Math.cos(rotation);
          ty = 155 + r * Math.sin(rotation);
          const bigArc = this.SPEED * td < Math.PI ? "0" : "1";
          const path = `M${tx} ${ty}A${r} ${r} 0 ${bigArc} 0 ${lx} ${ly}L155 155`;
          const hue = 120 - Math.min(120, td / 4);
          const colour = `hsl(${hue}, 100%, ${60 - i * (30 / this.FRAMES)}%)`;
          if (i !== 0) {
            const arcEl = this.$refs.arcGroupRef.children[i - 1];
            arcEl.setAttribute("d", path);
            arcEl.setAttribute("fill", colour);
          }
        });
        this.$refs.clockHandRef.setAttribute("d", `M155 155L${tx} ${ty}`);
        this.arcs.shift();
      }

      if (this.hitCounter > 0) {
        this.$refs.faceRef.setAttribute(
          "fill",
          `hsla(0, 0%, ${this.hitCounter}%, 0.95)`
        );
        this.hitCounter -= 1;
      } else {
        this.hitCounter = 0;
        this.$refs.faceRef.setAttribute("fill", "hsla(0, 0%, 5%, 0.95)");
      }

      this.frame = requestAnimationFrame(this.animate);
    },
    handleClick: function(e) {
      e.stopPropagation();
      this.hitCounter = 50;
    }
  }
};
</script>

