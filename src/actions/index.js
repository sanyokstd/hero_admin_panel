export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDelete = (heroId) => {
    return {
        type: 'HEROES_DELETE',
        payload: heroId
    }
}

export const heroesAdd = (heroData) => {
    return {
        type: 'HEROES_ADD',
        payload: heroData
    }
}

export const getFilters = (filters) => {
    return {
        type: 'GET_FILTERS',
        payload: filters
    }
}

export const setActiveFilter = (filter) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: filter
    }
}