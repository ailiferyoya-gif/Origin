# Firebase Google Login Setup

1. Firebase Consoleでプロジェクトを作成します。
2. Authentication > Sign-in method で Google を有効にします。
3. Authentication > Settings > Authorized domains に以下を追加します。
   - `ailiferyoya-gif.github.io`
   - ローカル確認用に必要なら `localhost`
4. Firestore Database を作成します。
5. Project settings > Your apps から Web アプリを追加し、Firebase config をコピーします。
6. `PreviewWeb/firebase-config.js` の空欄をコピーした値で埋めます。

```js
window.NINJA_FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  appId: "YOUR_APP_ID"
};
```

Firestore security rules の最小例:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/saves/{saveId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
