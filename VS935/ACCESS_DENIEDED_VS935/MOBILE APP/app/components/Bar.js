// import React, {useState} from 'react';
// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

import { Component } from "react";
import StarRatings from 'react-star-ratings';

// const App = () => {
//     const [defaultRating, setdefaultRating] = useState(2)
//     const [maxRating, setmaxRating] = useState([1,2,3,4,5])

//     const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true'
//     const starImgCorner = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true'

//     const CustomerRatingBar = () => {
//         return (
//             <View style={styles.customRatingBarStyle}>
//                 {
//                     maxRating.map((item, key) => {
//                         return (
//                             <TouchableOpacity
//                                 activeOpacity={0.7}
//                                 key={item}
//                                 onPress={() => setdefaultRating(item)}
//                             >

//                                 <Image
//                                     style={styles.starImgStyle}
//                                     source={
//                                         item <=defaultRating
//                                             ? {uri: starImgFilled}
//                                             : {uri: starImgCorner}
//                                     }
//                                 />

//                             </TouchableOpacity>    
//                         )
//                     })
//                 }
//             </View>
//         )
//     }

//     return (
//         <SafeAreaView style={StyleSheet.container}>
//             <Text style={StyleSheet.textStyle}>Please Rate Us</Text>
//             <CustomerRatingBar/>
//         </SafeAreaView>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         justifyContent: 'center'
//     },
//     textStyle: {
//         textAlign: 'center',
//         fontSize: 23
//     },
//     customRatingBarStyle: {
//         justifyContent: 'center',
//         flexDirection: 'row',
//         marginTop: 30
//     },
//     starImgStyle: {
//         width: 40,
//         heigh: 40,
//         resizeMode: 'cover'
//     }
// });
// export default CustomerRatingBar;

//import StarRatings from './react-star-ratings';
 
// class Foo extends Component {
//     changeRating( newRating, name ) {
//       this.setState({
//         rating: newRating
//       });
//     }
 
//     render() {
//       // rating = 2;
//       return (
//         <StarRatings
//           rating={this.state.rating}
//           starRatedColor="blue"
//           changeRating={this.changeRating}
//           numberOfStars={6}
//           name='rating'
//         />
//       );
//     }
// }
 
 
class Bar extends Component {
  render() {
    // aggregateRating = 2.35;
    return (
      <StarRatings
        rating={2.903}
        starDimension="35px"
        starSpacing="2px"
      />
    );
  }
}
export default Bar;

