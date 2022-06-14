import React from 'react';
import '../css/Menu.css';
import Tutorial from "./Tutorial.js";
import Drench from "./Drench.js";

const Menu = (props) => {

        return(
            <div className='menu'>
            <Item item={"Tutorial"} handleContent={props.handleContent} game={<Tutorial />} />
            <Item item={"Drench"} handleContent={props.handleContent} game={<Drench />}/>
            </div>
        )
}
//ideas: drench game, use api to display information, composer list?, algorithms (sort, kmp)

function Item(props){
    return (
        <div className='menu-item' style={{cursor: "pointer"}} onClick={() => (props.handleContent(props.game))} >{props.item}</div>
    )
}


export default Menu;