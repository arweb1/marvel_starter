import { useHttp } from "../Hooks/http.hook";

const useMarvelServices = () => {
  const { loading, error, request, clearError } = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=1e9bc777df79530bf917f847d4cfc52b';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter)
  };
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0])
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      descr: char.description ? `${char.description.slice(0, 210)}...` : 'no discription available',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  const getAllComics = async (offset = 0) => {
    const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`)
    return res.data.results.map(_transformComics);
  }

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
    return _transformComics(res.data.results[0])
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description!",
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'Not Available',
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No info about page count'
    }
  }

  return {
    loading,
    error,
    request,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComic
  }
}

export default useMarvelServices;
