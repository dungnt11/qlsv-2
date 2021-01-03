import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {AuthContext} from '../components/AppProvider';
import {firebase} from '../firebase/Firebase';

const ChatNavigator = () => {
  const {user} = React.useContext(AuthContext);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    firebase.default
      .database()
      .ref('/chat')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const messNew = [];
          const chatObject = Object.values(snapshot.val() || {});
          if (chatObject.length) {
            chatObject.forEach((chatObj, ind) => {
              const chatContent = {
                _id: Object.keys(snapshot.val())[ind],
                text: chatObj.text,
                createdAt: chatObj.createdAt,
                user: {
                  _id: chatObj.uid,
                  name: chatObj.name,
                  avatar: chatObj.avatar,
                },
              };
              messNew.push(chatContent);
            });
          }
          setMessages(messNew.reverse());
        }
      });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={async (messages) => {
        await firebase.default
          .database()
          .ref('/chat')
          .push({
            uid: user.id,
            avatar: user.avatar,
            createdAt: String(new Date()),
            name: user.name,
            text: messages[0].text,
          });
      }}
      user={user}
    />
  );
};

export {ChatNavigator};
