<template>
  <div class="w-full p-16 xl:p-24 text-dark">
    <div class="flex flex-col md:flex-row gap-16">
      <ul class="py-4 space-y-4">
        <li
          v-for="(exp, i) in sortedExperiences"
          :key="i"
          class="group text-xl center"
          @mouseover="setCurrent(i)"
        >
          <span
            class="py-2 px-4 group-hover:bg-dark group-hover:text-light rounded-md"
            :class="[isCurrent(i) ? selectClass : '']"
          >
            {{ exp.from }} - {{ exp.to }}
          </span>
        </li>
      </ul>
      <div class="flex-shrink" id="timeline"></div>
      <div class="flex-1 py-4">
        <div v-if="currentExp" class="text-xl">
          <p>
            <span class="font-bold">{{ currentExp.role }}</span> @
            <span>{{ currentExp.company }}</span>
          </p>
          <p>
            <span class="italic">{{ currentExp.location }}</span>
          </p>
          <div class="markdown" v-html="mdToHtml(currentExp.descr)"></div>
        </div>
        <div v-else class="text-xl">
          <p>Hover the date ranges to know more.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _orderBy from "lodash/orderBy";
//import ExperienceBlock from "./ExperienceBlock.vue";
import marked from "marked";
import Two from "two.js";

export default {
  components: {
    //    ExperienceBlock,
  },
  props: {
    experiences: Array,
  },
  data: function () {
    return {
      selectClass: ["bg-dark", "text-light", "border-dark"],
      currentExpIndex: false,
      two: null,
      hlLine: null,
      hlBegin: null,
      hlEnd: null,
    };
  },
  mounted: function () {
    // TODO move to props/data of new component
    this.width = 16;
    this.height = 500;
    this.from = 2013;
    this.to = 2021;
    this.margin = 20;
    this.thickness = 2;
    this.easing = 0.25;
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
  computed: {
    sortedExperiences() {
      return _orderBy(
        this.experiences,
        (exp) => new Date("01/" + exp.to),
        "desc"
      );
    },
    currentExp() {
      return this.sortedExperiences[this.currentExpIndex];
    },
  },
  methods: {
    setCurrent(i) {
      this.currentExpIndex = i;
      this.updateHighlight(
        this.currentExp.from,
        this.currentExp.to,
        this.from,
        this.height,
        this.tick_dist,
        this.margin
      );
    },
    isCurrent(i) {
      return this.currentExpIndex === i;
    },
    mdToHtml(mdData) {
      return marked(mdData, {});
    },
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
      // draw highlight
      this.hlLine = this.two.makeLine(this.width / 2, 0, this.width / 2, 0);
      this.hlLine.stroke = "#000000";
      this.hlLine.linewidth = this.thickness * 2;
      this.hlBegin = this.hlLine.vertices[0].clone();
      this.hlEnd = this.hlLine.vertices[1].clone();
      // highlight event binding
      this.two.bind("update", () => {
        this.hlLine.vertices[0].y += (this.hlBegin.y - this.hlLine.vertices[0].y) * this.easing;
        this.hlLine.vertices[1].y += (this.hlEnd.y - this.hlLine.vertices[1].y) * this.easing;
      });
    },
    updateHighlight(from_str, to_str) {
      var froms = from_str.split("/").map((c) => parseInt(c));
      var tos = to_str.split("/").map((c) => parseInt(c));
      var from_hl = froms[1] + froms[0] / 12;
      var to_hl = tos[1] + tos[0] / 12;
      var from_hl_px = this.height - (this.margin + (from_hl - this.from) * this.tick_dist);
      var to_hl_px = this.height - (this.margin + (to_hl - this.from) * this.tick_dist);
      this.hlBegin.y = from_hl_px;
      this.hlEnd.y = to_hl_px;
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
