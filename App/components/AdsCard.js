import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Grid, Row, Col } from 'native-base';


import styles from './Styles/AdsCardStyle'

export default class AdsCard extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render() {
    return (

      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: 'Image URL' }} />
          </Left>
          <Body>
            <Grid>
              <Row>
                <Col>

                </Col>
                <Col>

                </Col>
              </Row>
              <Row>

              </Row>
            </Grid>
          </Body>
        </CardItem>

        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem>


        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem>
      </Card>
    )
  }
}
