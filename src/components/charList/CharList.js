import { Component } from "react";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spiner from "../spinner/Spinner";

import "./charList.scss";


class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charsEnded: false,
    pageEnded: false,
  };
  itemRefs = [];
  marvelService = new MarvelService();

  setRefs = (ref) => {
    this.itemRefs.push(ref);
  }


  onCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }
    this.setState(({ chars, offset, charsEnded }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charsEnded: ended,
    }));
  };

  onCharsLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateCharsList = (offset) => {
    this.onCharsLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };

  componentDidMount() {
    this.updateCharsList();
    // window.addEventListener("scroll", this.checkPageEnded);
    // window.addEventListener("scroll", this.onUpdateCharListByScroll);
    // this.timerId = setInterval(this.updateChar, 3000);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.checkPageEnded);
    window.removeEventListener("scroll", this.onUpdateCharListByScroll);
  }

  checkPageEnded = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.offsetHeight - 3
    ) {
      this.setState({ pageEnded: true });
    }
  };

  onUpdateCharListByScroll = () => {
    const { pageEnded, charsEnded, newItemLoading, offset } = this.state;

    if (pageEnded && !newItemLoading && !charsEnded) {
      this.updateCharsList(offset);
    }
  };


  focusOnItem = (id) => {
    this.itemRefs.forEach(item => { item.classList.remove('char__item_selected') });
    this.itemRefs[id].classList.add("char__item_selected");
    this.itemRefs[id].focus();
  }

  view(chars) {
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
          ref={this.setRefs}
          tabIndex={0}
          onClick={() => {
            this.props.onSelectedChar(id);
            this.focusOnItem(i);
          }
          }>
          onKeypress={(e) => {
            if (e.key === "" || e.key === "Enter") {
               this.props.onSelectedChar(id);
               this.focusOnItem(i);
            }
          }}
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { chars, loading, error, newItemLoading, offset, charsEnded } =
      this.state;
    const items = this.view(chars);

    const errorMes = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(error || loading) ? items : null;

    return (
      <div className="char__list">
        {errorMes}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charsEnded ? "none" : "block" }}
          onClick={() => this.updateCharsList(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onSelectedChar: PropTypes.func.isRequired,
}

export default CharList;
