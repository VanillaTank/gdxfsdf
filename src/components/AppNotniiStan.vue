<template>
    <div>
        <div>
            <label for="noteInput">Enter a Note (A, B, C, etc.):</label>
            <input
              v-model="noteNameInput"
              id="noteInput"
              placeholder="A"
            >

            <label for="durationInput">Select Note Duration:</label>
            <select id="durationInput" v-model="noteDurationInput" >
                <option
                    v-for="(opt, index) in options"
                    :key="index"
                    :value="opt.value"
                >
                    {{ opt.text }}
                </option>
            </select>

            <button
              v-if="!isChangeMode"
              @click="handleNote()"
            >
              Add Note
           </button>

           <button
                v-if="isChangeMode"
                @click="isChangeMode = false"
            >
                Done
            </button>

            <button
                v-if="notes.length"
                @click="onCheckMelodyBtn"
            >
                Check melody
            </button>
        </div>

        <svg id="staff" width="500" height="200">
            <image x="0" y="23" width="70"
                xlink:href="https://e7.pngegg.com/pngimages/219/469/png-clipart-treble-clef-musical-note-music-note-text-music-note.png" />

            <!-- SVG representation of the musical staff will be displayed here -->
            <line class="stave" x1="0" y1="30" x2="450" y2="30" />
            <line class="stave" x1="0" y1="40" x2="450" y2="40" />
            <line class="stave" x1="0" y1="50" x2="450" y2="50" />
            <line class="stave" x1="0" y1="60" x2="450" y2="60" />
            <line class="stave" x1="0" y1="70" x2="450" y2="70" />

            <template v-if="notes.length">
                <svg
                    v-for="(note, index) in notes"
                    :key="index"
                    @click="onNoteClick(note)"
                >
                <ellipse
                    :cx="note.ellipseCx"
                    :cy="note.ellipseCy"
                    rx="6"
                    ry="5"
                    :class="{
                        'whole-note': note.duration === 1,
                        'half-note': note.duration === 2,
                        'quarter-note': note.duration === 4,
                        'eighth-note': note.duration === 8,
                    }"
                />


                <line
                    v-if="note.duration !== 1"
                    class="half-flag"
                    :x1="note.lineCx1"
                    :y1="note.verticalPosition"
                    :x2="note.lineCx2"
                    :y2="note.verticalPosition >= 55
                        ? note.verticalPosition - 25
                        : note.verticalPosition + 25"
                />


                <polygon
                    v-if="note.duration === 8"
                    class="flag"
                    :points="note.flagPoints"
                />

                </svg>
            </template>
        </svg>
    </div>
</template>

<script>
export default {
  name: 'AppNotniiStan',
  data: () => {
    return {
        notes: [],
        noteNameInput: 'C',
        noteDurationInput: '1',
        isChangeMode: false,
        editingNote: null,
        options:[
            { text: 'Whole Note', value: '1'},
            { text: 'Half Note', value: '2'},
            { text: 'Quarter Note', value: '4'},
            { text: 'Eighth Note', value: '8'},
        ]
    }
  },

  watch: {
    noteNameInput (val) {
        if(this.isChangeMode && this.editingNote) {
            const newName = val.toUpperCase()
            const verticalPosition = this.getVerticalPosition(newName);

            this.editingNote.name = newName;

            this.editingNote.verticalPosition = verticalPosition;

            this.editingNote.ellipseCy = verticalPosition.toString();

            this.editingNote.lineCx1 = verticalPosition >= 55
                        ? this.editingNote.id * 30 + 86
                        : this.editingNote.id * 30 + 74;

            this.editingNote.lineCx2 = verticalPosition >= 55
                        ? this.editingNote.id * 30 + 86
                        : this.editingNote.id * 30 + 74;


            this.editingNote.flagPoints = verticalPosition >= 55
                    ? `${this.editingNote.id * 30 + 85},${verticalPosition - 25}
                    ${this.editingNote.id * 30 + 95},${verticalPosition - 20}
                    ${this.editingNote.id * 30 + 97},${verticalPosition - 23}`
                    : `${this.editingNote.id * 30 + 75},${verticalPosition + 25}
                    ${this.editingNote.id * 30 + 85},${verticalPosition + 20}
                    ${this.editingNote.id * 30 + 87},${verticalPosition + 23}
                    `;

        }
    },
    noteDurationInput (val) {
        if(this.isChangeMode && this.editingNote) {
            const newNoteDuration = parseFloat(val);
            this.editingNote.duration = newNoteDuration
        }
    },
  },

  methods: {
    onCheckMelodyBtn() {
        this.isChangeMode = false
        this.$emit('checkIfMelodyCoincideTemplate', this.notes)
    },

    handleNote() {
        const noteName = this.noteNameInput.toUpperCase();
        const noteDuration = Number(this.noteDurationInput);
        const verticalPosition = this.getVerticalPosition(noteName)

        const newNote = {
            id: this.notes.length,
            duration: noteDuration,
            name: noteName,
            verticalPosition: verticalPosition,
            ellipseCx: (this.notes.length * 30 + 80).toString(),
            ellipseCy: verticalPosition.toString(),
            lineCx1: verticalPosition >= 55
                        ? this.notes.length * 30 + 86
                        : this.notes.length * 30 + 74,
            lineCx2: verticalPosition >= 55
                        ? this.notes.length * 30 + 86
                        : this.notes.length * 30 + 74,
            flagPoints: verticalPosition >= 55
                        ? `${this.notes.length * 30 + 85},${verticalPosition - 25}
                        ${this.notes.length * 30 + 95},${verticalPosition - 20}
                        ${this.notes.length * 30 + 97},${verticalPosition - 23}`
                        : `${this.notes.length * 30 + 75},${verticalPosition + 25}
                        ${this.notes.length * 30 + 85},${verticalPosition + 20}
                        ${this.notes.length * 30 + 87},${verticalPosition + 23}
                        `
        }

        this.notes.push(newNote);
    },

    getVerticalPosition(noteName) {
        const noteMapping = {
            "C": 80,
            "D": 75,
            "E": 70,
            "F": 65,
            "G": 60,
            "A": 55,
            "B": 50,
        };
        return noteMapping[noteName] || 0; // Default to 0 if note not found
    },

    onNoteClick (note) {
        this.isChangeMode = true
        this.noteNameInput = note.name;
        this.noteDurationInput = note.duration;
        this.editingNote = note
    },
  }
}
</script>

<style>
.stave {
    stroke: black;
    stroke-width: 2;
}

.whole-note {
    fill: transparent;
    stroke: black;
    stroke-width: 1;
}

.half-note {
    fill: transparent;
    stroke: black;
    stroke-width: 1;
}

.quarter-note {
    fill: black;
}

.eighth-note {
    fill: black;
}

.flag {
    fill: black;
    stroke: black;
    stroke-width: 1;
}

.half-flag {
    fill: none;
    stroke: black;
    stroke-width: 1;
}
</style>
