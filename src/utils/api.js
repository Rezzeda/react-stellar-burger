const configApi = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json'
    }
}

function onResponse(res) {
    return res.ok ? res.json() : res.json().then((error) =>  Promise.reject(`Ошибка: ${error}`))
};

//Загрузка ингредиентов
export const getIngredients = () => {
    return fetch(`${configApi.baseUrl}/ingredients`, {
        headers: configApi.headers
    })
    .then(onResponse);
}