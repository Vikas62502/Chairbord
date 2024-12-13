import { check, request, RESULTS } from 'react-native-permissions'

export const permissionCheck = async (permission: any): Promise<string> => {
    try {
        const result = await check(permission)

        switch (result) {
            case RESULTS.GRANTED:
                return 'Permission Granted'
            case RESULTS.DENIED:
                return 'Permission Denied'
            case RESULTS.BLOCKED:
                return 'Permission Blocked'
            case RESULTS.UNAVAILABLE:
                return 'Permission Unavailable'
            default:
                return 'Unknown Status'
        }
    } catch (error) {
        console.error('Error checking permission:', error)
        return 'Error checking permission'
    }
}


export const requestPermissions = async (permissions: any): Promise<string> => {
    try {
        const requestResults = await request(permissions)
        if (requestResults === RESULTS.GRANTED) {
            return 'Permissions granted'
        }
        return 'Permissions denied'
    } catch (error) {
        console.error('Error requesting permissions:', error)
        return 'Error requesting permissions'
    }
}