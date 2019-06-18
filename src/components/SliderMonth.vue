<template>
  <div>
    <VueSlideBar
      v-model="slider.value"
      :data="slider.data"
      :range="slider.range"
      :labelStyles="{ color: '#4a4a4a', backgroundColor: '#4a4a4a' }"
      :processStyle="{ backgroundColor: '#d8d8d8' }"
      @input="getValue">
    </VueSlideBar>
  </div>
</template>

<script>
import VueSlideBar from 'vue-slide-bar'

export default {
  data () {
    return {
      rangeValue: {},
      slider: {
        value: 1,
        data: [
         1,2,3,4,5,6,7,8,9,10,11,12
        ],
        range: [
          {
            label: '1월'
          },
          {
            label: '2월',
            isHide: true
          },
          {
            label: '3월'
          },
          {
            label: '4월',
            isHide: true
          },
          {
            label: '5월',
            isHide: true
          },
          {
            label: '6월'
          },
          {
            label: '7월',
            isHide: true
          },
          {
            label: '8월',
            isHide: true
          },
          {
            label: '9월'
          },
          {
            label: '10월',
            isHide: true
          },
          {
            label: '11월',
            isHide: true
          },
          {
            label: '12월'
          }

        ]
      }
    }
  },
  methods: {
    callbackRange (val) {
      this.rangeValue = val;
    },
    getValue(val){
      this.$emit('sliderValue', val);
    }
  },
  components: {
    VueSlideBar
  }
}
</script>