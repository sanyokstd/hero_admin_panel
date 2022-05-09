import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter, getFilters, heroesFetching, heroesFetchingError } from '../../actions';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(getFilters(data)))
            .catch(() => dispatch(heroesFetchingError())) 
        // eslint-disable-next-line
    }, []);

    const handeClickFilter = (el) => {
        dispatch(setActiveFilter(el))
    }
    
    const setClass = (filterName) => {
        switch (filterName){
            case 'all':
                return('btn-outline-dark')
            case 'fire':
                return('btn-outline-danger')
            case 'water':
                return('btn-outline-primary')
            case 'earth':
                return('btn-outline-success')
            case 'wind':
                return('btn-outline-secondary')
            default:
                break;
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {
                        filters.map((el,index) => {
                            let elClassName = 'btn '
                            elClassName += setClass(el)
                            elClassName += activeFilter === el ? ' active' : ''
                            return(
                                <button key={index} className={elClassName} onClick={()=>handeClickFilter(el)}>{el}</button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;