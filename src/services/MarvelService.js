class MarvelService {

  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=3bc0075bdf9cab04a01fcd1a7e7d1b84";
  _baseOffset = 210;

  getResources = async (url) => {
    const responce = await fetch(url);

    if (!responce.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${responce.status}`);
    }
    const data = await responce.json();
    return data;
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResources(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };
  getCharacter = async (id) => {
    const res = await this.getResources(
      `${this._apiBase}characters/${id}?limit=9&offset=210&${this._apiKey}`
    );
    const resPath = res.data.results[0];
    return this._transformCharacter(resPath);
  };

  _transformCharacter = (char) => {
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
}

export default MarvelService;

// 3bc0075bdf9cab04a01fcd1a7e7d1b84 - Your public key
// 322da4a5ba1b135afbf86f8559be02f33abf0e9a - Your private key
