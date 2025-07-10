export const baseApiUrl = "https://shift-intensive.ru/api"

export const users = {
    authorize: `${baseApiUrl}/users/signin`,
    update: `${baseApiUrl}/users/proflie`,
    get: `${baseApiUrl}/users/session`
}

export const homePage = {
    getPickupPoints: '/delivery/points',
    getPackageOptions: '/delivery/package/types'
}