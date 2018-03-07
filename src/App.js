import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/home';
import Nav from './containers/nav';
import EduResourceDis from './containers/eduResourceDis';
import AddMore from './containers/addMore';
import CourseData from './containers/courseData';
import LessonTable from './containers/lessonTable';
import LessonData from './containers/lessonData';
import subjectGrp from './containers/subjectGrp';
import TeaStuCompare from './containers/teaStuCompare';
import BasicInfo from './containers/basicInfo';
import './styles/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route path='/' exact component={Home} />
                <Route path='/report' render={() => <Nav city={'宁德市'} />} />
                <Route path='/report/edu/resource/distribution' component={EduResourceDis} />
                <Route path='/report/teacher/student/compare' component={TeaStuCompare} />
                <Route path='/report/course/data' component={CourseData} />
                <Route path='/report/lesson/data' component={LessonData} />
                <Route path='/report/selected/subjects' component={subjectGrp} />
                <Route path='/report/table' component={LessonTable} />
                <Route path='/report/basic/info' component={BasicInfo} />
                <Route path='/report/add/more' component={AddMore} />
            </div>
        );
    }
}

export default App;
