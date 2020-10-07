export const signIn = (token, username) => {
    return {
        type: 'SIGN_IN',
        payload: {token: token, username: username}
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const changeTheme = () => {
    return {
        type: 'CHANGE_THEME'
    }
}