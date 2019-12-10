import React from 'react';
import axios from 'axios';
import Game from './Game';
import {Route, Link} from 'react-router-dom';

export default class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    
    componentDidMount() {
        axios.get('https://wild-games.herokuapp.com/api/v1')
        .then((res,err) => {
            if (err) console.log(err);
            this.setState({list: res.data, all: res.data, bool: false})
            console.log(res.data)
        })
    }

    displayGame = () => {
         
        return this.state.list.map((item, i) => {
            return (
                <Game {...item} key={i} index={i} delete={this.deleteGame}/>
            )
        })
    }

    deleteGame = (i) => {
        let a = this.state.list;
        a.splice(i,1);
        this.setState({
            list: a
        })
    }

    displayScreenshots = (i) => {
        let a = this.state.list[i].short_screenshots;
        return a.map(item => {
            return <img src={item.image} width="50%" height="200px"/>
        })
    }

    filter = (bool) => {
        if (!bool){
        const result = this.state.list.filter(game => game.rating > 4.5);
        this.setState({
            list: result,
            bool: true
        })
    }
     else {
         this.setState({
             list: this.state.all,
             bool: false
         })
     }
    }

    render() {
        return(
            <div>
                <Route exact path="/">
                <button  style={{fontSize: "1.5em", backgroundColor: "#abddab", margin: "1%"}} onClick={() => this.filter(this.state.bool)}>{!this.state.bool ? "Filter" : "All Games"}</button>
                {this.state.list.length > 0 ? this.displayGame(): null}
                </Route>
                <Route path="/game/screenshots/:id" render={(props) => <DisplayScreenshots {...props} fct={this.displayScreenshots} state={this.state.list} />}/>
                
            </div>
        )
    }
}

const DisplayScreenshots = (props) => {
    return (
<div width="100%" >
    <Link to='/'><button style={{fontSize:"1.5em", margin: "1%"}}>Home</button></Link>
    <div style={{textAlign: "left"}}>
    {props.state.length > 0 ? props.fct(props.match.params.id):null}</div>
    </div>
    )
}