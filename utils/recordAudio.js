const recordAudio = () => new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    let audioChunks = []

    mediaRecorder.addEventListener("dataavailable", event => audioChunks.push(event.data))
    
    const start = () => mediaRecorder.start()

    const stop = () => new Promise(resolve => {

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks)
            const audioUrl = URL.createObjectURL(audioBlob)
            const audio = new Audio(audioUrl)

            resolve({ audio, audioChunks })
        })

        mediaRecorder.stop()

        audioChunks = []
    })

    resolve({ start, stop })
})


export default recordAudio