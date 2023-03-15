import { useState, useEffect} from "react";
import useMarvelService from "../../services/MarvelService";
import Spiner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./randomChar.scss";

import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState({});

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  // state = {
  //   char: {},
  //   loading: true,
  //   error: false,
  // };


  useEffect(() => {
    updateChar();
    // const timerId = setInterval(updateChar, 3000);
    // return ()=> clearInterval(timerId);
  }, []);

  const { loading, error, getCharacter, clearError } = useMarvelService();
  // const marvelService = new MarvelService();

  // const onCharLoading = () => {
  //   setLoading(true);
  //   // this.setState({
  //   //   loading: true,
  //   // });
  // };
  const onCharLoaded = (char) => {
    setChar(() => char);
    // setLoading(false);
    // this.setState({
    //   char,
    //   loading: false,
    // });
  };

  // const onError = () => {
  //   setError(true);
  //   setLoading(false);
  //   // this.setState({
  //   //   loading: false,
  //   //   error: true,
  //   // });
  // };

  const updateChar = () => {
    clearError();
    const id = randomID();
    getCharacter(id).then(onCharLoaded);
    // onCharLoading();
    // marvelService
    //   .getCharacter(id)
    //   .then(onCharLoaded)
    //   .catch(onError);
  };

  /* componentDidMount() {
    this.updateChar();
    // this.timerId = setInterval(this.updateChar, 3000);
  } */

  // componentWillUnmount() {
  //   clearInterval(this.timerId);
  // }

  const randomID = () => {
    const minNumber = 1011000;
    const maxNumber = 1011400;
    return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
  };

    const errorMes = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(error || loading) ? <View char={char} /> : null;

    return (
      <div className="randomchar">
        {errorMes}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main" onClick={updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  let imgStyle = { objectFit: "cover" };

  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "unset" };
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} className="randomchar__img" alt={name} style={ imgStyle} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
