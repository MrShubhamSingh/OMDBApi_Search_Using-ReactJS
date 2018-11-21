const fetchMovies = async (searchMovie) => {

    const response = await
        fetch('http://www.omdbapi.com/?s=' + searchMovie + '&apikey=8a44f853')
    const result = await response.json()
    return result

}

export default fetchMovies;