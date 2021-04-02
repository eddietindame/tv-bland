export type Schedule = Episode[]

export interface ShowWithCast extends Show {
    _embedded: {
        cast: Cast
    }
}

export interface Episode {
    id: number
    url: string // Url
    name: string
    season: number
    number: number
    type: string // "regular"
    airdate: string // "2021-03-30"
    airtime: string // 09:00
    airstamp: string // 2021-03-30T13:00:00+00:00 Date
    runtime: number
    image: Image | null
    summary: string | null // HTML formatted
    show: Show
    _links: Links
}

interface Show {
    id: number
    url: string // Url
    name: string
    type: string
    language: string
    genres: string[] // "Comedy", "Science-Fiction"
    status: string // "Running"
    runtime: number
    premiered: string // 2021-03-29
    officialSite: string // Url
    schedule: ShowSchedule
    rating: ShowRating
    weight: number
    network: ShowNetwork
    webChannel: any // null
    dvdCountry: any // null
    externals: ShowExternals
    image: Image
    summary: string | null // HTML formatted
    updated: number // Timestamp
    _links: Links
}

type Cast = CastMember[]

interface CastMember {
    person: Person
    character: Character
    self: boolean
    voice: boolean
}

interface Person {
    id: number
    url: string
    name: string
    country: Country
    birthday: string
    deathday: string | null
    gender: string
    image: Image
    _links: Links
}

interface Character {
    id: number
    url: string
    name: string
    image: Image
    _links: Links
}
interface Image {
    medium: string // Url
    original: string // Url
}

interface Links {
    self: { href: string }
    previousepisode?: { href: string }
    nextepisode?: { href: string }
}

interface Country {
    name: string
    code: string // "US"
    timezone: string // "America/New_York"
}

interface ShowSchedule {
    time: string // "13:30" | ""
    days: string[]
}

interface ShowRating {
    average: number | null
}

interface ShowNetwork {
    id: number
    name: string
    country: Country
}

interface ShowExternals {
    tvrage: number | null
    thetvdb: number | null
    imdb: string | null
}
