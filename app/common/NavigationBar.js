/**
 * Created by DB on 16/7/16.
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    StatusBar,
    PixelRatio
} from 'react-native';

let width = Dimensions.get('window').width;
const pixelRation = PixelRatio.get();
import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigationBar extends Component{

    static propTypes = {
        title: PropTypes.string.isRequired,
        height: PropTypes.number,
        titleColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        leftButtonTitle: PropTypes.string,
        leftButtonTitleColor: PropTypes.string,
        onLeftButtonPress: PropTypes.func,
        rightButtonTitle: PropTypes.string,
        rightButtonTitleColor: PropTypes.string,
        onRightButtonPress: PropTypes.func,
        showLeftDefault: PropTypes.bool
    };

    static defaultProps = {
        height: 44,
        titleColor: '#1E1E1E',
        backgroundColor: '#FFF',
        leftButtonTitle: null,
        leftButtonTitleColor: '#1E1E1E',
        rightButtonTitle: null,
        rightButtonTitleColor: '#1E1E1E',
        showLeftDefault: true
    };

    componentWillMount(){
        this.state = this._getStateFromProps(this.props);
    }

    componentWillReceiveProps(newProps){
        let newState = this._getStateFromProps(newProps);
        this.setState(newState);
    }

    shouldComponentUpdate(nextProps, nextState, context) {
        return JSON.stringify([nextState, context]) !== JSON.stringify([this.state, context]);
    }

    _getStateFromProps(props){
        let title = props.title;
        let height = props.height;
        let titleColor = props.titleColor;
        let backgroundColor = props.backgroundColor;
        let leftButtonTitle = props.leftButtonTitle;
        let leftButtonTitleColor = props.leftButtonTitleColor;
        let onLeftButtonPress = props.onLeftButtonPress;
        let rightButtonTitle = props.rightButtonTitle;
        let rightButtonTitleColor = props.rightButtonTitleColor;
        let onRightButtonPress = props.onRightButtonPress;
        let leftButtonIcon = props.leftButtonIcon;
        let rightButtonIcon = props.rightButtonIcon;
        let showLeftDefault = props.showLeftDefault;

        return {
            title,
            height,
            titleColor,
            backgroundColor,
            leftButtonTitle,
            leftButtonTitleColor,
            onLeftButtonPress,
            rightButtonTitle,
            rightButtonTitleColor,
            onRightButtonPress,
            leftButtonIcon,
            rightButtonIcon,
            showLeftDefault
        };
    }

    _renderLeftIcon() {
        if (this.state.showLeftDefault) {
            return (
                <Icon style={{backgroundColor: 'transparent', marginTop: 3}}
                      name="ios-arrow-back-outline" size={28} color='#1E1E1E'/>
            );
        }
        if(this.state.leftButtonIcon){
            return (
                <Image style={styles.leftButtonIcon} resizeMode={'contain'} source={this.state.leftButtonIcon} />
            );
        }
        return null;
    }

    _renderRightIcon() {
        if(this.state.rightButtonIcon){
            return (
                <Image style={styles.rightButtonIcon} resizeMode={'contain'} source={this.state.rightButtonIcon} />
            );
        }
        return null;
    }

    _onLeftButtonPressHandle(event) {
        let onPress = this.state.onLeftButtonPress;
        typeof onPress === 'function' && onPress(event);
    }

    _onRightButtonPressHandle(event) {
        let onPress = this.state.onRightButtonPress;
        typeof onPress === 'function' && onPress(event);
    }

    render() {
        let height = Platform.OS === 'ios' ? this.state.height + 20 : this.state.height;
        return (
            <View style={[styles.container,{
                height: height,
                backgroundColor: this.state.backgroundColor,
            },this.props.style]}>


                <TouchableOpacity onPress={this._onLeftButtonPressHandle.bind(this)}>
                    <View style={styles.leftButton}>
                        {this._renderLeftIcon()}
                        <Text style={[styles.leftButtonTitle, {color: this.state.leftButtonTitleColor}]}>
                            {this.state.leftButtonTitle}
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.title}>
                    <Text style={[styles.titleText, {color: this.state.titleColor}]} numberOfLines={1}>
                        {this.state.title}
                    </Text>
                </View>

                <TouchableOpacity onPress={this._onRightButtonPressHandle.bind(this)}>
                    <View style={styles.rightButton}>
                        {this._renderRightIcon()}
                        <Text style={[styles.rightButtonTitle, {color: this.state.rightButtonTitleColor}]}>
                            {this.state.rightButtonTitle}
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
};

let styles = StyleSheet.create({
    container: {
        // flex: 1,
        // position: 'absolute',
        // top: 0,
        // left: 0,
         flexDirection: 'row',
         width: width,
        borderBottomWidth: 1 / pixelRation,
        borderBottomColor:'#F4F4F4'
    },
    leftButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 90,
        paddingTop: 1,
        paddingLeft: 8
    },
    leftButtonIcon: {
        width: 15,
        height: 15,
        marginLeft: 6
    },
    leftButtonTitle: {
        fontSize: 15,
        marginLeft: 4
    },
    title: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 1,
        justifyContent: 'center',
        width: width - 200,
        overflow: 'hidden'
    },
    titleText: {
        fontSize: 16,
        fontWeight: '500'
    },
    rightButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 90,
        paddingTop: 1,
        paddingRight: 8
    },
    rightButtonIcon: {
        width: 22,
        height: 22
    },
    rightButtonTitle: {
        fontSize: 15
    }
});

if(Platform.OS === 'ios'){
    styles = {
        ...styles,
        container: {
            // flex: 1,
            // position: 'absolute',
            // top: 0,
            // left: 0,
            flexDirection: 'row',
            width: width,
            paddingTop: 20,
            borderBottomWidth: 1 / pixelRation,
            borderBottomColor:'#F4F4F4'
        }
    }
}