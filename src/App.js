import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BooksSearch from './BooksSearch'



class BooksApp extends React.Component {
  constructor() {
    super()
    this.state = {
      books: [],
    }
  }

  
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })

  }

  refresh = () => {
    this.setState({books: []})  
  }

  searchBooks = (match) => {
    let searchAnswer = BooksAPI.search(match)
    let check
    searchAnswer.then(
      function(value){
        if (value !== undefined){
        check = value.error
      } else {
        check='empty query'
      }
      }).then(() => {
        if (check !== 'empty query'){
          searchAnswer.then((books) => {
          this.setState({books})
        })} else {
          this.refresh()
      }})
    return searchAnswer
  }

  updateList = (status, res) => {
    BooksAPI.update(res,status)
    var filterbook = this.state.books.filter((books) => books.id===res.id)
    if (filterbook.length > 0){
      BooksAPI.update(filterbook[0], status)
    }
    BooksAPI.getAll().then((books) => {
    this.setState({books})
    })
  }


  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <BookShelf 
            updateListChild={this.updateList}
            refresh={this.refresh}
            books={this.state.books}    
          />
          )}/>
        <Route path='/search' render={(books) => (
          <BooksSearch
            updateListChild={this.updateList}
            refresh={this.refresh}
            searchBooks={this.searchBooks}
            books={this.state.books}
          />
          )}/>
      </div>
      )
  }

}

export default BooksApp
