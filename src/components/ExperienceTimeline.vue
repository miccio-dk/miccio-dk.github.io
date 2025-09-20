<script setup>
import Two from 'two.js'
import { markRaw, onMounted, watch } from 'vue'

const props = defineProps({
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
    default: 2025,
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
})

let two = null
let line = null
let begin = null
let end = null
let range = null
let tick_dist = null

onMounted(() => {
  range = props.to - props.from + 1
  tick_dist = (props.height - props.margin * 2) / (range - 1)
  // create two.js instance
  var elem = document.getElementById('timeline')
  two = markRaw(
    new Two({
      width: props.width,
      height: props.height,
      autostart: true,
    }).appendTo(elem),
  )
  drawTimeline()
})

watch(
  () => props.exp,
  newExp => {
    if (newExp) {
      begin.y = dateToPixels(newExp.from, true)
      end.y = dateToPixels(newExp.to)
    } else {
      begin.y = 0
      end.y = 0
    }
  },
)

function drawTimeline() {
  // draw line
  var tline = two.makeLine(props.width / 2, 0, props.width / 2, props.height)
  tline.stroke = '#000000'
  tline.linewidth = props.thickness
  tline.dashes[0] = tick_dist / 36
  tline.dashes[1] = tick_dist / 36
  // draw ticks
  for (let i = 0; i < range; i++) {
    var tick_y = props.margin + i * tick_dist
    var tick = two.makeRectangle(props.width / 2, tick_y, props.thickness * 4, tick_dist / 36)
    tick.fill = '#000000'
    tick.noStroke()
  }
  // instantiate highlight
  line = two.makeLine(props.width / 2, 0, props.width / 2, 0)
  line.stroke = '#000000'
  line.linewidth = props.thickness * 2
  begin = line.vertices[0].clone()
  end = line.vertices[1].clone()
  // highlight event binding
  two.bind('update', () => {
    var begin_old = line.vertices[0].y
    var end_old = line.vertices[1].y
    line.vertices[0].y += (begin.y - begin_old) * props.easing
    line.vertices[1].y += (end.y - end_old) * props.easing
  })
}

function dateToPixels(date_str, is_from = false) {
  var [month, year] = date_str.split('/').map(c => parseInt(c))
  if (is_from) {
    month -= 1
  }
  var date_float = year + month / 12
  var date_px = props.margin + (date_float - props.from) * tick_dist
  return props.height - date_px
}
</script>

<template>
  <div id="timeline" />
</template>

<style lang="scss">
@reference "../assets/css/tailwind.css";

.markdown p {
  @apply mt-4;
}

.markdown ul {
  @apply list-disc pl-8;
}
</style>
