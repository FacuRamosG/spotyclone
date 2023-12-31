import { usePlayerStore } from "@/store/playerStore"
import { useEffect, useRef, useState } from "react"
import { Slider } from "./Slider"
import { songs } from "@/lib/data"


export const Pause = () => (
    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
  )
  
export const Play = () => (
    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
  )

export const VolumeSilence = () => (
    <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen apagado" viewBox="0 0 16 16" ><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>
  ) 
  
export const Volume = () => (
    <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen alto" id="volume-icon" viewBox="0 0 16 16"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>
    )
export const NextTrack = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-skip-forward-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
     <path d="M3 5v14a1 1 0 0 0 1.504 .864l12 -7a1 1 0 0 0 0 -1.728l-12 -7a1 1 0 0 0 -1.504 .864z" strokeWidth="0" fill="currentColor"></path>
     <path d="M20 4a1 1 0 0 1 .993 .883l.007 .117v14a1 1 0 0 1 -1.993 .117l-.007 -.117v-14a1 1 0 0 1 1 -1z" strokeWidth="0" fill="currentColor"></path>
    </svg>
)

export const PrevTrack = () => (
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-player-skip-back-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M19.496 4.136l-12 7a1 1 0 0 0 0 1.728l12 7a1 1 0 0 0 1.504 -.864v-14a1 1 0 0 0 -1.504 -.864z" strokeWidth="0" fill="currentColor"></path>
   <path d="M4 4a1 1 0 0 1 .993 .883l.007 .117v14a1 1 0 0 1 -1.993 .117l-.007 -.117v-14a1 1 0 0 1 1 -1z" strokeWidth="0" fill="currentColor"></path>
</svg>
)

const CurrentSong = ({image, title, artists}) => {
    return(
        <div
            className="flex items-center gap-5 relative overflow-hidden"
        >
            <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title} />
            </picture>

            <div className="flex flex-col">
                <h3 className="font-semibold text-sm block">
                    {title}
                </h3>
                <span className="text-xs opacity-80">
                    {artists?.join(', ')}
                </span>

            </div>
        </div>
    )
}

const SongControl = ({audio}) => {
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        audio.current.addEventListener('timeupdate', handleTimeUpdate)
        return () => {
            audio.current.removeEventListener('timeupdate', handleTimeUpdate)            
        }      
    },[])

    const handleTimeUpdate = () => {
        setCurrentTime(audio.current.currentTime)
    }

    const formatTime = time => {
        if(time === null) return `0:00`

        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60)

        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const duration = audio?.current?.duration ?? 0

    return (
        <div className="flex gap-x-3 text-xs ">
            <span className="opacity-50 w-[50px] text-right">{formatTime(currentTime)}</span>
            <Slider
                defaultValue={[0]}
                max={audio?.current?.duration ?? 0}
                min={0}
                value={[currentTime]}
                className="w-[400px]"
                onValueChange={(value) => {
                    const [newCurrentTime] = value
                    audio.current.currentTime = newCurrentTime
                }}
            />

             <span className="opacity-50 w-[50px]">{duration ? formatTime(duration) : null}</span>
        </div>
    )
}

const VolumeControl = () => {
    const volume = usePlayerStore(state => state.volume)
    const setVolume = usePlayerStore(state => state.setVolume)
    const previousVolumeRef = useRef(volume)

    const isVolumeSilenced = volume === 0

    const handleClickVolume = () => {
        if(isVolumeSilenced){
            setVolume(previousVolumeRef.current)
            return
        }
        previousVolumeRef.current = volume
        setVolume(0)
    }

    return(
        <div className="flex justify-center gap-x-2">
            <button className="opacity-70 hover:opacity-100 transition-all" onClick={handleClickVolume}>
                {isVolumeSilenced ? <VolumeSilence /> : <Volume />}
            </button>
            <Slider
                defaultValue={[50]}
                max={100}
                min={0}
                value={[volume * 100]}
                className="w-[95px]"
                onValueChange={(value) => {
                    const [newVolume] = value
                    const volumeValue = newVolume/100
                    setVolume(volumeValue)
                }}
            />
        </div>
    )
}
  


export function Player () {
    const {isPlaying, setIsPlaying, currentMusic,setCurrentMusic, volume} = usePlayerStore(state => state)
    const audioRef = useRef()
    const volumeRef = useRef(1)

    useEffect(() => {
        isPlaying 
         ? audioRef.current.play().then(() => {}).catch(() => {})
         : audioRef.current.pause()

    }, [isPlaying])

    useEffect(() => {
        audioRef.current.volume = volume
    },[volume])

    useEffect(() => {
        const {song, playlist, songs} = currentMusic
        if (song) {
            const src = `/music/${playlist?.id}/0${song.id}.mp3`
            audioRef.current.src= src
            audioRef.current.volume = volume
            audioRef.current.play()
        }
    }, [currentMusic])


    const handleClick = () => {
        if(currentMusic.song === null) return
        setIsPlaying(!isPlaying)
    }
    const handleNextTrack = () => {
        const {song, songs} = currentMusic
        const index = songs.findIndex(s => s.id === song.id)
        const nextSong = songs[index + 1]
        if(nextSong){
            setCurrentMusic({...currentMusic, song: nextSong})
            setIsPlaying(true)
        }
    }
    const handlePrevTrack = () => {
        const {song, songs} = currentMusic
        const index = songs.findIndex(s => s.id === song.id)
        const prevSong = songs[index - 1]
        if(prevSong){
            setCurrentMusic({...currentMusic, song: prevSong})
            setIsPlaying(true)
        }
    }


      


    return(
        <div className="flex flex-row justify-between w-full px-1 z-50">
            <div className="w-[200px]">
                <CurrentSong  {...currentMusic.song}/>
            </div>

            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex justify-center flex-col gap-3 items-center">
                    <div className=" flex gap-2 justify-center items-center">
                        <button onClick={handlePrevTrack}>
                             <PrevTrack />
                        </button>
                        <button className="bg-white rounded-full p-2" onClick={handleClick}>
                            {isPlaying ? <Pause /> : <Play />}
                        </button>
                        <button onClick={handleNextTrack}>
                            <NextTrack />
                        </button>
                    </div>

                    <SongControl audio={audioRef}/>
                </div>
            </div>

            <div className="grid place-content-center ">
                <VolumeControl  />
            </div>

            <audio ref={audioRef} src="" />

        </div>
    )
}