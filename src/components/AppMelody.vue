<template>
    <div>
        <button @click="getMelody">GET MELODY</button>
        <button
            :disabled="!audio"
            @click="toggleMelody"
        >
          {{ isMelodyPlaying ? 'PAUSE' : 'PLAY' }}
        </button>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'AppMelody',
  data() {
    return {
      isMelodyPlaying: false,
      audio: null,
      randomMelodyTemplate: []
    }
  },
  methods: {
    async getMelody() {
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
      }
      this.generateRandomMelodyTemplate()
      const {data} = await axios.post(
          'http://localhost:5000/melody',
          {
            melodyTemplate: this.randomMelodyTemplate,
          },
          {
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'application/json'
            }
          });
      const blob = new Blob([data], {
        type: 'audio/wav'
      });

      const url = URL.createObjectURL(blob);
      this.audio = new Audio(url);
      await this.audio.play();
      this.isMelodyPlaying = true
      this.audio.onended = () => {this.isMelodyPlaying = false};
    },

    generateRandomMelodyTemplate() {
      this.randomMelodyTemplate = [];
      const noteNames = ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4']
      const durations = [1, 2, 4, 8]
      for (let i = 0; i < 5; i++) {
        const randomNoteIndex = Math.floor(Math.random() * noteNames.length)
        const randomDurationIndex = Math.floor(Math.random() * durations.length)
        this.randomMelodyTemplate.push({note: noteNames[randomNoteIndex], duration: durations[randomDurationIndex]})
      }
      this.$store.commit('setRandomMelodyTemplate', this.randomMelodyTemplate)
    },

    toggleMelody() {
      if (this.isMelodyPlaying) {
        this.audio.pause()
      } else {
        this.audio.play()
      }
      this.isMelodyPlaying = !this.isMelodyPlaying
    },
  }

}
</script>
