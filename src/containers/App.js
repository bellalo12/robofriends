import React from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

import {setSearchField, requestRobots} from '../actions';

const mapStateToProps = state =>{
  return {
    searchField: state.searchRobots.searchField,
    isPending: state.requestRobots.isPending,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onSearchChange:(event)=>dispatch(setSearchField(event.target.value)),
    onRequestRobots:()=>dispatch(requestRobots())
  }
}

class App extends React.Component{
  componentDidMount(){
     this.props.onRequestRobots()
  }


  render(){
    const {searchField, onSearchChange, robots, isPending} = this.props
    const filterRobot = robots.filter(robot=>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
      return isPending
    ? <h1>Loading</h1>
    : (
    <div>
    <h1 className='f1 tc'>RoboFriends</h1>
    <SearchBox searchChange={onSearchChange}/>
    <Scroll>
    <CardList robots={filterRobot} />
    </Scroll>
    </div>
  );
}
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
