/** Stadium zone data structure */
export interface Zone {
  id: string
  name: string
  level: 'LOW' | 'MEDIUM' | 'HIGH'
  capacity: number
  waitTime: number
}

/** Emergency alert structure */
export interface Alert {
  id: number
  type: 'Medical' | 'Security' | 'Weather' | 'Evacuation' | 'Information'
  message: string
  timestamp: Date
  dismissed?: boolean
}

/** Match schedule structure */
export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  time: string
  venue: string
  group?: string
  status: 'upcoming' | 'live' | 'completed'
}

/** Transport option structure */
export interface TransportOption {
  type: string
  status: string
  nextArrival: string
  waitTime: number
}

/** Staff activity log entry */
export interface ActivityLog {
  id: number
  action: string
  zone?: string
  timestamp: Date
}
