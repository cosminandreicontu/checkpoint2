import React from 'react';
import {BrowserRouter, Route, Switch, Link, useParams} from 'react-router-dom'

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            games: []
        }
    }
    render() {
        return (
                <div style={{transition: "0.5s", border: "2px solid black", backgroundImage: `url(${this.props.background_image})`}}>
                    
                <h2 style={{backgroundColor: "rgba(255,255,255,0.3"}}>{this.props.name}</h2>
                <p style={{fontSize: "1.5em", backgroundColor: "rgba(255,255,255,0.3"}}>Rating: {this.props.rating}</p>
                <button style={{fontSize: "1.5em", backgroundColor: "#ee8888"}} onClick={() => this.props.delete(this.props.index)}>Delete</button> <Link to={"/game/screenshots/"+this.props.index} >
                    <button style={{fontSize: "1.5em", backgroundColor: "#ababdd", margin: "1%"}}>Screenshots</button></Link>
            </div>
              )
          }
        
}