export interface Exoplanet {
  objectid: string
  pl_name: string
  pl_letter: string
  hostid: string
  hostname: string
  disc_pubdate: string
  disc_year: number
  disc_method: string | null
  discoverymethod: string | null
  disc_locale: string | null
  disc_facility: string | null
  disc_instrument: string | null
  disc_telescope: string | null
  disc_refname: string | null
  ra: number | null
  rasymerr: number | null
  rastr: string | null
  ra_solnid: string | null
  ra_reflink: string | null
  dec: number | null
  decsymerr: number | null
  decstr: string | null
  dec_solnid: string | null
  dec_reflink: string | null
  glon: number | null
  glonstr: string | null
  glon_solnid: string | null
  glon_reflink: string | null
  glat: number | null
  glatstr: string | null
  glat_solnid: string | null
  glat_reflink: string | null
  elon: number | null
  elonstr: string | null
  elon_solnid: string | null
  elon_reflink: string | null
  elat: number | null
  elat_solnid: string | null
  elat_reflink: string | null
  elatstr: string | null
  sy_dist: number | null
}


export interface ExoplanetByMonth{
  year: number,
  month: number,
  exoplanetsCount: number
}