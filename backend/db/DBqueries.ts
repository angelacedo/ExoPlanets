
const getExoplanets = (limit: string | string[] | undefined) => `SELECT * FROM pscomppars ORDER BY disc_pubdate DESC ${limit ? `LIMIT ?, ?;` : ''}`;

const getNumberOfExoplanets = (year: string | string[] | undefined) => `SELECT COUNT(*) AS count FROM pscomppars ${year ? ` where SUBSTR(disc_pubdate, 1, 4) = ?` : ''}`;

const getNumberOfClosestPlanets = () => `SELECT COUNT(*) as count FROM pscomppars WHERE sy_dist <= ? ORDER BY sy_dist ASC`;

const getExoplanetsByMonth = () => `SELECT
                    SUBSTR(disc_pubdate, 1, 4) AS year,
                    SUBSTR(disc_pubdate, 6, 2) AS month,
                    COUNT(*) AS exoplanetsCount
                FROM
                    pscomppars
                GROUP BY
                    SUBSTR(disc_pubdate, 1, 4),
                    SUBSTR(disc_pubdate, 6, 2)
            ORDER BY month ASC`;

const getLastTimeUpdated = () => `SELECT MAX(last_update) as last_update FROM pscomppars`;


const getExoplanetsWithFilters = (limit: string | string[] | undefined, filtersQuery: string) =>
{
    return `SELECT * FROM pscomppars ${filtersQuery} ORDER BY disc_pubdate DESC ${limit ? `LIMIT ?, ?;` : ''}`;
};

const removeOffsetAndCountRows = (query: string) => query.replace(/LIMIT \?, \?;/, ';').replace('*', 'COUNT(*) as count');

const toExport = { getExoplanetsByMonth, getNumberOfExoplanets, getExoplanets, getNumberOfClosestPlanets, getLastTimeUpdated, getExoplanetsWithFilters, removeOffsetAndCountRows };
export default toExport