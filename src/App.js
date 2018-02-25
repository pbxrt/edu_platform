import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/home';
import EduResourceDis from './containers/eduResourceDis';
import AddMore from './containers/addMore';
import CourseData from './containers/courseData';
import Curriculumn from './containers/curriculumn';
import LessonData from './containers/lessonData';
import SelectedSubjects from './containers/selectedSubjects';
import TeaStuCompare from './containers/teaStuCompare';
import BasicInfo from './containers/basicInfo';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route path='/' exact component={Home} />
                <Route path='/edu/resource/distribution' component={EduResourceDis} />
                <Route path='/teacher/student/compare' component={TeaStuCompare} />
                <Route path='/course/data' component={CourseData} />
                <Route path='/lesson/data' component={LessonData} />
                <Route path='/selected/subjects' component={SelectedSubjects} />
                <Route path='/curriculumn' component={Curriculumn} />
                <Route path='/basic/info' component={BasicInfo} />
                <Route path='/add/more' component={AddMore} />
            </div>
        );
    }
}

export default App;
