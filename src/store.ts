import { create } from 'zustand'
import chillHop from './util'
import { Music } from './types/music'

type State = {
  Musics: Music[]
}


const useStore = create<State>(set => ({
  Musics: chillHop(),
}))

export default useStore
