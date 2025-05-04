import axios from "axios"

const API_KEY = "7eed0a2e30a25e44a6577a99755b86a0"
const BASE_URL = "https://api.the-odds-api.com/v4"

export interface Sport {
  key: string
  active: boolean
  group: string
  description: string
  title: string
  has_outrights: boolean
}

export interface Event {
  id: string
  sport_key: string
  sport_title: string
  commence_time: string
  home_team: string
  away_team: string
  bookmakers: Bookmaker[]
}

export interface Bookmaker {
  key: string
  title: string
  last_update: string
  markets: Market[]
}

export interface Market {
  key: string
  last_update: string
  outcomes: Outcome[]
}

export interface Outcome {
  name: string
  price: number
  point?: number
}

export const getSports = async (): Promise<Sport[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/sports`, {
      params: {
        apiKey: API_KEY,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching sports:", error)
    return []
  }
}

export const getUpcomingEvents = async (sport: string = "upcoming"): Promise<Event[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/sports/${sport}/odds`, {
      params: {
        apiKey: API_KEY,
        regions: "us",
        markets: "h2h,spreads,totals",
        oddsFormat: "decimal",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

export const getRemainingRequests = async (): Promise<number> => {
  try {
    const response = await axios.get(`${BASE_URL}/sports`, {
      params: {
        apiKey: API_KEY,
      },
    })
    return parseInt(response.headers["x-requests-remaining"] || "0")
  } catch (error) {
    console.error("Error fetching remaining requests:", error)
    return 0
  }
} 