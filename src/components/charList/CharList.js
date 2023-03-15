import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spiner from "../spinner/Spinner";

import "./charList.scss";


const CharList = (props) => {
  const [chars, setChars] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charsEnded, setCharsEnded] = useState(false);
  const [pageEnded, setPageEnded] = useState(false);

  /* state = {
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charsEnded: false,
    pageEnded: false,
  }; */

  const itemRefs = useRef([]);
  // const marvelService = new MarvelService();

  const { loading, error, getAllCharacters } = useMarvelService();

  /* setRefs = (ref) => {
    this.itemRefs.push(ref);
  } */


  const onCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }
    setChars((chars) => [...chars, ...newChars]);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);
    setCharsEnded(charsEnded => ended);

    /* this.setState(({ chars, offset, charsEnded }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charsEnded: ended,
    })); */
  };

  // const onCharsLoading = () => {
  //   setNewItemLoading(true);
  //   // this.setState({
  //   //   newItemLoading: true,
  //   // });
  // };

  // const onError = () => {
  //   setError(true);
  //   setLoading(false);
  //   // this.setState({
  //   //   loading: false,
  //   //   error: true,
  //   // });
  // };

  // Эмуляция  componentDidMount()
  useEffect(() => {
    updateCharsList(offset, true);
  }, []);

  const updateCharsList = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    // onCharLoading();
    getAllCharacters(offset).then(onCharsLoaded);
    // marvelService.getAllCharacters(offset).then(onCharsLoaded).catch(onError);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkPageEnded);

    return () => window.removeEventListener("scroll", checkPageEnded);
  }, []);

  useEffect(() => {
    if (pageEnded && !newItemLoading && !charsEnded) {
      updateCharsList(offset);
    }
  }, [pageEnded]);

  /* componentDidMount() {
    this.updateCharsList();
    // window.addEventListener("scroll", this.checkPageEnded);
    // window.addEventListener("scroll", this.onUpdateCharListByScroll);
    // this.timerId = setInterval(this.updateChar, 3000);
  } */


  /* componentWillUnmount() {
    window.removeEventListener("scroll", checkPageEnded);
    window.removeEventListener("scroll", onUpdateCharListByScroll);
  }
 */

  const checkPageEnded = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.offsetHeight - 3
    ) {
      setPageEnded(true);
    }
  };

  // const onUpdateCharListByScroll = () => {
  //   if (pageEnded && !newItemLoading && !charsEnded) {
  //     updateCharsList(offset);
  //   }
  // };


  const focusOnItem = (id) => {
    itemRefs.current.forEach(item => { item.classList.remove('char__item_selected') });
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function view(chars) {
    const items = chars.map(({ id, name, thumbnail }, i) => {
      let imgStyle = { objectFit: "cover" };

      if (
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          className="char__item"
          key={id}
          ref={el=> itemRefs.current[i] = el}
          tabIndex={0}
          onClick={() => {
            props.onSelectedChar(id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === "" || e.key === "Enter") {
              props.onSelectedChar(id);
              focusOnItem(i);
            }
          }}>
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

    const items = view(chars);
    const errorMes = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spiner /> : null;

  //В классовых компонентах это условие нормально работает тк. там каждый раз не пересоздается
  // content - это свойство класса, которое не пересоздавалось, а просто изменялось,
  // а в функциональных компонентах каждый раз переоздается => перерисовывается ????
  // из-за этого контент прыгает
    // const content = !(error || loading) ? items : null;

    return (
      <div className="char__list">
        {errorMes}
        {spinner}
        {/* {content} */}
        {items}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charsEnded ? "none" : "block" }}
          onClick={() => updateCharsList(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
}

CharList.propTypes = {
  onSelectedChar: PropTypes.func.isRequired,
}

export default CharList;
