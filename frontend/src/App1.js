import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Text,
  StyleProvider
} from "native-base";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import getTheme from "./native-base-theme/components";
import custom from "./native-base-theme/variables/custom";

// Generate required css
import iconFont from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: MaterialCommunityIcons;
}`;

// Create stylesheet
const style = document.createElement("style");
style.type = "text/css";
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

export default class AnatomyExample extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(custom)}>
        <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name="menu" size={36} />
              </Button>
            </Left>
            <Body>
              <Title>Header</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Text>This is Content Section</Text>
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>Footer</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}
