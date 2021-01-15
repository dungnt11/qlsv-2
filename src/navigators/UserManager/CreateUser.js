import React from 'react';
import { Image, Text, View, ScrollView, Alert } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-paper';
import IconEvil from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { AuthContext } from '../../components/AppProvider';
import firebaseInstance, { firebase } from '../../firebase/Firebase';

import { Input } from '../../components/Input';
import { DateChecked } from '../../components/DateChecked';

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      description: '',
      password: '',
      rePassword: '',
      salary: '0',
      bonus: '0',
      fine: '0',
      room: '',
      dayToWork: [],
      // File temp
      filePath: {},
    }
  }

  componentDidMount() {
    const { setError } = this.context;
    const { route } = this.props;
    const isObjectProps = route.params && typeof Object.values(route.params)[0] !== 'string';

    if (isObjectProps) {
      const valueProps = Object.values(route.params)[0];

      this.setState({
        email: valueProps.email,
        fullName: valueProps.fullName,
        description: valueProps.description,
        filePath: {
          uri: valueProps.avatar,
        },
        salary: valueProps.salary,
        bonus: valueProps.bonus,
        fine: valueProps.fine,
        room: valueProps.room,
        dayToWork: (valueProps.dayToWork && valueProps.dayToWork.length) ? valueProps.dayToWork : [],
      })
    }

    setError('');
  }

  chooseFile = () => {
    const { navigation } = this.props;
    let options = { mediaType: 'camera' };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        navigation.navigate('CropImage', {
          ...response, onChangeState: (uri) => {
            this.setState({
              filePath: {
                ...response,
                uri,
              }
            })
          }
        });
      }
    });
  };

  async saveUser(type) {
    const { navigation, route } = this.props;
    const { register, setError, setLoading } = this.context;
    const {
      fullName,
      description,
      password,
      rePassword,
      filePath,
      email,
      salary,
      bonus,
      fine,
      dayToWork,
      room,
    } = this.state;
    setLoading(true);

    if (type === 'create') {
      if (!Array.isArray(route.params)) {
        // Create
        if (!fullName) {
          setError('Bạn phải điền tên của mình!');
          setLoading(false);

          return;
        } else if (!email) {
          setError('Bạn phải điền tên đăng nhập!');
          setLoading(false);

          return;
        } else if (password.length < 6) {
          setError('Mật khẩu ít nhất 6 kí tự!');
          setLoading(false);

          return;
        } else if (!password) {
          setError('Bạn phải điền mật khẩu!');
          setLoading(false);

          return;
        } else if (password !== rePassword) {
          setError('Hai mật khẩi phải giống nhau!');
          setLoading(false);

          return;
        } else if (!filePath) {
          setError('Bạn cần upload avatar!');
          setLoading(false);

          return;
        } else {
          setError('');
        }
        const { fileName, type, uri } = filePath;

        const urlAvatar = await firebaseInstance.uploadFile(
          `users/${fileName}`,
          type,
          uri,
        );
        try {
          await register(
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
          );
          setLoading(false);
          navigation.navigate('ListUser');
        } catch (error) {
          //     
          setLoading(false);
        }
      }
    } else {
      const keyUser = route.params && Object.keys(route.params)[0];
      // Edit
      const user = await firebase.default
        .database()
        .ref(`users/${keyUser}`)
        .get();

      if (user) {
        try {
          let urlAvatar = '';

          if (filePath.fileName) {
            const { fileName, type, uri } = filePath;
            urlAvatar = await firebaseInstance.uploadFile(
              `users/${fileName}`,
              type,
              uri,
            );
          }

          try {
            await firebase.default
              .database()
              .ref(`users/${keyUser}`)
              .set({
                fullName: fullName || user.val().fullName,
                email: email || user.val().email,
                description: description || user.val().description,
                avatar: urlAvatar || user.val().avatar,
                salary: salary || user.val().salary,
                bonus: bonus || user.val().bonus,
                fine: fine || user.val().fine,
                dayToWork,
                room: room || user.val().room,
              });
            setLoading(false);
            navigation.navigate('ListUser');
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          // console.log(error);
          setLoading(false);
          setError('Không thể sửa user');
        }
      }
    }
  }

  async deleteUser() {
    Alert.alert(
      "Bạn có muốn xóa người dùng này",
      "Thao tác này không thể hủy bỏ",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Đồng ý", onPress: async () => {
            const { navigation, route } = this.props;

            const { setLoadingDeleteUser } = this.context;
            setLoadingDeleteUser(true);
            await firebase.default
              .database()
              .ref(`users/${route.params && Object.keys(route.params)[0]}`)
              .remove();

            setLoadingDeleteUser(false);
            navigation.navigate('ListUser');
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    const { navigation, route } = this.props;
    const { error, setError, loading, loadingDeleteUser } = this.context;
    const {
      fullName,
      description,
      password,
      rePassword,
      filePath,
      email,
      salary,
      bonus,
      fine,
      dayToWork,
      room,
    } = this.state;
    const valueProps = route.params && Object.values(route.params)[0];

    return (
      <View style={{ marginTop: getStatusBarHeight(), marginBottom: 120 }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 15,
          }}>
          <Icon
            name="arrowleft"
            color="rgb(108, 108, 139)"
            size={20}
            style={{
              margin: 0,
              padding: 0,
            }}
            onPress={() => {
              navigation.navigate('ListUser');
              setError('');
            }}
          />
          <Text
            style={{ marginLeft: 10 }}
            onPress={() => {
              navigation.navigate('ListUser');
              setError('');
            }}>
            Back
              </Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 30,
            marginBottom: 15,
            fontSize: 20,
          }}>
          Thêm người dùng
          </Text>
        <ScrollView>
          <View style={{ marginHorizontal: 20 }}>
            <Input
              placeholder="Tên đầy đủ (*)"
              value={fullName}
              onChange={(fullName) => this.setState({ fullName })}
            />
            <Input
              placeholder="Email (*)"
              value={email}
              onChange={(email) => this.setState({ email })}
            />
            <Input
              placeholder="Mật khẩu (*)"
              value={password}
              onChange={(password) => this.setState({ password })}
              secureTextEntry
            />
            <Input
              placeholder="Nhập lại mật khẩu (*)"
              value={rePassword}
              onChange={(rePassword) => this.setState({ rePassword })}
              secureTextEntry
            />
            <Text>Giới thiệu</Text>
            <Input
              placeholder="Nick name mà bạn muốn mọi người gọi"
              value={description}
              onChange={(description) => this.setState({ description })}
            />
            <Text>Lương cơ bản</Text>
            <Input
              money
              placeholder="VNĐ"
              value={salary}
              onChange={(salary) => this.setState({ salary: +salary })}
              keyboardType='numeric'
            />
            <Text>Thưởng</Text>
            <Input
              money
              center
              placeholder="VNĐ"
              value={bonus}
              onChange={(bonus) => this.setState({ bonus: +bonus })}
              keyboardType='numeric'
              style={{
                color: '#02b2f7',
                fontSize: 20,
              }}
            />
            <Text>Phạt</Text>
            <Input
              money
              center
              style={{
                color: '#f23e11',
                fontSize: 20,
              }}
              placeholder="VNĐ"
              value={fine}
              onChange={(fine) => this.setState({ fine: +fine })}
              keyboardType='numeric'
            />
            <RNPickerSelect
              value={room}
              placeholder={{ label: "Phòng" }}
              onValueChange={(room) => this.setState({ room })}
              items={[
                { label: 'Phòng đồ họa và website', value: 'website' },
                { label: 'Phòng phần mềm ứng dụng', value: 'ungdung' },
                { label: 'Phòng kĩ thuật', value: 'kithuat' },
                { label: 'Phòng hành chính', value: 'hanhchinh' },
                { label: 'Phòng marketing', value: 'marketing' },
              ]}
            />
            <DateChecked
              dateChecked={dayToWork}
              onCheckWord={(day) => {
                if (dayToWork.includes(day)) {
                  this.setState({ dayToWork: dayToWork.filter((dayItem) => dayItem !== day) });
                } else {
                  this.setState({ dayToWork: dayToWork.concat(day) });
                }
              }}
            />
            <Text
              style={{
                fontSize: 18,
                marginTop: 20,
              }}
            >Lương tổng: {formatter.format(
              +salary * 8 * +(dayToWork || []).length + +bonus - +fine
            )}</Text>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 5,
              }}>
              Upload ảnh
            </Text>
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
              onPress={this.chooseFile.bind(this)}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <View>
                {filePath ? (
                  <Image
                    source={{ uri: filePath.uri }}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                      margin: 5,
                    }}
                  />
                ) : null}
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: 16 }}>{email}</Text>
                <Text style={{ color: '#797979' }}>{description}</Text>
              </View>
            </View>

            <Text
              style={{
                color: '#eb4034',
                marginTop: 12,
                marginBottom: 12,
                fontWeight: '600',
              }}>
              {error}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <Button
                style={{
                  flexBasis: '46%',
                }}
                mode="contained"
                onPress={this.saveUser.bind(this, valueProps ? 'edit' : 'create')}
                loading={loading}>
                {valueProps ? 'Save' : 'Thêm user'}
              </Button>
              {valueProps ? (
                <Button
                  style={{
                    marginLeft: 20,
                    flexBasis: '46%',
                    backgroundColor: 'red',
                  }}
                  mode="contained"
                  onPress={this.deleteUser.bind(this)}
                  loading={loadingDeleteUser}>
                  Xóa user
                </Button>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
};

CreateUser.contextType = AuthContext;

export { CreateUser };
