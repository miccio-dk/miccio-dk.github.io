<template>
  <div id="timeline"></div>
</template>

<script>
import Two from "two.js";

export default {
  name: "ExperienceTimeline",
  props: {
    exp: Object,
    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 500,
    },
    from: {
      type: Number,
      default: 2013,
    },
    to: {
      type: Number,
      default: 2021,
    },
    margin: {
      type: Number,
      default: 20,
    },
    thickness: {
      type: Number,
      default: 2,
    },
    easing: {
      type: Number,
      default: 0.25,
    },
  },
  data: function () {
    return {
      two: null,
      line: null,
      begin: null,
      end: null,
      range: null,
      tick_dist: null,
    };
  },
  mounted: function () {
    this.range = this.to - this.from + 1;
    this.tick_dist = (this.height - this.margin * 2) / (this.range - 1);
    // create two.js instance
    var elem = document.getElementById("timeline");
    this.two = new Two({
      width: this.width,
      height: this.height,
      autostart: true,
    }).appendTo(elem);
    this.drawTimeline();
  },
  watch: {
    exp() {
      this.updateHighlight(this.exp.from, this.exp.to);
    },
  },
  methods: {
    drawTimeline() {
      // draw line
      var tline = this.two.makeLine(this.width / 2, 0, this.width / 2, this.height);
      tline.stroke = "#000000";
      tline.linewidth = this.thickness;
      tline.dashes[0] = this.tick_dist / 36;
      tline.dashes[1] = this.tick_dist / 36;
      // draw ticks
      for (let i = 0; i < this.range; i++) {
        var tick_y = this.margin + i * this.tick_dist;
        var tick = this.two.makeRectangle(
          this.width / 2,
          tick_y,
          this.thickness * 4,
          this.tick_dist / 36
        );
        tick.fill = "#000000";
        tick.noStroke();
      }
      // instantiate highlight
      this.line = this.two.makeLine(this.width / 2, 0, this.width / 2, 0);
      this.line.stroke = "#000000";
      this.line.linewidth = this.thickness * 2;
      this.begin = this.line.vertices[0].clone();
      this.end = this.line.vertices[1].clone();
      // highlight event binding
      this.two.bind("update", () => {
        this.line.vertices[0].y += (this.begin.y - this.line.vertices[0].y) * this.easing;
        this.line.vertices[1].y += (this.end.y - this.line.vertices[1].y) * this.easing;
      });
    },
    updateHighlight(from_str, to_str) {
      // TODO function to convert dates to pixels
      var froms = from_str.split("/").map((c) => parseInt(c));
      var tos = to_str.split("/").map((c) => parseInt(c));
      var from_hl = froms[1] + (froms[0] - 1) / 12;
      var to_hl = tos[1] + tos[0] / 12;
      var from_hl_px = this.height - (this.margin + (from_hl - this.from) * this.tick_dist);
      var to_hl_px = this.height - (this.margin + (to_hl - this.from) * this.tick_dist);
      this.begin.y = from_hl_px;
      this.end.y = to_hl_px;
    },
  },
};
</script>

<style lang="scss">
.markdown p {
  @apply mt-4;
}

.markdown ul {
  @apply list-disc pl-8;
}
</style>
