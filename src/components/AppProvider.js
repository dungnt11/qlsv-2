import React from 'react';
import { firebase } from '../firebase/config';

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

            setUser({
              name: res.user.displayName || 'No Name',
              email: res.user.email,
              avatar: res.user.photoURL || 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png',
              id: res.user.uid,
              _id: res.user.uid
            });
            setLoading(false);
          } catch (e) {
            console.log(e);
            setError('Tên đăng nhập hoặc mật khẩu sai!');
            setLoading(false);
          }
        },
        register: async (email, password, rePassword) => {
          setError('');

          if (!email) {
            setError('Bạn phải điền tên đăng nhập!');
            return;
          }
          if (!password) {
            setError('Bạn phải điền mật khẩu!');
            return;
          }

          if (password !== rePassword) {
            setError('Hai mật khẩi phải giống nhau!');
            return;
          }

          setLoading(true);
          try {
            const res = await firebase.default.auth().createUserWithEmailAndPassword(email, password);
            setLoading(false);

            return {
              name: res.user.displayName || 'No Name',
              email: res.user.email,
              avatar: res.user.photoURL || 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png',
              id: res.user.uid,
              _id: res.user.uid
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