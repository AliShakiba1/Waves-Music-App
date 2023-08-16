export type Music = {
  name: string
  cover: string
  artist: string
  audio: string
  color: [string, string]
  active: boolean
  id: string
}

export type musicProps = {
  currentSong?: Music
}