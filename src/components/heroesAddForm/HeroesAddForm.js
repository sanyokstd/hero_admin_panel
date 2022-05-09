

import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilters,heroesFetching, heroesFetchingError, heroesAdd } from '../../actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {filters, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(getFilters(data)))
            .catch(() => dispatch(heroesFetchingError())) 
        // eslint-disable-next-line
    }, []);

    const handleFormSubmit = (values) => {
        const axios = require('axios');
        axios.post('http://localhost:3001/heroes', values)
        .then(resp => {
            dispatch(heroesAdd(resp.data))
        })
        .catch(() => dispatch(heroesFetchingError())) 
    }

    return (
        <Formik 
            initialValues = {{
                name: '',
                description: '',
                element: '',
            }}

            validationSchema = {Yup.object({
                name: Yup.string().min(2, 'мінімум 2 символа')
                        .required('обовязкове поле'),
                description: Yup.string().min(10, 'мінімум 10 символа')
                        .required('обовязкове поле'),
                element: Yup.string().required('обовязкове поле')
            })}

            onSubmit={ values => handleFormSubmit(values)}
        >
        <Form className="border p-4 shadow-lg rounded"> 
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <Field 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
                <ErrorMessage className='error' name='name' component={'div'}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <Field
                    as="textarea"
                    name="description" 
                    className="form-control" 
                    id="description" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
                <ErrorMessage className='error' name='description' component={'div'}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <Field 
                    as="select"
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    {
                        filters.map((el,index) => {
                            return(
                                <option key={index} value={el}>{el}</option>
                            )
                        })
                    }
                </Field>
                <ErrorMessage className='error' name='element' component={'div'}/>
            </div>

            <button type="submit" className="btn btn-primary"
            disabled={heroesLoadingStatus === 'loading' ? true : false}
            >Создать</button>
        </Form>
        </Formik>
    )
}

export default HeroesAddForm;