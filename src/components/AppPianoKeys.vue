<template>
    <div>
        <div class="piano">
            <div 
            v-for="key in keys"
            :key="key.note"
            class="key"
            :class="{
                'key-w': key.type === 'key-w',
                'key-b': key.type !== 'key-w',
            }"
            @click="playNote($event, key.text)"
            >
                {{key.text}}
            </div>   
        </div>    

        <audio 
            v-for="(track, index) in dataSound"
            :key="index"
            :src="track.src"
            :id="track.noteName"
        />
    </div>
</template>  

<script>
export default {
    name: 'AppPianoKeys',
    data() {
        return {
            keys: [
                {note: 'C', type: 'key-w', text: 'C'},
                {note: 'Cs', type: 'key-b', text: 'C#'},
                {note: 'D', type: 'key-w', text: 'D'},
                {note: 'Ds', type: 'key-b', text: 'D#'},
                {note: 'E', type: 'key-w', text: 'E'},
                {note: 'F', type: 'key-w', text: 'F'},
                {note: 'Fs', type: 'key-b', text: 'F#'},
                {note: 'G', type: 'key-w', text: 'G'},
                {note: 'Gs', type: 'key-b', text: 'G#'},
                {note: 'A', type: 'key-w', text: 'A'},
                {note: 'As', type: 'key-b', text: 'A#'},
                {note: 'B', type: 'key-w', text: 'H'},
            ],
            dataSound: [
                {
                    noteName: 'C',
                    src: './notes/c4_4.mp3'
                },
                {
                    noteName: 'C#',
                    src: ''
                },
                {
                    noteName: 'D',
                    src: './notes/d4_4.mp3'
                },
                {
                    noteName: 'D#',
                    src: ''
                },
                {
                    noteName: 'E',
                    src: './notes/e4_4.mp3'
                },
                {
                    noteName: 'F',
                    src: './notes/f4_4.mp3'
                },
                {
                    noteName: 'F#',
                    src: ''
                },
                {
                    noteName: 'G',
                    src: './notes/g4_4.mp3'
                },
                {
                    noteName: 'G#',
                    src: ''
                },
                {
                    noteName: 'A',
                    src: './notes/a4_4.mp3'
                },
                {
                    noteName: 'A#',
                    src: ''
                },
                {
                    noteName: 'H',
                    src: './notes/b4_4.mp3'
                }
            ]
        }
    },
    methods: {
        playNote($event, noteSign) {
            const key = $event.target;
            key.classList.add('active');
            const note = document.getElementById(noteSign);
            note.play();
            note.addEventListener('ended', () => {
                key.classList.remove('active');
            });
        },
    }
}
</script>

<style>
.piano {
    width: 350px;
    height: 200px;
    margin: 15px auto;
    display:flex;
}
.key {
    width: 100px;
    height: 100%;
    border:2px solid #000;
    border-radius: 0 0 5px 5px;
    cursor: pointer;
    box-shadow: inset -2px -2px 5px #ccc;
    text-align: center;
    font-size: 20px;
    font-family: sans-serif;
    font-weight: bold;
    background: #fff;
    user-select: none;
    transition: .1s;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 10px;
}
.key-b {
    width: 60px;
    background: #000;
    font-size: 18px;
    color:#fff;
    height: 65%;
    margin-left: -18px;
    margin-right: -18px;
    z-index: 2;
}
.key.active {
    background: #ccc;
}
.key-b.active {
    background: #333;
}
</style>