import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spiner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";


const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  /* state = {
    char: null,
    loading: false,
    error: false,
  }; */

  // const marvelService = new MarvelService();
  const { loading, error, getCharacter, clearError } = useMarvelService();

  const updateChar = () => {
    const { charId } = props;
    if (!charId) return;

    // onCharLoading();
    // marvelService
    //   .getCharacter(charId)
    //   .then(onCharLoaded)
    //   .catch(onError);
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };


  useEffect(() => {
    updateChar();
  }, [props.charId]);

	// componentDidMount() { // хук, который срабатывает в самом начале загрузки приложения
	// 	this.updateChar();
	// }

 /*
	componentDidUpdate(prevProps, prevState) { // хук, который срабатывает при изменении state или props,
																						// данного компонента, каждый перерендер - вызывает этот хук
																						//  можно попасть в бесконечный цикл

		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
		// this.updateChar();
	} */

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


		const skeleton = char || loading || error ? null : <Skeleton />;
		const errorMes = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(error || loading || !char) ? <View char={char}/> : null;

    return (
			<div className="char__info">
				{skeleton}
				{errorMes}
				{spinner}
				{content}
      </div>
    );
}

const View = ({ char }) => {
	const {name, description, thumbnail, homepage, wiki, comics } = char;

	let imgStyle = { objectFit: "cover" };
   if (
     thumbnail ===
     "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
   ) {
     imgStyle = { objectFit: "unset" };
   }
	return (
    <>
      <div className="char__basics">
				<img src={thumbnail} alt={name} style={ imgStyle} />
        <div>
					<div className="char__info-name">{ name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
       {description}
      </div>
      <div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{ comics.length > 0 ? null : "There is no comics with this character" }

				{comics.map((item, i) => {
					if (i > 9) {
						return null;
					}
						return (
						<li key={i} className="char__comics-item">
          		{item.name}
        		</li>
						);
					})
				}
      </ul>
    </>
  );
}

CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo;
