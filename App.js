
// import React, { PureComponent } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   ActivityIndicator,
//   FlatList,
//   TouchableOpacity
// } from "react-native";
// import firebase from "react-native-firebase";
// import test from "./test.jpg";

// export default class App extends PureComponent {
//   constructor() {
//     super();
//     //reference for collection('todos)
//     this.ref = firebase.firestore().collection("todos");
//     this.unsubscribe = null;
//     //reference to database
//     this.database=firebase.database();
//     this.state = {
//       textInput: "",
//       loading: true,
//       todos: []
//     };
//   }

//   addTodo() {
//     //create collection ('todos') and document with autoID {title:'',complete:1}
//     //return from any transaction is a promise
//     this.ref
//       .add({
//         title: this.state.textInput,
//         complete: false
//       })
//       .then(response => {
//         console.log("response after add todo: " + response);
//       })
//       .catch(error => {
//         console.log("error in adding todo " + error);
//       });
//     this.setState({
//       textInput: ""
//     });
//   }

//   onCollectionUpdate = querySnapshot => {
//     const todos = [];
//     querySnapshot.forEach(doc => {
//       // console.log("doc" + doc.data());
//       const { title, complete } = doc.data();
//       todos.push({
//         key: doc.id,
//         // doc, // DocumentSnapshot
//         title,
//         complete
//       });
//     });

//     this.setState({
//       todos,
//       loading: false
//     });
//   };

//   getTodo = querySnapshot => {
//     querySnapshot.forEach(doc => {
//       console.log("doc" + doc.data());
//     });
//   };

//   getTodos() {
//     //get from collection('todos') and push response data into todos array to render it in flatList later on
//     //get() get once and does not listen to any changes happens in collection(insert , delete or update)
//     //get uses forEach() method to iterate over all documents in that collection
//     //get or onSnapshot does not fire from the first time
//     this.ref
//       .get()
//       .then(response => {
//         const todos = [];
//         response.forEach(doc => {
//           // console.log("doc" + doc.data());
//           const { title, complete } = doc.data();
//           todos.push({
//             key: doc.id,
//             // doc, // DocumentSnapshot
//             title,
//             complete
//           });
//         });

//         this.setState({
//           todos,
//           loading: false
//         });
//       })
//       .catch(error => {
//         console.log("error in getting todo " + error);
//       });
//   }

//   setTodos() {
//     //set() used to create a document but with specific Id
//     //If the document does not exist, it will be created. If the document does exist, its contents will be overwritten
//     //unless you specify that the data should be merged into the existing document, as follows:{ merge: true }
//     this.ref
//       .doc("specific_Id")
//       .set({
//         title: this.state.textInput,
//         complete: true
//       })
//       .then(function(doc) {
//         if (doc.exists) {
//           console.log("Document data:", doc.data());
//         } else {
//           // doc.data() will be undefined in this case
//           console.log("No such document!");
//         }
//       })
//       .catch(function(error) {
//         console.error("Error writing document: ", error);
//       });
//   }

//   authAsAnonymus() {
//     // signInAnonymously() enable user to sign in firebase with no authintication needed
//     // we have to enable it (true) in firebase console
//     // there's many ways to authintication such as (email/password,phone/facebook,twitter,..etc)
//     firebase
//       .auth()
//       .signInAnonymously()
//       .then(response => {
//         console.log("signIn user: " + JSON.stringify(response));
//       });
//   }

//   storeImages() {
//  //reference to the image 
//     let ref=firebase.storage().ref('said.jpg');

// //get metadata of the image like it's name , size and type
//     //  ref.getMetadata()
//     // .then(metadata=>{
//     //   console.log(metadata.name)
//     //   console.log(metadata.size)
//     //   console.log(metadata.contentType)
//     // })
//     // .catch(err=>{
//     //   console.log(err)
//     // })

//     // get url to the image if you like to download it 
//     // ref.getDownloadURL().then(url=>{
//     //   console.log(url)
     
//     // })

//     //download image 
//     // ref.downloadFile(
//     //   `${firebase.storage.Native.DOCUMENT_DIRECTORY_PATH}/test.jpg`
//     // )
//     // .then(response=>{
//     //   console.log(response)
     
//     // })
   
//     // .catch(err=>{
//     //   console.log(err)
//     // })

    
//   }


//   databaseHandler(){
//     //point to database default ref https://prototype-eb011.firebaseio.com//
//     // this.database.ref();

//     //get server time Wed Dec 12 2018 13:58:41 GMT+0200 (Eastern European Standard Time)
//     // this.database.getServerTime();

// //set() used to create database and data
//     // this.database.ref(`users`)
//     // .set({ username:'said',phone:'01272462068'})
//     // .then(res=>{
//     //   console.log(res)
//     // })
//     // .catch(err=>{
//     //   console.log(err)
//     // })

//    const rer= this.database.ref(`users`).push({username:'dos',phone:'00000'}) ;
//    console.log('rer'+rer)
//     //  .then(res=>{
//     //     console.log(res)
//     //   })
//     //   .catch(err=>{
//     //     console.log(err)
//     //   })
//   }

