import SpInAppUpdates, {
    IAUUpdateKind,
    StartUpdateOptions,
} from 'sp-react-native-in-app-updates';

export const checkForUpdate = async () => {
    const inAppUpdates = new SpInAppUpdates(false);

    try {
        const result = await inAppUpdates.checkNeedsUpdate();

        if (result.shouldUpdate) {
            const updateOptions: StartUpdateOptions = {
                updateType: IAUUpdateKind.FLEXIBLE,
            };

            await inAppUpdates.startUpdate(updateOptions);
        }
    } catch (error) {
        console.error('Error checking for updates:', error);
    }
};