function request(url, method = 'GET') {
    return new Promise(async (resolve, reject) => {
        const options = {
            method, 
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTEzNTU1YWE3ZWQ3MmNkN2M1M2I0M2MwODJkYTZkZSIsInN1YiI6IjY0NmIxYzNkYTUwNDZlMDBlNWI3Mjc1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GG-5LMU7_FAMYJtGs0bNZvcefQV5x1fOWWQP6BHjPIU'
            }
        }

        const response = await fetch(url, options);
        const result = await response.json()
        if (response.ok) {
            resolve(result)
        }
        else {
            reject(result)
        }
    })
}

export const get = url => request(url)