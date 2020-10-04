export const signIn = (token) => {
    return {
        type: 'SIGN_IN',
        payload: token
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}