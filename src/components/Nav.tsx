import { MusicalNoteIcon } from '@heroicons/react/24/outline'
import useStore from '../store'

const Nav = () => {
  const [setLibraryOpen] = useStore(state => [state.setLibraryOpen])

  return (
    <nav className="flex min-h-fit items-center justify-around pt-10 ">
      <h1 className="inline">Waves</h1>
      <button
        className="duration-400 group z-20 rounded-lg border-2 border-[#414141]  p-2 text-center transition-all hover:bg-[#414141] hover:text-white"
        onClick={setLibraryOpen}
      >
        Library
        <MusicalNoteIcon className="svg duration-400 inline transition-all group-hover:text-white " />
      </button>
    </nav>
  )
}

export default Nav
