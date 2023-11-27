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
      default: 600,
    },
    from: {
      type: Number,
      default: 2013,
    },
    to: {
      type: Number,
      default: 2024,
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
  data() {
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
      if (this.exp) {
        this.begin.y = this.dateToPixels(this.exp.from, true);
        this.end.y = this.dateToPixels(this.exp.to);
      } else {
        this.begin.y = 0;
        this.end.y = 0;
      }
    },
  },
  methods: {
    drawTimeline() {
      // draw line
      var tline = this.two.makeLine(
        this.width / 2,
        0,
        this.width / 2,
        this.height
      );
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
        var begin_old = this.line.vertices[0].y;
        var end_old = this.line.vertices[1].y;
        this.line.vertices[0].y += (this.begin.y - begin_old) * this.easing;
        this.line.vertices[1].y += (this.end.y - end_old) * this.easing;
      });
    },
    dateToPixels(date_str, is_from = false) {
      var [month, year] = date_str.split("/").map((c) => parseInt(c));
      if (is_from) {
        month -= 1;
      }
      var date_float = year + month / 12;
      var date_px = this.margin + (date_float - this.from) * this.tick_dist;
      return this.height - date_px;
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
