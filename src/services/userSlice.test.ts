import userReducer, { initialState, checkUserAuth, registerUser, loginUser, logoutUsers, updateUserInfo, authCheck } from './userSlice';

describe('userReducer', () => {
    it('should handle authCheck', () => {
        const nextState = userReducer(initialState, authCheck());
        expect(nextState.IsAuthChecked).toBe(true);
    });

    it('should handle checkUserAuth.fulfilled', () => {
        const payload = {
            success: true,
            user: {
                email: "test@example.com",
                name: "TestUser",
                password: "123456789",
            },
            accessToken: "access_token",
            refreshToken: "refresh_token",
        };
        const nextState = userReducer(initialState, {
            type: checkUserAuth.fulfilled.type,
            payload,
        });
        expect(nextState.data).toEqual(payload);
        expect(nextState.getUserRequest).toBe(false);
    });

    it('should handle registerUser.fulfilled', () => {
        const payload = {
            success: true,
            user: {
                email: "test@example.com",
                name: "TestUser",
            },
            accessToken: "access_token",
            refreshToken: "refresh_token",
        };
        const nextState = userReducer(initialState, {
            type: registerUser.fulfilled.type,
            payload,
        });
        expect(nextState.data).toEqual(payload);
        expect(nextState.registerUserRequest).toBe(false);
    });

    it('should handle loginUser.fulfilled', () => {
        const payload = {
            success: true,
            user: {
                email: "test@example.com",
                name: "TestUser",
            },
            accessToken: "access_token",
            refreshToken: "refresh_token",
        };
        const nextState = userReducer(initialState, {
            type: loginUser.fulfilled.type,
            payload,
        });
        expect(nextState.data).toEqual(payload);
        expect(nextState.loginUserRequest).toBe(false);
    });

    it('should handle updateUserInfo.fulfilled', () => {
        const payload = {
            success: true,
            user: {
                email: "test@example.com",
                name: "TestUser",
            },
        };
        const nextState = userReducer(initialState, {
            type: updateUserInfo.fulfilled.type,
            payload,
        });
        expect(nextState.data).toEqual(payload);
    });

    it('should handle logoutUsers.fulfilled', () => {
        const nextState = userReducer(initialState, {
            type: logoutUsers.fulfilled.type,
        });
        expect(nextState.data).toBe(null);
    });
});
