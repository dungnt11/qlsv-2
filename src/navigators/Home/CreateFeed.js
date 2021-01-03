import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEvil from 'react-native-vector-icons/EvilIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {TextInput as TextInputPaper} from 'react-native-paper';
import * as uuid from 'uuid';
import {height} from '../../utils/Dimensions';
import firebaseInstance, {firebase} from '../../firebase/Firebase';
import { AuthContext } from '../../components/AppProvider';

const CreateFeed = ({navigation}) => {
  const {user} = React.useContext(AuthContext);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [contentPost, setContentPost] = React.useState('');

  const [imagePost, setImagePost] = React.useState();
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [toggleUrl, setToggleUrl] = React.useState(false);

  const changeBackgroundPost = () => {
    let options = {mediaType: 'camera'};
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImagePost(response);
      }
    });
  };

  const addImages = async () => {
    let options = {mediaType: 'camera'};
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImages((images) => images.concat(response));
      }
    });
  };

  const removeImage = (ind) => {
    setImages(images.filter((image, indImg) => indImg !== ind));
  };

  const createPost = async () => {
    setLoading(true);
    // Upload images
    const newPost = {};
    try {
      if (imagePost) {
        const imagePostsURL = await firebaseInstance.uploadFile(
          `posts/${imagePost.fileName}`,
          imagePost.type,
          imagePost.uri,
        );
        newPost.image = {
          uri: imagePostsURL,
          width: imagePost.width,
          height: imagePost.height,
          mime: imagePost.type,
        };
      }
      if (images.length) {
        const allImages = await Promise.all(
          images.map((image) =>
            firebaseInstance.uploadFile(
              `posts/${image.fileName}`,
              image.type,
              image.uri,
            ),
          ),
        );
        newPost.images = images.map((image, ind) => ({
          id: String(uuid.v4()),
          uri: allImages[ind],
          width: image.width,
          height: image.height,
          mime: image.type,
        }));
      }
      newPost.title = title;
      newPost.description = description;
      newPost.contentPost = contentPost;
      newPost.url = url;
      newPost.user = user.email;

      await firebase.default.database().ref('/posts').push(newPost);
      setLoading(false);
      navigation.navigate('Feeds');
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        marginTop: getStatusBarHeight(),
        marginHorizontal: 10,
        justifyContent: 'space-between',
        height,
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Icon
            name="close"
            color="rgb(108, 108, 139)"
            style={{fontSize: 30}}
            onPress={() => navigation.navigate('Feeds')}
          />

          <Text style={{fontSize: 17}}>Tạo bài viết mới</Text>

          <IconEntypo
            name="dots-three-vertical"
            color="rgb(108, 108, 139)"
            style={{fontSize: 20}}
          />
        </View>

        <TextInput
          value={title}
          onChangeText={(title) => setTitle(title)}
          placeholder="Tiêu đề"
          placeholderTextColor="rgb(173, 173, 173)"
          style={{marginTop: 25}}
        />

        <TextInput
          value={description}
          onChangeText={(description) => setDescription(description)}
          placeholder="Mô tả"
          placeholderTextColor="rgb(173, 173, 173)"
          style={{marginTop: 25}}
        />

        <TextInput
          value={contentPost}
          onChangeText={(content) => setContentPost(content)}
          placeholder="Nội dung bài viết"
          placeholderTextColor="rgb(173, 173, 173)"
          multiline={true}
          numberOfLines={10}
        />
      </View>

      <View style={{marginBottom: 150}}>
        <View>
          <IconAnt
            name="plus"
            color="rgb(108, 108, 139)"
            style={{
              fontSize: 30,
              backgroundColor: '#e8e8e8',
              textAlign: 'center',
              width: 50,
              height: 50,
              lineHeight: 50,
              borderRadius: 4,
              overflow: 'hidden',
            }}
            onPress={changeBackgroundPost}
          />
          {imagePost ? (
            <Image
              source={{uri: imagePost.uri}}
              style={{
                height: 150,
                marginTop: 10,
                borderRadius: 15,
              }}
            />
          ) : null}
        </View>
        <View style={{marginTop: 30}}>
          <View>
            <View>
              <IconEvil
                name="image"
                color="rgb(108, 108, 139)"
                style={{
                  fontSize: 30,
                  backgroundColor: '#e8e8e8',
                  textAlign: 'center',
                  width: 40,
                  height: 40,
                  lineHeight: 40,
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
                onPress={addImages}
              />
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginHorizontal: -5,
                }}>
                {images.map((image, ind) => (
                  <View key={image.uri} style={{position: 'relative'}}>
                    <Image
                      source={{uri: image.uri}}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        margin: 5,
                      }}
                    />
                    <IconAwesome
                      name="close"
                      color="#fff"
                      style={{
                        fontSize: 25,
                        textAlign: 'center',
                        borderRadius: 4,
                        position: 'absolute',
                        top: 5,
                        right: 10,
                      }}
                      onPress={() => removeImage(ind)}
                    />
                  </View>
                ))}
              </View>
            </View>
            <IconEvil
              name="link"
              color="rgb(108, 108, 139)"
              style={{
                fontSize: 30,
                backgroundColor: toggleUrl ? '#ccc' : '#e8e8e8',
                textAlign: 'center',
                width: 40,
                height: 40,
                lineHeight: 40,
                borderRadius: 4,
                overflow: 'hidden',
                marginTop: 20,
              }}
              onPress={() => setToggleUrl(!toggleUrl)}
            />
            {toggleUrl ? (
              <TextInputPaper
                label="URL liên quan"
                value={url}
                onChangeText={(url) => setUrl(url)}
                style={{
                  marginTop: 15,
                  padding: 0,
                  backgroundColor: '#fff',
                  marginBottom: 15,
                }}
              />
            ) : null}
          </View>

          <Text
            style={{
              textAlign: 'center',
              width: 100,
              alignSelf: 'flex-end',
              color: '#0850c4',
              fontSize: 15,
              paddingVertical: 5,
              backgroundColor: '#ccc',
              borderRadius: 5,
              overflow: 'hidden',
            }}
            onPress={createPost}>
            Đăng bài
          </Text>
        </View>
      </View>
      <Spinner visible={loading} textContent={'saving...'} color="#fff" />
    </View>
  );
};

export {CreateFeed};
