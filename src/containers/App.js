import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      robots: [],
      searchfield:''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=>res.json())
    .then(user=>{this.setState({robots: user})})

  }

  onSearchChange=(event)=>{
    this.setState({searchfield:event.target.value})
  }

  render(){
    const filterRobot = this.state.robots.filter(robot=>{
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })
    if(this.state.robots.length === 0){
      return <h1>Loading</h1>
    } else {
  return(
    <div>
    <h1 className='f1 tc'>RobotFriends</h1>
    <SearchBox searchChange={this.onSearchChange}/>
    <Scroll>
    <CardList robots={filterRobot} />
    </Scroll>
    </div>
  );
}
}
}


export default App;
