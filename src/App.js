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

  updateList = (book, value) => {
    book.shelf=value

    BooksAPI.update(book, value).then(res => {
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }


  // updateList = (status, res) => {
  //   BooksAPI.update(res,status)
  //   var filterbook = this.state.books.filter((books) => books.id===res.id)
  //   if (filterbook.length > 0){
  //     BooksAPI.update(filterbook[0], status)
  //   }
  //   BooksAPI.getAll().then((books) => {
  //   this.setState({books})
  //   })
  // }

  refresh = () => {
    this.setState({books: []})  
  }

  searchBooks = (match) => {
    const searchAnswer = BooksAPI.search(match)
    let check
    let thisbooks = this.state.books
    let thisfetch = this.state.books.shelf
    let yn='no'
    searchAnswer.then(
      function(value){
         if (value !== undefined){
           check = value.error
          for (var j=0;j<value.length;j++){
            const resu = value[j]
           for(var i=0;i<thisbooks.length;i++){
            if(thisbooks[i].id === value[j].id){
              yn='yes'
              resu.shelf=thisbooks[i].shelf
            }
           }
           if(yn==='no'){
            resu.shelf='none'
           }
           yn='no'
         }
         } else {
           check='empty query'
         }

      }).then(() => {
        if (check !== 'empty query'){
           for(var i=0;i<thisbooks.length;i++){
         }
          searchAnswer.then((books) => {
          this.setState({books})
         })
      } else {
          this.refresh()
      }})
    return searchAnswer
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
