import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


class App extends React.Component{
  constructor(){
    super();
    this.state={
      robots:[],
      searchfelid:''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=>res.json())
    .then(users=>{this.setState({robots: users})})
  }

  onSearchChange=(event)=>{
    this.setState({searchfield: event.target.value})
  }

  render(){
    const {searchfield, robots} = this.state
    const filterRobot = robots.filter(robot=>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
      return !robots.length
    ? <h1>Loading</h1>
    : (
    <div>
    <h1 className='f1 tc'>RoboFriends</h1>
    <SearchBox searchChange={this.onSearchChange}/>
    <Scroll>
    <CardList robots={filterRobot} />
    </Scroll>
    </div>
  );
}
}



export default App;
