import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spiner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

import './singleComicPage.scss';

const SingleComicPage = () => {
    const { comicID } = useParams();
    const [comic, setComic] = useState(null);

    const { getComic, loading, clearError, error } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicID]);

    const updateComic = () => {
        clearError();
        getComic(comicID).then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;
    return (
        <>
            <AppBanner />
            {spinner}
            {errorMessage}
            {content}
        </>
    );
}

const View = ({comic}) => {
    const { name, description, price, language, thumbnail, pageCount } = comic;
     return (
         <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                 <h2 className="single-comic__name">{name}</h2>
                 <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language:{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics"className="single-comic__back">Back to all </Link>
        </div>
    )
}

export default SingleComicPage;