import React from 'react';
import { Button, Icon, Header, Left, Body, Title } from 'native-base';

const HeaderContainer = (props) => {
    const { uri } = props;
    return (
        <Header noLeft>
            <Left>
                <Button transparent>
                    <Icon name="arrow-back" />
                </Button>
            </Left>
            <Body>
                <Title>Not Instagram</Title>
            </Body>
        </Header>
    );
};


export default HeaderContainer;
