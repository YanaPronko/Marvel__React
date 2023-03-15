import { useState, useRef, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spiner from "../spinner/Spinner";

import "./comicsList.scss";
import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [pageEnded, setPageEnded] = useState(false);


  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    updateComicsList(offset, true);
  }, []);

  const updateComicsList = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onComicsLoaded);
  }

  const onComicsLoaded = (newComics) => {
    let ended = false;
    if (newComics.length < 8) {
      ended = true;
    }
    setComics((comics) => [...comics, ...newComics]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(ended);

  };

  useEffect(() => {
    window.addEventListener("scroll", checkPageEnded);

    return () => window.removeEventListener("scroll", checkPageEnded);
  }, []);

  useEffect(() => {
    if (pageEnded && !newItemLoading && !comicsEnded) {
      updateComicsList(offset);
    }
  }, [pageEnded]);

 const checkPageEnded = () => {
   if (
     window.scrollY + document.documentElement.clientHeight >=
     document.documentElement.offsetHeight - 3
   ) {
     setPageEnded(true);
   }
 };

function view(comics) {
  const items = comics.map(({ title, thumbnail, price }, i) => {

    return (
      <li key={i} className="comics__item">
        <a href="#">
          <img src={thumbnail} alt={title} className="comics__item-img" />
          <div className="comics__item-name">{title}</div>
          <div className="comics__item-price">{price}</div>
        </a>
      </li>
    );
  });
  return <ul className="comics__grid">{items}</ul>;
}

const items = view(comics);
const errorMes = error ? <ErrorMessage /> : null;
const spinner = loading && !newItemLoading ? <Spiner /> : null;


  return (
    <div className="comics__list">
      {spinner}
      {errorMes}
      {items}
      <button
        disabled={newItemLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        onClick={()=> updateComicsList(offset)}
        className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
