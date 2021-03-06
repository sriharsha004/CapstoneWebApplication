import React, {Component, PropTypes} from 'react';
import {Table, Panel} from 'react-bootstrap';
import StudentInfo from './StudentInfo';

export default class StudentInfoList extends Component {
    constructor(props) {
        super(props);
    }

    renderStudentInfoList() {
        return this.props.students.map((student) => {
            return (
                <StudentInfo user={this.props.user} student={student}/>
            );
        });
    }

    getStudentInfoHeader() {
        return (
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Midterm 360</th>
                <th>Final 360</th>
            </tr>
            </thead>
        );
    }

    render() {
        if (!this.props.students) {
            const style = {
                width: '50%',
                margin: '0 auto'
            };
            return (
                <div style={style}>
                    <h2>No Team Data</h2>
                </div>
            );
        }

        return (
            <Panel defaultExpanded header="Your Team">
                <Table fill striped bordered condensed>
                    {this.getStudentInfoHeader()}
                    <tbody>
                        {this.renderStudentInfoList()}
                    </tbody>
                </Table>
            </Panel>
        );
    }
}
