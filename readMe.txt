//here we are talking about firebase and its configuration on android:
_____________________________________________________________________________________________________________
1- open firebase console to create new project (type project name )
2- choose OS (android , ios or windows) , then cinfigure firebase SDK by typing project pakcage name (ex: Com.NCC)
3- download google-Services.json  and put it inside android=>app folder
4- install react-native-firebase as npm in our project
5- link firebase package using react-native link or manully
6- configure RNFirebase core as follwos:

-in android/build.gradle folder
buildscript {
    // ...
    dependencies {
      // add this 
      classpath 'com.google.gms:google-services:4.0.1'
    }
  }

  -and in very bottom add this 
  apply plugin: 'com.google.gms.google-services'

  -update Android build tools to version 3.2.0
  -check that you have google() specified in the buildScript repositories section

 - then in android/app/build.gradle add firebase dependencies
  dependencies {
    // This should be here already
    implementation project(':react-native-firebase')
  
    // Firebase dependencies
    implementation "com.google.android.gms:play-services-base:16.0.1"
    implementation "com.google.firebase:firebase-core:16.0.4"
  
    ...

    -android/gradle/wrapper/gradle-wrapper.properties update the gradle URL to gradle-4.6-all.zip

7- each extra feature (package or library for example fireStore) u just need to do two mandatory things:
  1-Add the Firebase Firestore dependency to android/app/build.gradle:
  dependencies {
    // ...
    implementation "com.google.firebase:firebase-firestore:17.1.2"
  }

  2-Add the RNFirebaseFirestorePackage to your android/app/src/main/java/com/[app name]/MainApplication.java:
  -import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // <-- Add this line
  -new RNFirebaseFirestorePackage() // <-- Add this line

  some feature require some extra steps like here
  Adding Firestore to your Android app requires multiDexEnabled to be set to true in android/app/build.gradle:
  -defaultConfig {
    //..
    multiDexEnabled true  // needed for firestore:
  }
  -dependencies {
    implementation 'com.android.support:multidex:1.0.3'
  }
  -------------------------------------------------------------------------------------------------------------------

//here we are talking about firebase implementation:
_____________________________________________________________________________________________________________

- check comments in code in App.js
- app structure : using Redux as described here:
 -- https://blog.benestudio.co/kickstart-your-react-native-app-with-firebase-redux-tutorial-3-40202adc46dc
 -- https://github.com/benestudio/fakestagram/tree/redux

 _____________________________________________________________________________________________________________

 firebase Storage is not stable and has many errors and i couldn't use it at all