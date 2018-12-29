import React, { Component } from 'react'
import { Image, View } from 'react-native'

import { Constants, ImagePicker, Permissions } from 'expo';

import { Icon, Input, Item, Picker, Text ,Button} from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ConfirmedModal from '../components/confirmedModal'
import { BarIndicator } from 'react-native-indicators'

import CategoriesAction from '../Redux/CategoriesRedux'
import AdAction from '../Redux/AdRedux'
import { connect } from "react-redux";


import { Strings, Colors,Fonts } from '../Themes'
// Styles
import styles from './Styles/AddAdScreenStyles'

class AddAdScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Strings.ar.addAd,
      headerRight: (<Icon name='menu' style={{ color: Colors.white }} onPress={() => navigation.openDrawer()} />)
    };
  };

  state={
    image : null,
  }
  _toggleModal = () => {
    this.props.handleInput("isModalVisible",!this.props.isModalVisible);
    this.props.resetForm()
    this.props.navigation.navigate('MainScreen')
  }

  componentWillMount() {
    this.props.citiesRequest()
    this.props.categoriesRequest()
    this.props.subCategoriesRequest(this.props.addContent.addCategoryId)
    this.props.priceRequest(this.props.addContent.sub_category_id)
    this.props.navigation.addListener(
      'willBlur',
      payload => {
        this.props.resetForm()
      }
    );
    
  }




  renderCategoriePicker = () => {
    if (this.props.categories) return this.props.categories.map((item) => {
      return (
        <Picker.Item key={item.id} label={item.name} value={item.id} />
      )
    })
  }

  renderSubCategoriePicker = () => {
    if (this.props.subCategories) return this.props.subCategories.map((item) => {
      return (
        <Picker.Item key={item.sub_category_id} label={item.sub_category} value={item.sub_category_id} />
      )
    })
  }

  renderCityPicker = () => {
    if (this.props.cities) return this.props.cities.map((item) => {
      return (
        <Picker.Item key={item.id} label={item.city} value={item.id} />
      )
    })
  }

  onCategorieChanged = (key) => {
    this.props.subCategoriesRequest(key)
    this.props.handleInput('addCategoryId', key)
  }

  onSubCategorieChanged = (key) => {
    this.props.handleInput('sub_category_id', key)
    console.warn("called")
    this.props.priceRequest(key)
  }

 
