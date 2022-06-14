import React from 'react';
import '../css/Navbar.css';

const links = {
    'GitHub': "https://github.com",
        'LinkedIn': "https://linkedin.com",
        'About Me': 'about-me'
}

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='navbar'>
                {Object.entries(links).map( ([key, value]) => 
                   <Item title={key} key={value} url={value} />
                )}
            </div>
        )
    }
}

const Item = ({title, url}) => {
    return(
        <a href={url} className="navbar-item">{title}</a>
    )
}

export default Navbar; 

