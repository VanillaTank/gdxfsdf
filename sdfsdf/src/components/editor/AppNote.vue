<template>
  <svg
      width="26"
      viewBox="0 0 25 11"
      :x="(order * 50) + 80"
      :y="YPosByPitch"
  >
    <!--  Квадрат нужен для увеличения площади по которой срабатывает клик. у свг с этим проблемы  -->
    <rect
        x="0"
        width="26"
        :y="(isAboveA || duration === 'whole') ? '-2' : '-30'"
        :height="duration === 'whole' ? '17' : '45'"
        stroke="transparent"
        fill="transparent"/>

    <!-- Штрих вниз -->
    <line
        v-if="isAboveA && duration !== 'whole'"
        :stroke="selectedColor" x1="5" y1="35" x2="5" y2="5"
    />


    <!--    Штрих вверх    -->
    <line
        v-if="!isAboveA && duration !== 'whole'"
        :stroke="selectedColor" x1="15" y1="-30" x2="15" y2="3"
    />

    <!--  Флаг восьмушки  -->
    <svg
        v-if="duration === 'eighth'"
        :x="isAboveA ? '3' : '15'"
        :y="isAboveA ? '13' : '-30'"
        width="10"
        height="32"
        viewBox="0 0 10 32"
    >
      <path
          v-if="!isAboveA"
          :fill="selectedColor"
          stroke="none"
          d="M0 4.38048V0H0.112335C0.421215 0 0.61776 0.19656 0.67392 0.53352C1.2636 3.34152 3.03266 6.40224 5.47562 8.7048C8.19938 11.2601 9.57529 14.7701 9.57529 18.3924C9.57529 21.8182 8.36786 25.3843 5.9249 28.3327C5.5037 28.8943 5.47559 28.8943 5.19479 28.8943C4.85783 28.8943 4.63321 28.6416 4.63321 28.3046C4.63321 28.0519 4.66128 27.9958 4.94208 27.6869C7.07616 25.1035 8.14322 21.9866 8.14322 19.0102C8.14322 16.3706 7.3008 13.8434 5.55984 11.934C4.49281 10.7546 2.5272 9.63144 0.0280762 8.76096C0.0280762 8.73288 0 7.8624 0 4.38048Z"></path>

      <path
          v-if="isAboveA"
          :fill="selectedColor"
          stroke="none"
          d="M1.42004 25.6202L1.42004 30H1.53243C1.84147 30 2.03811 29.8035 2.0943 29.4666C2.68427 26.659 4.4542 23.5987 6.89836 21.2965C9.62346 18.7416 11 15.2321 11 11.6103C11 8.18505 9.79202 4.61948 7.34786 1.67152C6.92645 1.11 6.89833 1.11 6.61739 1.11C6.28026 1.11 6.05553 1.36266 6.05553 1.69961C6.05553 1.95228 6.08362 2.00837 6.36455 2.31722C8.49968 4.90024 9.56727 8.01667 9.56727 10.9926C9.56727 13.6318 8.72444 16.1587 6.98262 18.0678C5.91506 19.247 3.94849 20.37 1.44813 21.2403C1.44813 21.2684 1.42004 22.1388 1.42004 25.6202Z"/>
    </svg>


    <!-- Голова ноты -->
    <svg
        x="3"
    >
      <path
          :stroke-width="['quarter', 'eighth'].includes(duration) ? 0.3 : 1.3"
          :fill="['quarter', 'eighth'].includes(duration) ? selectedColor : 'transparent'"
          :stroke="['quarter', 'eighth'].includes(duration) ? 'transparent' : selectedColor"
          d="M4.93121 11.1088C8.52545 11.1088 12.934 7.79536 12.934 4.3696C12.934 2.29168 11.3054 1 9.0028 1C4.56616 1 1 4.28536 1 7.7392C1 9.8452 2.74097 11.1088 4.93121 11.1088Z"></path>
    </svg>

    <line
        v-if="pitch === 'C4'"
        :stroke="selectedColor"
        x1="0"
        y1="6"
        x2="20"
        y2="6"
    />
  </svg>
</template>
<script>
export default {
  name: 'AppNote',
  props: {
    pitch: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  watch: {
    isSelected (newVal) {
      if (newVal) {
        this.selectedColor = 'green'
      } else {
        this.selectedColor = 'black'
      }
    }
  },
  data() {
    return {
      selectedColor: 'black',
    }
  },
  computed: {
    isAboveA() {
      return ['B4', 'C5', 'D5'].includes(this.pitch)
    },
    YPosByPitch() {
      const map = {
        'C4': '30',
        'D4': '25',
        'E4': '20',
        'F4': '15',
        'G4': '10',
        'A4': '5',
        'B4': '0',
        'C5': '-5',
        'D5': '-10',
      }

      return map[this.pitch.toUpperCase()]
    },
  },
  methods: {}
}
</script>

<style>

</style>
