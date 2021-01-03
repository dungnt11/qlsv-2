import React from 'react';
import { firebase } from '../firebase/Firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setError,
        setLoading,
        login: async (email, password) => {
          setError('');
          if (!email) {
            setError('Bạn phải điền tên đăng nhập!');
            return;
          }
          if (!password) {
            setError('Bạn phải điền tên mật khẩu!');
            return;
          }
          setLoading(true);
          try {
            const res = await firebase.default.auth().signInWithEmailAndPassword(email, password);
            await firebase.default
              .database()
              .ref('users')
              .orderByChild('email')
              .equalTo(email)
              .on('value', (snapshot) => {
                if (snapshot.val()) {
                  const user = Object.values(snapshot.val())[0];
                  const id = Object.keys(snapshot.val())[0];
                  setUser({
                    name: user.fullName,
                    email: user.email,
                    avatar: user.avatar,
                    description: user.description,
                    id: id,
                    _id: id,
                  });
                  setLoading(false);
                }
              });
          } catch (e) {
            console.log(e);
            setError('Tên đăng nhập hoặc mật khẩu sai!');
            setLoading(false);
          }
        },
        register: async (fullName, email, password, description, urlAvatar) => {
          if (error) {
            return;
          }
          try {
            const res = await firebase.default.auth().createUserWithEmailAndPassword(email, password);
            await firebase.default.database().ref('/users').push({
              fullName,
              email,
              description,
              avatar: urlAvatar,
            });
            return {
              name: fullName,
              email: res.user.email,
              avatar: urlAvatar || 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png',
              id: res.user.uid,
              _id: res.user.uid,
            };
          } catch (e) {
            console.log(e);
            setError('Không thể đăng kí tài khoản!');
            setLoading(false);
          }
        },
        logout: async () => {
          setError('');
          setLoading(true);
          try {
            await firebase.default.auth().signOut();
            setLoading(false);
          } catch (e) {
            console.error(e);
            setLoading(false);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
