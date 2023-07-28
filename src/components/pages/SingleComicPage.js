import ErrorMessage from '../errorMessage/ErrorMessage';
import Loader from '../loader/Loader';
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import useMarvelServices from '../../services/MarvelServices';

import './singleComic.scss';

const SingleComicPage = () => {
    const { loading, error, getComic, clearError } = useMarvelServices();
    const [comic, setComic] = useState(null);
    const { comicId } = useParams()

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError()
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const spinner = loading ? <Loader /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <div className="single-comic">
            <>
                {spinner}
                {errorMessage}
                {content}
            </>
        </div>
    )
}
const View = ({ comic }) => {
    const { title, description, price, pageCount, thumbnail } = comic

    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;