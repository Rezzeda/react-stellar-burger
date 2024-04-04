import { getCookie, setCookie } from "./cookie";

// 1 раз объявляем базовый урл
export const BASE_URL = "https://norma.nomoreparties.space/api/";

type RequestOptions = {
    method: string;
    headers?: { [key: string]: string };
    body?: string;
};
// создаем функцию проверки ответа на `ok`
const checkResponse = (res: Response): Promise<any> => {
    if (res.ok) {
        return res.json();
    }
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject(`Ошибка ${res.status}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// // В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
const request = (endpoint: string, options: RequestOptions): Promise<any> => {
    // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
};

// В get-запросах даже не нужно указывать 2й параметр. 
//Он получится undefined, что без проблем для fetch (который внутри).

// Загрузка ингредиентов
export const getIngredients = (): Promise<any> => request("ingredients", { method: "GET" });

interface IOrderData {
    ingredients: string[];
}

//Размещение заказа
export const postOrder = (data: IOrderData): Promise<any> => {
    return request("orders", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

// обовление токена
export const refreshToken = (): Promise<any> => {
    return request("auth/token", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // Используем функцию getCookie для получения refreshToken из cookie и передаем его в теле запроса
        body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
};


export const requestWithRefresh = async (endpoint: string, options: RequestOptions = {method: 'GET'}): Promise<any> => {
    // Функция для выполнения запросов с обновлением токена
    try {
        const res = await request(endpoint, options);
        return res;
    } catch (error: any) {
        console.log("error requestWithRefresh");
        if (error.statusCode === 401 || error.statusCode === 403) {
            try {
                const refreshData = await refreshToken(); // Используем refreshToken
                if (!refreshData.success) {
                    return Promise.reject(refreshData);
                }
                setCookie("accessToken", refreshData.accessToken);
                setCookie("refreshToken", refreshData.refreshToken);
                return await request(endpoint, {
                    ...options,
                    headers: {
                        ...options.headers,
                        authorization: refreshData.accessToken,
                    },
                });
            } catch (error) {
                throw error;
            }
        }
        throw error;
    }
};

export const getRegisterUser = (data: { email: string; password: string; name: string }): Promise<any> => request("auth/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
});

export const getLoginUser = (data: { email: string; password: string }): Promise<any> => requestWithRefresh("auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
});

export const getUser = (): Promise<any> => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
        throw new Error("Токен не найден");
    }
    return requestWithRefresh("auth/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: accessToken,
        },
    });
};

export const forgotPassword = (email: string): Promise<any> => request("password-reset", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
});

export const resetPassword = (data: { password: string; token: string }): Promise<any> => request("password-reset/reset", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
});

export const updateProfile = (data: { email: string; name: string; password: string }): Promise<any> => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
        throw new Error("Токен не найден");
    }
    return requestWithRefresh("auth/user", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: accessToken,
        },
        body: JSON.stringify(data),
    });
};

export const logoutUser = (): Promise<any> => request("auth/logout", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
});