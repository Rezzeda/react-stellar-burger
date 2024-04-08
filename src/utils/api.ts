import { getCookie, setCookie } from "./cookie";
import { GetOrderType,
    OrderResponseType,
    RefreshResponseWithTokenType,
    UserLoginType,
    UserRegisterType,
    UserResetPasswordType,
    UserResponseType,
    UserResponseWithTokenType } from "./types";

// 1 раз объявляем базовый урл
export const BASE_URL = "https://norma.nomoreparties.space/api/";

// создаем функцию проверки ответа на `ok`
const checkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
        return res.json();
    }
    // не забываем выкидывать ошибку, чтобы она попала в `catch`
    return Promise.reject(`Ошибка ${res.status}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// // В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
// а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    return checkResponse(response);
}
// В get-запросах даже не нужно указывать 2й параметр. 
//Он получится undefined, что без проблем для fetch (который внутри).

// Загрузка ингредиентов
export const getIngredients = (): Promise<any> => request("ingredients", { method: "GET" });

interface IOrderData {
    ingredients: string[];
}

//Размещение заказа
export const postOrder = (ingredients: IOrderData): Promise<any> => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
        throw new Error("Токен не найден");
    }
    return request<OrderResponseType>("orders", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            authorization: accessToken,
        } as HeadersInit,
        body: JSON.stringify(ingredients),
    });
};

//инфо о заказе
export const getOrder = (orderNumber: string): Promise<any> => {
    return request<GetOrderType>(`orders/${orderNumber}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        } as HeadersInit,
    });
};

// обовление токена
export const refreshToken = (): Promise<any> => {
    return request<UserResponseWithTokenType>("auth/token", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        } as HeadersInit,
        // Используем функцию getCookie для получения refreshToken из cookie и передаем его в теле запроса
        body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
};

export const requestWithRefresh = async <T>(endpoint: string, options: RequestInit = {}): Promise<any> => {
    // Функция для выполнения запросов с обновлением токена
    try {
        const res = await request<T>(endpoint, options);
        return res;
    } catch (error: any) {
        console.log("error requestWithRefresh");
        if (error.statusCode === 401 || error.statusCode === 403) {
            try {
                const refreshData: RefreshResponseWithTokenType = await refreshToken(); // Используем refreshToken
                if (!refreshData.success) {
                    return Promise.reject(refreshData);
                }
                setCookie("accessToken", refreshData.accessToken);
                setCookie("refreshToken", refreshData.refreshToken);
                return await request<T>(endpoint, {
                    ...options,
                    headers: {
                        ...options.headers,
                        authorization: refreshData.accessToken,
                    } as HeadersInit,
                });
            } catch (error) {
                throw error;
            }
        }
        throw error;
    }
};

export const getRegisterUser = (data: UserRegisterType): Promise<any> => request<UserResponseWithTokenType>("auth/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify(data),
});

export const getLoginUser = (data: UserLoginType): Promise<any> => requestWithRefresh<UserResponseWithTokenType>("auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify(data),
});

export const getUser = (): Promise<any> => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
        throw new Error("Токен не найден");
    }
    return requestWithRefresh<UserResponseType>("auth/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: accessToken,
        } as HeadersInit,
    });
};

export const forgotPassword = (email: string): Promise<any> => request<UserResponseWithTokenType>("password-reset", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify({ email }),
});

export const resetPassword = (data: UserResetPasswordType): Promise<any> => request<UserResponseType>("password-reset/reset", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify(data),
});

export const updateProfile = (data: { email: string; name: string; password: string }): Promise<any> => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
        throw new Error("Токен не найден");
    }
    return requestWithRefresh<UserResponseWithTokenType>("auth/user", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: accessToken,
        } as HeadersInit,
        body: JSON.stringify(data),
    });
};

export const logoutUser = (): Promise<void> => request("auth/logout", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify({ token: getCookie("refreshToken") }),
});