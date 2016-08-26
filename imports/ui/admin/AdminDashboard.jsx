import React, { Component, PropTypes } from 'react';
import AdminInfoList from './AdminInfoList';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data';
import api from '../../../client/api.js';

export default class AdminDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userData: null,
        };

        mixins: [
            Router.State, Router.Navigation, ReactMeteorData
        ];
    }

    getRoles() {

        return ['team-member', 'team-lead', 'admin'];
    }

    getTeams() {
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    }

    setAllUserData() {
        api.users.getAllUsers().then(
            (data) => {
                this.setState({userData: data});
            }
        );
    }

    getCurrentUserDocument() {
        // look through the list of users on this team and get the one that is the current logged in user
        return _.find(this.state.userData, (user) => {
            if (user._id === this.props.user._id) {
                return user;
            }
        });
    }

    getAllReviewsFromStudents(students) {
        if (!students) {
            return null;
        }

        var allReviews = [];

        for (var i = 0; i < students.length; i++) {
            if (students[i].reviews) {
                allReviews = allReviews.concat(students[i].reviews);
            }
        }

        return allReviews;
    }

    getAdminDashboard() {
        if (!this.state.userData) {
            this.setAllUserData();
        }
        console.log(this.state.userData);

        return (
            <div>
                <h2>Admin Dashboard</h2>
                <AdminInfoList
                    user={this.getCurrentUserDocument()}
                    students={this.state.userData}
                    roles={this.getRoles()}
                    reviews={this.getAllReviewsFromStudents(this.state.userData)}
                    teams={this.getTeams()}
                />
            </div>
        );
    }

    render() {
        if(this.props.user && this.props.user.role != 'admin'){
            return <h2>You are not an admin</h2>
        }
        if (this.props.loggingIn) {
            return (<h4>Logging In...</h4>);
        } else if (!this.props.loggingIn && this.props.user) {
            return (
                <div>
                    {this.getAdminDashboard()}
                </div>
            );
        } else {
            return (<h4>Please Log In</h4>);
        }

    }
}

export default createContainer(() => ({
    user: Meteor.user(),
    loggedIn: !Meteor.userId(),
    loggingIn: Meteor.loggingIn()
}), AdminDashboard);

