import React, {Component} from "react";
import Searchbar from "./Searchbar/Searchbar";

import css from './App.module.css'
import ImageGallery from "./ImageGallery/ImageGallery";


export default class App extends Component {

  state = {
    searchName: '',
    
}
  
      
 
  handleSerchbarFormSubmit = searchName => {
    this.setState({ searchName });
  }
  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSerchbarFormSubmit} />
        <ImageGallery  searchName={this.state.searchName} />
       
      </div>
    )


  }
}

