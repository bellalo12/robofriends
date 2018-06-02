import React from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

import {setSearchField} from '../actions';

const mapStateToProps = state =>{
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onSearchChange:(event)=>dispatch(setSearchField(event.target.value))
  }
}

class App extends React.Component{
  constructor(){
    super();
    this.state={
      robots: []
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=>res.json())
    .then(user=>{this.setState({robots: user})})

  }


  render(){
    const {robots} = this.state;
    const {searchField, onSearchChange} = this.props
    const filterRobot = robots.filter(robot=>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    if(this.state.robots.length === 0){
      return <h1>Loading</h1>
    } else {
  return(
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
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
