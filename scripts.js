import recordAudio from './utils/recordAudio.js'

let status = false

const audioPlayer = document.querySelector('#audio-player')

const handleButtons = {
    start: document.querySelector('#start'),
    stop: document.querySelector('#stop')
}

const init = async () => {
    const recorder = await recordAudio()
    const { start: startButton, stop: stopButton } = handleButtons

    stopButton.disabled = true

    startButton.addEventListener('click', () => {
        if(!status){
            startButton.disabled = true 
            stopButton.disabled = false

            status = true

            audioPlayer.src = ''

            recorder.start()
        }
    })

    stopButton.addEventListener('click', async () => {
        if(status){
            const { audio, audioChunks } = await recorder.stop()

            startButton.disabled = false 
            stopButton.disabled = true

            status = false

            audioPlayer.src = audio.src

        }
    })   
}

init()



