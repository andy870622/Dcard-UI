import * as FileSystem from 'expo-file-system';
import { startAsync } from 'expo/build/AR';
import * as React from 'react';
import { render } from 'react-dom';
import { View } from 'react-native';

export default class file extends React.Component {
    render(){
      // return();
     
    };
_start = async()=>{
const downloadResumable = FileSystem.createDownloadResumable(
    'http://techslides.com/demos/sample-videos/small.mp4',
    FileSystem.documentDirectory + 'small.mp4',
    {},
    callback
  );

  const callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    this.setState({
      downloadProgress: progress,
    });
  };
    try {
        console.log('here');
        const { uri } = await downloadResumable.downloadAsync();
        console.log('Finished downloading to ', uri);
      } catch (e) {
        console.error(e);
      }
  };

}

      // MediaLibrary.createAssetAsync(this.state.image);

      // let id = MediaLibrary.createAlbumAsync('expo',this.state.image).then(()=>{
      //     console.log('success');
      // }).catch(e =>{
      //   console.log (e)
      // });
      // this.album.push(id);
      // console.log(this.album);
      // console.log(asset);
      // const asset = await MediaLibrary.createAssetAsync(uri);
      // MediaLibrary.createAlbumAsync('Expo', asset).then(() => {
      //   console.log('Album created!');
      // })
      // .catch(error => {
      //   console.log('err', error);
      // });
    // };




    
//   state = {
//     photos: []
//   }

//   _handleButtonPress = async() => {
//    MediaLibrary.requestPermissionsAsync();
//    const { uri } = await Camera.takePictureAsync();
//    const asset = await MediaLibrary.createAssetAsync(uri);
//    console.log(asset);
//    };

// render() {
//  return (
//    <View style={{padding: 40}}>
//      <Button title="Load Images" onPress={this._handleButtonPress} />
//      <ScrollView>
//        {this.state.photos.map((p, i) => {
//        return (
//          <Image
//            key={i}
//            style={{
//              width: 300,
//              height: 100,
//            }}
//            source={{ uri: p.node.image.uri }}
//          />
//        );
//      })}
//      </ScrollView>
//    </View>
//  );
// }
// }