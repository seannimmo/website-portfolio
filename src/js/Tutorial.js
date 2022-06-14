import React from 'react';
import {useState} from 'react';

const welcome = {
    greeting: 'hey',
    title: "React"
}
  

const getTitle = title => {
    return title;
}

const Tutorial = () => {
    const stories = [
        {
          title: 'React',
          url: 'https://reactjs.org/',
          author: 'Jordan Walke',
          num_comments: 3,
          points: 4,
          objectID: 0,
      }, {
          title: 'Redux',
          url: 'https://redux.js.org/',
          author: 'Dan Abramov, Andrew Clark',
          num_comments: 2,
          points: 5,
          objectID: 1,
      }, ];
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = event => {
        //synthetic event
        //pass function. not return value.
        setSearchTerm(event.target.value);
        //callback function
    }

    const searchedStories =  stories.filter(story => {
        story.title.includes(searchTerm);
    });

    return (<div>
        <div>{welcome.greeting} {getTitle("React")}</div>
        <Search searchTerm={searchTerm} onSearch={handleSearch}/>
        <hr />
        <List list={searchedStories}/>
    </div>)
}

const Search = props =>{

    return (
        <div>
            <label htmlFor='search'>Search: </label>
            <input id="search" type="text" onChange={props.onSearch}/>
            <p>
            Searching for: {props.searchTerm}
        </p>
        </div>
    )
}

const List = props => 
    props.list.map(book => {
        return (
            <div key={book.objectID}>
                <a href={book.url}>{book.title}</a>
                <span> {book.author}</span>
                <span> {book.num_comments}</span>
                <span> {book.points}</span>
            </div>)
        })

export default Tutorial;