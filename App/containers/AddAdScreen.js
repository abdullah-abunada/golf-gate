import React, { Component } from 'react'
import { Image, View } from 'react-native'

import { Constants, ImagePicker, Permissions } from 'expo';

import { Icon, Input, Item, Picker, Text } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements'
import { BarIndicator } from 'react-native-indicators'

import CategoriesAction from '../Redux/CategoriesRedux'
import AdAction from '../Redux/AdRedux'
import { connect } from "react-redux";


import { Strings, Colors } from '../Themes'
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
    image : null
  }

  componentWillMount() {
    this.props.citiesRequest()
    if (!this.props.categories) this.props.categoriesRequest()
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

  renderContent = () => {
    if (this.props.fetching) return <BarIndicator color={Colors.black} count={5} />
    return (
      <View style={{ flex: 1 }}>
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

        <Item style={styles.inputContainer}>
          <Picker
            mode="dropdown"
            placeholder={Strings.ar.chooseSubCategory}
            selectedValue={this.props.addContent.sub_category_id}
            onValueChange={(value) => this.props.handleInput('sub_category_id', value)}
            style={{ width: 120 }}>
            {this.renderSubCategoriePicker()}
          </Picker>
        </Item>

        <Item style={styles.inputContainer}>
          <Picker
            mode="dropdown"
            placeholder={Strings.ar.chooseCity}
            selectedValue={this.props.addContent.city_id}
            onValueChange={(value) => this.props.handleInput('city_id', value)}
            uploadImage
            style={{ width: 120 }}>
            {this.renderCityPicker()}
          </Picker>
        </Item>

        <Item regular style={styles.inputContainer}>
          <Input placeholder={Strings.ar.address} textBox
            onChangeText={(value) => this.props.handleInput('address', value)}
            value={this.props.addContent.address} />
        </Item>

        <Item regular style={styles.inputContainer}>
          <Input placeholder={Strings.ar.title} textBox
            onChangeText={(value) => this.props.handleInput('title', value)}
            value={this.props.addContent.title} />
        </Item>

        <Item regular style={styles.inputContainer}>
          <Input placeholder={Strings.ar.price} textBox
            onChangeText={(value) => this.props.handleInput('price', value)}
            value={this.props.addContent.price} />
        </Item>

        <Item regular style={styles.inputContainer}>
          <Input style={styles.inputContainer} placeholder={Strings.ar.mobile} textBox
            onChangeText={(value) => this.props.handleInput('phone', value)}
            value={this.props.addContent.mobile} />
        </Item>

        <Item regular style={styles.inputContainer}>
          <Input placeholder={Strings.ar.whatsapp} textBox
            onChangeText={(value) => this.props.handleInput('whatsapp', value)}
            value={this.props.addContent.whatsapp} />
        </Item>

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

        <Text style={styles.success}>{this.props.success}</Text>
        <Button full dark onPress={this.validate}>
          <Text style={{ ...Fonts.style.h5 }}>{Strings.ar.send}</Text>
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
    if (addCategoryId && sub_category_id && title != '' && city_id && phone!= ''&&whatsapp!=''&&description!=''&& price!=''&& address != '') {
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
        let imageUri = pickerResult ? `data:image/png;base64,${pickerResult.base64}` : null;
        this.setState({image:imageUri}) 
      }
    }
  };
}

const mapStateToProps = (state) => {
  const { addCategoryId, sub_category_id, title, address, city_id, phone, whatsapp, description, price } = state.ads
  const addContent = { addCategoryId, sub_category_id, title, address, city_id, phone, whatsapp, description, image, price }
  return {
    categories: state.categories.categories,
    subCategories: state.categories.subCategories,
    cities: state.categories.cities,
    addContent,
    fetching: state.categories.fetching,
    error: state.ads.error,
    success: state.ads.success,
    user_id: state.auth.user.user_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    categoriesRequest: () => dispatch(CategoriesAction.categoriesRequest()),
    subCategoriesRequest: (cat_id) => dispatch(CategoriesAction.subCategoriesRequest(cat_id)),
    citiesRequest: () => dispatch(CategoriesAction.citiesRequest()),
    addAdRequest: (addContent, user_id) => dispatch(AdAction.addAdRequest(addContent, user_id)),
    handleInput: (prop, value) => dispatch(AdAction.handleInput(prop, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAdScreen)
