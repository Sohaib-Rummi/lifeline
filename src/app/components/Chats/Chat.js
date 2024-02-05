import React, { useState, useEffect, useCallback, useContext } from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../../constants/Style'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { colors } from '../../constants/Colors'
import { messages_collection } from '../../database/Collections'
import { AppContext } from '../../api/AppContentApi';
import ImagePicker from 'react-native-image-crop-picker';
import Iconic from '../ui/Icons/Icons';
import { useNavigation } from '@react-navigation/native';
import Alert from '../ui/Modals/Alert';
import LocationMessage from './LocationMessage';
import axios from 'axios';
import AlertMessage from './Alert.js'

const Chat = ({ sender, receiver }) => {
  const navigation = useNavigation();
  const {
    sendMessage,
    uploadMessageImage,
    userCurrentLocation,
    shareLocation,
    setShareLocation
  } = useContext(AppContext)
  const [messages, setMessages] = useState([])
  const [show, setshow] = useState(false);
  const [showToxicAlert, setShowToxicAlert] = useState(false);

  const fetchMessages = async () => {
    try {
      const senderReceiverSnapshot = await messages_collection
        .where('sender_id', '==', sender.id)
        .where('receiver_id', '==', receiver.id)
        .orderBy('createdAt', 'desc')
        .get();

      const receiverSenderSnapshot = await messages_collection
        .where('sender_id', '==', receiver.id)
        .where('receiver_id', '==', sender.id)
        .orderBy('createdAt', 'desc')
        .get();

      const senderReceiverMessages = senderReceiverSnapshot.docs.map((doc) => {
        const message = doc.data();
        return {
          _id: doc.id,
          text: message.text ? message.text : null,
          image: message.image ? message.image : null,
          location: message.location ? message.location : null,
          createdAt: message.createdAt.toDate(),
          user: {
            _id: message.user._id,
            avatar: message.user.avatar,
          },
        };
      });

      const receiverSenderMessages = receiverSenderSnapshot.docs.map((doc) => {
        const message = doc.data();
        return {
          _id: doc.id,
          text: message.text,
          createdAt: message.createdAt.toDate(),
          user: {
            _id: message.user._id,
            avatar: message.user.avatar,
          },
        };
      });

      const allMessages = [...senderReceiverMessages, ...receiverSenderMessages];
      const sortedMessages = allMessages.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };


  const checkMessageContent = async (message) => {
    try {
      const response = await axios.get(`http://192.168.10.6:3000/predict`, {
        params: { text: message },
      });
      if (response) {
        const prediction = response.data.prediction;
        const parsedPrediction = parseInt(prediction, 10);
        if (parsedPrediction === 1) {
          return true;
        }
        else {
          return false;
        }
      }
    } catch (error) {
      console.log("Prediction error at Chat.js", error)
    }

  };



  const onSend = useCallback(async (messages = []) => {
    let update_new_message = {};
    const new_message = messages.length > 0 && messages[0];
    if (new_message.text != null) {
      try {
        const response = await checkMessageContent(new_message.text);
        if (!response) {
          update_new_message = {
            ...new_message,
            sender_id: sender.id,
            receiver_id: receiver.id,

          }
          sendMessage(update_new_message);
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
          )
        }
        else{
          setShowToxicAlert(true);
        }
      } catch (error) {
        console.log(error)
      }

    }
    else{
      update_new_message = {
        ...new_message,
        sender_id: sender.id,
        receiver_id: receiver.id,

      }
      sendMessage(update_new_message);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
    }

  }, [])

  // const onSend = useCallback(async (messages = []) => {
  //   let update_new_message = {};
  //   const new_message = messages.length > 0 && messages[0];
  //     update_new_message = {
  //       ...new_message,
  //       sender_id: sender.id,
  //       receiver_id: receiver.id,

  //     }
  //     sendMessage(update_new_message);
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, messages),
  //     )
  // }, [])

  const onGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then(async (image) => {
        try {
          const image_url = await uploadMessageImage(image.path);
          if (image_url) {
            const image_message = [{
              _id: Math.round(Math.random() * 1000000).toString(),
              text: null,
              createdAt: new Date(),
              user: {
                _id: sender.id,
                avatar: sender.image,
              },
              image: image_url,
            }];
            onSend(image_message);
          }
          else {
            console.log("Sorry, something went wrong to send image");
          }
        } catch (error) {
          console.log(error);
        }

      })
      .catch(error => {
        console.log(error);
      })
  };


  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

  }, [])


  const onPressLocation = () => {
    setshow(true);
  }

  const sendLocation = (location) => {
    const location_message = [{
      _id: Math.round(Math.random() * 1000000).toString(),
      text: null,
      createdAt: new Date(),
      user: {
        _id: sender.id,
        avatar: sender.image,
      },
      image: null,
      location: location
    }];
    onSend(location_message);
  }

  const onCurrentPress = () => {
    // setShareLocation(userCurrentLocation);
    sendLocation(userCurrentLocation);
    setshow(false);
  }

  const onNewPress = () => {
    setshow(false);
    navigation.navigate('Map', { location: userCurrentLocation });
  }

  useEffect(() => {
    if (shareLocation != null) {
      sendLocation(shareLocation);
    }
  }, [shareLocation]);

  const onOkPress = () => {
    setShowToxicAlert(false);
  }




  const renderBubble = (props) => {
    const { currentMessage } = props;
    return (
      !currentMessage.location ? <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: colors.white,
          }
        }}
      />
        :
        <LocationMessage location={currentMessage.location} />
    );

  }





  return (
    <View style={globalStyles.wrapper}>
      <AlertMessage show={showToxicAlert} onPress={onOkPress} />
      <Alert show={show} currentPress={onCurrentPress} newPress={onNewPress} />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: sender.id,
          avatar: sender.image,
        }}
        textInputProps={{
          autoFocus: true,
          multiline: true,
        }}
        textInputStyle={{
          color: colors.black,
          height: '100%',
        }}
        renderBubble={renderBubble}
        renderActions={() => {
          return (
            <View
              style={{ height: '100%', justifyContent: 'center', alignItems: 'center', marginLeft: 10, flexDirection: 'row' }}
            >
              <Iconic name={"image"} size={24} color={colors.red} onPress={() => { onGallery(); }} />
              <Iconic name={"location"} size={24} color={colors.red} onPress={() => { onPressLocation(); }} style={{ marginLeft: 10, }} />
            </View>
          );
        }}
        renderSend={(props) => {
          return (<Send {...props} >
            <View style={{ justifyContent: 'center', height: '100%', marginRight: 20 }}>
              <Text style={{ color: colors.red, fontWeight: 'bold', fontSize: 16, }}>Send</Text>
            </View>
          </Send>
          );
        }}
        isTyping={true}

      />
    </View>
  )
}

export default Chat;

