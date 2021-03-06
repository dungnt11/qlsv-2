import React from 'react';
import { AsyncStorage } from 'react-native';
import { firebase } from '../firebase/Firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loadingDeleteUser, setLoadingDeleteUser] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContext.Provider
      value={{
        user, setUser,
        loading, setLoading,
        loadingDeleteUser, setLoadingDeleteUser,
        error,
        setError,
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
              .on('value', async (snapshot) => {
                if (snapshot.val()) {
                  const user = Object.values(snapshot.val())[0];
                  const id = Object.keys(snapshot.val())[0];
                  const newUser = {
                    id: id,
                    _id: id,
                    name: user.fullName,
                    email: user.email,
                    avatar: user.avatar,
                    description: user.description,
                    salary: user.salary,
                    bonus: user.bonus,
                    fine: user.fine,
                    dayToWork: user.dayToWork,
                    room: user.room,
                  };

                  setUser(newUser);
                  try {
                    await AsyncStorage.setItem(
                      'login',
                      JSON.stringify(newUser)
                    );
                  } catch (error) {
                    console.log(error);
                  }

                  setLoading(false);
                }
              });
          } catch (e) {
            console.log(e);
            setError('Tên đăng nhập hoặc mật khẩu sai!');
            setLoading(false);
          }
        },
        register: async (
          fullName,
          email,
          password,
          description,
          urlAvatar,
          salary,
          bonus,
          fine,
          dayToWork,
          room,
        ) => {
          if (error) {
            return;
          }
          await firebase.default.auth().createUserWithEmailAndPassword(email, password);
          await firebase.default.database().ref('/users').push({
            fullName,
            email,
            description,
            avatar: urlAvatar,
            salary,
            bonus,
            fine,
            dayToWork,
            room,
          });
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
