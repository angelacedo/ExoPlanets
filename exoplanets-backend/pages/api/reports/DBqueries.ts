export const getExoplanets = (limit: string) => `${process.env.TAP_URL_SYNC}?query=${encodeURIComponent(`select TOP ${limit} * from pscomppars`)}&format=json`;

export const getNumberOfExoplanets = (year: string) => `${process.env.TAP_URL_SYNC}?query=${encodeURIComponent(`select COUNT(*) AS count from pscomppars${year ? ` where SUBSTR(disc_pubdate, 1, 4) = ${year}` : ''}`)}&format=json`;

export const getNumberOfClosestPlanets = (distance: string) => `${process.env.TAP_URL_SYNC}?query=${encodeURIComponent(`SELECT COUNT(*) as count FROM pscomppars WHERE sy_dist <= ${distance} ORDER BY sy_dist ASC`)}&format=json`;

export const getExoplanetsByMonth = (year: string) => `${process.env.TAP_URL_SYNC}?query=${encodeURIComponent(`SELECT
                    SUBSTR(disc_pubdate, 1, 4) AS year,
                    SUBSTR(disc_pubdate, 6, 2) AS month,
                    COUNT(*) AS exoplanetsCount
                FROM
                    pscomppars
                GROUP BY
                    SUBSTR(disc_pubdate, 1, 4),
                    SUBSTR(disc_pubdate, 6, 2)
            ORDER BY month ASC`)}&format=json`;




export default { getExoplanetsByMonth, getNumberOfExoplanets, getExoplanets, getNumberOfClosestPlanets };