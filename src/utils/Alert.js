import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export const ShowAlert = (title, message, btnText, onPressButton, onHide) => {
    const onPress = () => {
        Dialog.hide();
        if (onPressButton) {
            onPressButton();
        }
    };

    const hide = () => {
        Dialog.hide();
        if (onHide) {
            onHide();
        }
    };
    return (
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            gravity: 'center',
            title: title,
            textBody: message,
            button: btnText || 'Okay',
            onPressButton: () => onPress(),
            onHide: () => hide(),
        })
    );
};
