export const createUrl = (baseURL: string, params: object) =>
{

    let url = baseURL;
    Object.entries(params).forEach(([key, value]) =>
    {
        if (value != null && value != undefined)
        {
            if(typeof value == 'object'){
                value = encodeURIComponent(JSON.stringify(value));
            }
            url == baseURL ? url += `?${key}=${value}` : url += `&${key}=${value}`;
        }
    });
    return url;
};