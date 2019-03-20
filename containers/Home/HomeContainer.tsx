import React, { Component } from 'react';
import {
    Text,
    CameraRoll,
    PermissionsAndroid,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    View,
    Platform,
    AppState
} from 'react-native';
import { connect } from 'react-redux';

import { Container, Header, Footer, Left, Title, Body, Right, Button, Icon, FooterTab, Picker } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
// import { IAppState, ILoader } from '../../appstate';
import { Actions } from 'react-native-router-flux';


interface IAppContainerProp {

}

interface IAppContainerState {

}

interface IActions {
    // login: (username: string, password: string) => Promise<any>;
}

interface IConnectedLoginProps extends IAppContainerProp, IActions { }


class AppContainer extends React.Component<IConnectedLoginProps, IAppContainerState> {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
            </Container>
        );

    }
}

const mapDispatchToProps = (dispatch: any) => ({
    // login: (username: string, password: string) => dispatch(LoginAction.login(username, password)),

});

const mapStateToProps = (state: any): IAppContainerProp => {
    return {

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
