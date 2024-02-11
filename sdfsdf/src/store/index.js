import {createStore} from "vuex";

export const store = createStore({
  state () {
    return {
      NOTE_PITCHES: [
        'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5',
      ],
      DURATIONS: [
        {
          code: 'whole',
          name: 'Целая',
          value: 1,
        },
        {
          code: 'half',
          name: 'Половина',
          value: 0.5,
        },
        {
          code: 'quarter',
          name: 'Четверть',
          value: 0.25,
        },
        {
          code: 'eighth',
          name: 'Восьмая',
          value: 0.125,
        },
      ],
      melody: [
        {pitch: 'C4', id: 'jks3h', duration: 'quarter'},
        {pitch: 'D4', id: 'eqwe', duration: 'quarter'},
        {pitch: 'C5', id: 'dgg', duration: 'quarter'},
        {pitch: 'G4', id: 'jsh', duration: 'quarter'},

        {pitch: 'F4', id: 'jks312h', duration: 'eighth'},
        {pitch: 'E4', id: 'e112qwe', duration: 'eighth'},
        {pitch: 'G5', id: 'dgsdbg', duration: 'half'},
        {pitch: 'A4', id: 'jks3sah', duration: 'eighth'},
        {pitch: 'B4', id: 'eq65dgwe', duration: 'eighth'},

        {pitch: 'C4', id: 'jks33h', duration: 'quarter'},
        {pitch: 'D4', id: 'eq1we', duration: 'quarter'},
        {pitch: 'C5', id: 'd2gg', duration: 'quarter'},
        {pitch: 'G4', id: 'j4sh', duration: 'quarter'},
      ],
    }
  },

  mutations: {
    SET_MELODY (state, payload) {
      state.melody = payload
    }
  },

  getters: {
    getMelody: (state) => state.melody.map(note => ({pitch: note.pitch, duration: note.duration}))
  }
})
