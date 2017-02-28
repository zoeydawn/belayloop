// import { firebaseMessaging } from '../firebase';
//
// function notificationPermissionGranted() {
//   return {
//     type: 'NOTIFICATION_PERMISSION_GRANTED',
//     payload: true,
//   };
// }
//
// function notificationPermissionDenied() {
//   return {
//     type: 'NOTIFICATION_PERMISSION_DENIED',
//     payload: true,
//   };
// }
//
// export function requestNotificationPermission() {
//   return (dispatch) => {
//     firebaseMessaging.requestPermission()
//     .then(() => {
//       console.log('Notification permission granted.');
//       // TODO(developer): Retrieve an Instance ID token for use with FCM.
//       // ...
//       dispatch(notificationPermissionGranted());
//     })
//     .catch((err) => {
//       console.log('Unable to get permission to notify.', err);
//       dispatch(notificationPermissionDenied());
//     });
//   };
// }
