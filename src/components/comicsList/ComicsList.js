import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import useMarvelServices from '../../services/MarvelServices';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Loader from '../loader/Loader';
import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(8),
        [comicsEnded, setComicsEnded] = useState(false)

    const { getAllComics, loading, error } = useMarvelServices();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(updateChar)
    }
    const updateChar = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9)
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => (
            <li className="comics__item" key={i}>
                <Link to={`${item.id}`}>
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
        ));
        return <ul className="comics__grid">{items}</ul>;
    }


    const items = renderItems(comicsList)

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Loader /> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {items}
            <button className="button button__main button__long" onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;