//   componentDidMount() {

//     this.databaseHandler();
//     // this.storeImages();

//     //onAuthStateChanged() just like onSnapshot() it subscribe or listen to any chnages in authinticated user
//     // needed to be unsubscribed when app unmount due to memory leak
//     this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
//       this.setState({ user });
//     });

//     // this.authAsAnonymus();
//     // this.getTodos();
//     //onSnapshot () like get() , it gets data from collections but it listens to any changes happens unlike get()
//     //we must unsbscibe when unmount due to memory leak
//     //onSnapshot() uses forEach() methos to iterate over all documents exist ib that collection
//     // here's an example if we want to use condition
//     this.unsubscribe = this.ref
//       .where("complete", "==", true)
//       .onSnapshot(this.onCollectionUpdate);
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   updateTextInput = text => {
//     this.setState({ textInput: text });
//   };

//   toggleComplete = item => {
//     // update() method enables you to set new variable in document or update in existing data just like here
//     // update() needs to specify document in which you make that update
//     this.ref.doc(item.key).update({
//       complete: !item.complete
//     });
//   };

//   renderItem = ({ item }) => {
//     return (
//       <TouchableOpacity onPress={() => this.toggleComplete(item)}>
//         <View style={styles.cell}>
//           <Text>{item.title}</Text>
//           {item.complete ? (
//             <Text style={styles.statusText}>COMPLETE</Text>
//           ) : (
//             <Text style={[styles.statusText, { color: "red" }]}>
//               NOT COMPLETE
//             </Text>
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   renderTodos() {
//     if (this.state.loading) {
//       return <ActivityIndicator size="large" />;
//     } else {
//       return <FlatList data={this.state.todos} renderItem={this.renderItem} />;
//     }
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         {this.renderTodos()}
//         <TextInput
//           placeholder={"Add TODO"}
//           value={this.state.textInput}
//           onChangeText={text => this.updateTextInput(text)}
//         />
//         <Button
//           title={"Add TODO"}
//           disabled={!this.state.textInput.length}
//           onPress={() => this.addTodo()}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor:'green'
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10
//   },
//   instructions: {
//     textAlign: "center",
//     color: "#333333",
//     marginBottom: 5
//   },
//   cell: {
//     flex: 1,
//     height: 50,
//     flexDirection: "row",
//     alignItems: "center",
//     margin: 10
//   },
//   statusText: {
//     position: "absolute",
//     right: 10,
//     color: "green"
//   }
// });

//this another example ('fake instgram')
// import React, { PureComponent } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
//   FlatList,
//   Image,
//   Dimensions,
//   Button,
// } from 'react-native';
// import firebase from 'react-native-firebase';

// const { width, height } = Dimensions.get('window');

// const Post = ({post}) => {
//   return (
//     <View style={styles.imageContainer}>
//       <Image style={styles.image} resizeMode="cover" source={{ uri: post.uri }} />
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{post.title}</Text>
//         <View style={styles.likesContainer}>
//           <Text style={styles.likes}>&hearts; {post.likes}</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default class App extends PureComponent {
//   constructor() {
//     super();
//     this.ref = firebase.firestore().collection('posts');
//     this.unsubscribe = null;
//     this.state = {
//       posts: [],
//       loading: true,
//     };
//   }

//   componentDidMount() {
//     this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   onCollectionUpdate = (querySnapshot) => {
//     const posts = [];
//     querySnapshot.forEach((doc) => {
//       const { uri, likes, title } = doc.data();
//       posts.push({
//         key: doc.id, // Document ID
//         doc, // DocumentSnapshot
//         title,
//         uri,
//         likes,
//       });
//     });
//     this.setState({
//       posts,
//       loading: false,
//    });
//   }

//   addRandomPost = () => {
//     this.ref.add({
//       title: 'Added post by random button',
//       likes: Math.floor((Math.random() * 10) + 1),
//       uri: `https://picsum.photos/200/300?image=${Math.floor((Math.random() * 100) + 1)}`,
//     });
//   }

//   render() {
//     if (this.state.loading) {
//       return <ActivityIndicator size="large" />;
//     }

//     return (
//       <View style={styles.container}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.headerText}>Fakestagram</Text>
//         </View>
//         <FlatList
//           data={this.state.posts}
//           renderItem={({ item }) => <Post post={item}/>}
//         />
//         <Button title="Add random post" onPress={() => this.addRandomPost()} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//   },
//   imageContainer: {
//     width,
//     height: 315,
//     padding: 25,
//     backgroundColor: '#fefefe',
//     alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   image: {
//     flex: 1,
//     width: 300,
//     // height: 300,
//     marginBottom: 5,
//   },
//   textContainer: {
//     flexDirection: 'row',
//     alignContent: 'center',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingLeft: 15,
//   },
//   title: {
//     flex: 4,
//   },
//   likesContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   headerContainer: {
//     width,
//     height: Platform.OS === 'ios' ? 70 : 50,
//     backgroundColor: '#fefefe',
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
// });
