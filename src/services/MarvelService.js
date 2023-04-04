import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=3bc0075bdf9cab04a01fcd1a7e7d1b84";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=6&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };
  const getCharacter = async (id) => {
    const res = await request(
      `${_apiBase}characters/${id}?limit=9&offset=210&${_apiKey}`
    );
    const resPath = res.data.results[0];
    return _transformCharacter(resPath);
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : "Description didn't find",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  }
  const _transformComics = (comic) => {
    return {
      id: comic.id,
      name: comic.name,
      description: comic.description
        ? `${comic.description.slice(0, 210)}...`
        : "Description didn't find",
      pageCount: comic.pageCount
        ? comic.pageCount
        : "There is no information about pages",
      thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
      language: comic.textObjects[0]?.language || "en-us",
      // optional chaining operator
      price: comic.prices[0].price
        ? `${comic.prices[0].price}$`
        : "not available",
    };
  };
  return { loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic };
}

export default useMarvelService;

// 3bc0075bdf9cab04a01fcd1a7e7d1b84 - Your public key
// 322da4a5ba1b135afbf86f8559be02f33abf0e9a - Your private key
