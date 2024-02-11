<template>
  <div>
    <app-melody />
    <app-piano-keys />
    <app-notnii-stan
      @checkIfMelodyCoincideTemplate="checkIfMelodyCoincideTemplate"
    />
  </div>
</template>

<script>
import AppNotniiStan from "@/components/AppNotniiStan.vue";
import AppMelody from "@/components/AppMelody.vue";
import AppPianoKeys from "@/components/AppPianoKeys.vue";

export default {
  name: 'App',
  components: {
    AppNotniiStan, 
    AppMelody,
    AppPianoKeys,
  },
  methods: {
    checkIfMelodyCoincideTemplate (notes) {
        const randomMelodyTemplate = this.$store.state.randomMelodyTemplate;
        const okResult = notes.every((note, i) => {
            if (note.name !== randomMelodyTemplate[i].note[0].toUpperCase()) {
                console.log(note.name, randomMelodyTemplate[i].note[0].toUpperCase(), note.id);
            }
            if (note.duration !== randomMelodyTemplate[i].duration) {
                console.log(note.duration, randomMelodyTemplate[i].duration, note.id );
            }

            return note.name === randomMelodyTemplate[i].note[0].toUpperCase() 
            && note.duration === randomMelodyTemplate[i].duration
          }
        )
        okResult ? this.congratulations() : this.soPity()
    },

    congratulations() {
        alert('Красава, все окей')
    },

    soPity() {
        alert('Подбор не верен')
    }
  }
}
</script>

