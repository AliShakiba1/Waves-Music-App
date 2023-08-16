import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { Music } from './types/music'
import chillHop from './util'

type State = {
  Musics: Music[]
  setFalseAll: (s: any) => Music[] | void | any | undefined
  isPlaying: boolean
  setIsplaying: () => void
  audioRef: HTMLAudioElement | null | any
  setAudioRef: (c: HTMLAudioElement | any) => void
  libraryOpen: boolean
  setLibraryOpen: () => void
}

const useStore = create(
  devtools<State>(set => ({
    Musics: chillHop(),
    setFalseAll: songs => set(() => ({ Musics: songs })),
    isPlaying: false,
    setIsplaying: () => set(state => ({ isPlaying: !state.isPlaying })),
    audioRef: null,
    setAudioRef: e => set(() => ({ audioRef: e })),
    libraryOpen: false,
    setLibraryOpen: () => set(state => ({ libraryOpen: !state.libraryOpen })),
  })),
)

export default useStore
