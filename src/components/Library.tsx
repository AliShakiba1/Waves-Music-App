import useStore from '../store'
import LibrarySong from './LibrarySong'

function Library({ setCurrentSong }: any) {
  const [songs, libraryOpen, setLibraryOpen] = useStore(state => [
    state.Musics,
    state.libraryOpen,
    state.setLibraryOpen,
  ])
  const modalHandler = () => {
    setLibraryOpen()
  }
  return (
    <>
      <div
        className={`fixed inset-0  h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50  ${
          !libraryOpen ? 'hidden' : ''
        }`}
        id="my-modal"
        onClick={modalHandler}
      ></div>
      <ul
        className={` fixed left-0 top-0  h-full    overflow-scroll  rounded-r-2xl bg-white  opacity-0 shadow-2xl transition-all duration-500 ease-in sm:w-96 
      ${
        libraryOpen ? '  -translate-x-0! z-10 opacity-100  ' : '-translate-x-96'
      }
      `}
      >
        <h2 className="mb-10 ml-8 mt-10 text-3xl">Library</h2>

        {songs.map(song => (
          <LibrarySong
            setCurrentSong={setCurrentSong}
            currentSong={song}
            key={song.id}
          />
        ))}
      </ul>
    </>
  )
}

export default Library
