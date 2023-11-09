
import { type Song } from '@/lib/data';
import { usePlayerStore } from '@/store/playerStore';
import { useEffect } from 'react';

interface Props {
    songs: Song[]
}
type ClickHandler = (index: number) => void;
interface ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    
  }
const Time = () => (
        <svg
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
    fill="currentColor"
    ><path
        d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
    ></path><path
        d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"
    ></path></svg
    >
)
 

export const MusicTable: React.FC<Props> = ({songs}) =>{

    const TableRow = ({index,song,handleClick}: { index: number, song: Song, handleClick: ClickHandler }) => (
        <tr key={index} className="text-gray-300 text-sm font-light hover:bg-white/10 rounded-lg overflow-hidden transition duration-300 cursor-pointer">
            <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">{index + 1}</td>
            <td className="px-4 py-2 flex gap-3">
                <picture>
                    <img src={song.image} alt={song.title} className="w-11 h-11" />
                </picture>
                <div className="flex flex-col">
                    <h3 className="text-white text-base font-normal">{song.title}</h3>
                    <span>{song.artists.join(', ')}</span>
                </div>
            </td>
            <td className="px-4 py-2">{song.album}</td>
            <button></button>
            <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">{song.duration}</td>

        </tr>
    )

   
    const handleClick = () => {
        console.log(23)
        // const {currentMusic, isPlaying, setIsPlaying, setCurrentMusic} = usePlayerStore(state => state)
        // const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === index 
        // if(isPlayingPlaylist){
        //     setIsPlaying(false)
        //     return
        // }
      
        // fetch(`/api/get-info-playlist.json?id=${index}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         const {songs, playlist} = data
        //         setIsPlaying(true)
        //         setCurrentMusic({songs, playlist, song: songs[index]})
        //     })
    }

    return (
            <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
                <thead>
                    <tr className="text-zinc-400 text-sm ">
                        <th className="px-4 py-2 font-light">#</th>
                        <th className="px-4 py-2 font-light">Title</th>
                        <th className="px-4 py-2 font-light">Artist</th>
                        <th className="px-4 py-2 font-light"><Time/></th>

                    </tr>
                </thead>

                <tbody>
                    <tr className="h-[16px]"></tr>
                    {  songs.map((song, index) => (
                        <TableRow key={index} index={index} song={song} handleClick={handleClick}/>
                    ))}
                    
                </tbody>

            </table>
            
)}