//17
  renderContent = () => {
    if (this.props.fetching) return <BarIndicator color={Colors.black} count={5} />
    return (
      <View style={{ flex: 1 ,paddingBottom:30}}>
         {this.props.isModalVisible && <ConfirmedModal price={this.props.price} onConfirm={this._toggleModal}/>}
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.chooseCategory}</Text>
       <Item style={styles.inputContainer} >
          <Picker
            mode="dropdown"
            placeholder={Strings.ar.chooseCategory}
            selectedValue={this.props.addContent.addCategoryId}
            onValueChange={this.onCategorieChanged}
            style={{ width: 120 }}>
            {this.renderCategoriePicker()}
          </Picker>
        </Item>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.chooseSubCategory}</Text>
        <Item style={styles.inputContainer}>
          <Picker
            mode="dropdown"
            placeholder={Strings.ar.chooseSubCategory}
            selectedValue={this.props.addContent.sub_category_id}
            onValueChange={this.onSubCategorieChanged}
            style={{ width: 120 }}>
            {this.renderSubCategoriePicker()}
          </Picker>
        </Item>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.chooseCity}</Text>
   <Item style={styles.inputContainer}>
          <Picker
            mode="dropdown"
            placeholder={Strings.ar.chooseCity}
            selectedValue={this.props.addContent.city_id}
            onValueChange={(value) => this.props.handleInput('city_id', value)}
            style={{ width: 120 }}>
            {this.renderCityPicker()}
          </Picker>
        </Item>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.address}</Text>
        <Item regular style={styles.inputContainer}>
          <Input placeholder={Strings.ar.address} textBox
            onChangeText={(value) => this.props.handleInput('address', value)}
            value={this.props.addContent.address} />
        </Item>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.title}</Text>
        <Item regular style={styles.inputContainer}>
          <Input placeholder={Strings.ar.title} textBox
            onChangeText={(value) => this.props.handleInput('title', value)}
            value={this.props.addContent.title} />
        </Item>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.price}</Text>
        <Item regular style={styles.inputContainer}>
          <Input placeholder={Strings.ar.price} textBox   keyboardType="numeric"
            onChangeText={(value) => this.props.handleInput('price', value)}
            value={this.props.addContent.price} />
        </Item>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.mobile}</Text>
        <Item regular style={styles.inputContainer}>
          <Input style={styles.inputContainer} placeholder={Strings.ar.mobile} textBox  keyboardType="numeric"
            onChangeText={(value) => this.props.handleInput('phone', value)}
            value={this.props.addContent.phone} />
        </Item>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.whatsapp}</Text>
        <Item regular style={styles.inputContainer}>
          <Input placeholder={Strings.ar.whatsapp} textBox  keyboardType="numeric"
            onChangeText={(value) => this.props.handleInput('whatsapp', value)}
            value={this.props.addContent.whatsapp} />
        </Item>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.description}</Text>
        <Item regular style={styles.inputContainer}>
          <Input placeholder={Strings.ar.description} textBox
            onChangeText={(value) => this.props.handleInput('description', value)}
            value={this.props.addContent.description} />
        </Item>



        <Button full dark transparent onPress={this._pickImage}>
          <Text style={{ ...Fonts.style.h5, color: 'black' }}>{Strings.ar.uploadImage}</Text>
          <Icon name='camera' style={{ color: Colors.black }} />
        </Button>
        {this.state.image
          && <Image
            source={{ uri: this.state.image }}
            style={{ width: 50, height: 50, alignSelf: 'center' }}
          /> 
        }

        <Text style={styles.error}>{this.props.error}</Text>


        <Button full dark onPress={this.validate}>
          <Text style={{ ...Fonts.style.h5,color:Colors.white }}>{Strings.ar.send}</Text>
        </Button>

      </View>)
  }
  
  

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container} enableOnAndroid>
        {this.renderContent()}
      </KeyboardAwareScrollView>
    )
  }


  validate = () => {

    const { addCategoryId, sub_category_id, title, address, city_id, phone, whatsapp, description, price } = this.props.addContent
    if(true) {
     this.props.addAdRequest(this.props.addContent, this.props.user_id,this.state.image)
    } else this.props.handleInput('error', Strings.ar.error.fillAll)
  }


  
  _pickImage = async () => {
   const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true,
                                                                    allowsEditing: false,
                                                                    aspect: [4, 3]});
      if (!pickerResult.cancelled) {
        let imageUri = pickerResult ? `data:image/jpeg;base64,${pickerResult.base64}` : null;
        this.setState({image:imageUri}) 

      }
    }
  };
}

const mapStateToProps = (state) => {
  const { addCategoryId, sub_category_id, title, address, city_id, phone, whatsapp, description, price } = state.ads
  const addContent = { addCategoryId, sub_category_id, title, address, city_id, phone, whatsapp, description, price }
  return {
    categories: state.categories.categories,
    subCategories: state.categories.subCategories,
    cities: state.categories.cities,
    addContent,
    price:state.categories.price,
    fetching: state.ads.fetching,
    error: state.ads.error,
    success: state.ads.success,
    user_id: state.auth.user.user_id,
    isModalVisible:state.ads.isModalVisible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    categoriesRequest: () => dispatch(CategoriesAction.categoriesRequest()),
    subCategoriesRequest: (cat_id) => dispatch(CategoriesAction.subCategoriesRequest(cat_id)),
    priceRequest : (sub_cat_id) => dispatch(CategoriesAction.priceRequest(sub_cat_id)),
    citiesRequest: () => dispatch(CategoriesAction.citiesRequest()),
    addAdRequest: (addContent, user_id,image) => dispatch(AdAction.addAdRequest(addContent, user_id,image)),
    handleInput: (prop, value) => dispatch(AdAction.handleInput(prop, value)),
    resetForm: () => dispatch(AdAction.resetForm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAdScreen)
