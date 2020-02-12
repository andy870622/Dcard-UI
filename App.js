import * as React from 'react';
import { Image, View, StyleSheet,ScrollView, Button} from 'react-native';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component 
{
  state = 
  {
    image: null,
    hasPermission:null,
    uri:null,
  };


  render() 
  {
    let { image } = this.state;
    console.log({image});
    console.log(this.state.hasPermission);
    this._getPermission();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="選擇圖片" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button title='下載自選圖片' onPress={this._savePhoto} />
        <Button title='下載網路圖片' onPress={this._saveOnlinePhoto}/>
        <Button title='下載網路影片' onPress={this._onlineVideo} />
        {/* <Button title="允許進行存取" onPress={this._getPermission} /> */}
        <Video
          source={{ uri: this.state.uri }}
          rate={1.0}
          volume={1000.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          useNativeControls={true}
          isLooping
          style={{ width: 300, height: 300 }}
        />
      </View>
      );
  }

  _onlineVideo = async() => 
  {
    try 
    {
      const uri='http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
      FileSystem.downloadAsync(uri,FileSystem.documentDirectory + 'small.mp4').then(({ uri }) => 
        {
          console.log('Finished downloading to ', uri);
          this.setState({uri: uri});
          this._saveVideo();
        }).catch(error => 
        {
          console.error(error);
        });         
    }
    catch (error) 
    {
      console.error(error);
    }
  }

  _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _savePhoto = async()=>{
    const myalbum = await MediaLibrary.getAlbumAsync('Dcard');
    console.log(this.state.image);
    const asset = await MediaLibrary.createAssetAsync(this.state.image);
    MediaLibrary.addAssetsToAlbumAsync(asset, myalbum);
  };

  _saveVideo = async()=>{
    const myalbum = await MediaLibrary.getAlbumAsync('Dcard');
    console.log(this.state.uri);
    const asset = await MediaLibrary.createAssetAsync(this.state.uri);
    MediaLibrary.addAssetsToAlbumAsync(asset, myalbum);
  };

  _checkAlbum = async()=>
  {
    if(await MediaLibrary.getAlbumAsync('Dcard') == null)
    { 
      MediaLibrary.createAlbumAsync('Dcard').then(()=>
      {
        console.log('success');
      }).catch(e =>
      {
        console.log (e)
      });
    }
  }

  
  _getPermission = async ()=>{
    const  {status}  = await MediaLibrary.requestPermissionsAsync();
    console.log({status});
    // this.setState({hasPermission:status=='granted'})
    if(status !== 'granted')
      alert("加一下拉拜託:(((((");
    else
      this._checkAlbum();
  };

  _saveOnlinePhoto = async ()=>{
    try 
    {
      const uri='https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png';
      FileSystem.downloadAsync(uri,FileSystem.documentDirectory + 'sample.jpg').then(({ uri }) => 
        {
          console.log('Finished downloading to ', uri);
          this.setState({image: uri});
          this._savePhoto();
        }).catch(error => 
        {
          console.error(error);
        });         
    }
    catch (error) 
    {
      console.error(error);
    }
  };
}