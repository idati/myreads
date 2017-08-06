import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BooksSearch from './BooksSearch'
import update from 'react-addons-update'



class BooksApp extends React.Component {
  constructor() {
    super()
    this.state = {
      books: [],
      Reading: [],
      wantToRead: [],
      Read: [],
      keine: []
  }
}

  
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      //BooksAPI.update(books,"none")
            //currentlyReading')
      this.setState({books})
      console.log(books)
      console.log("BookAPI",BooksAPI)
    })

  }

  refresh = () => {
    BooksAPI.getAll().then((books) => {
      //BooksAPI.update(books,"none")
            //currentlyReading')
      this.setState({books})
      console.log(books)
      console.log("BookAPI",BooksAPI)
    })    
  }

  searchBooks = (match) => {
    let searchAnswer = BooksAPI.search(match)
    for (var key in searchAnswer) {
        console.log("key: ",key);
    }
    let check
    //console.log("Answer",
    searchAnswer.then(
      function(value){
        check = value.error
        console.log("value", value.error)
      }).then(() => {
    console.log(searchAnswer)
    console.log("check",check)
    if (check !== 'empty query'){
      console.log("went in first")
      searchAnswer.then((books) => {
        this.setState({books})
    })} else {
        console.log("went in second")
        this.refresh
        //this.setState({books: []})
      }})
    return searchAnswer
  }

  updateList = (status, res) => {
    console.log('update!!!!!')
    BooksAPI.update(res,status)
    var info =BooksAPI.update('none', res)
    console.log(info)
    console.log(status)
    var arrayRead = this.state.Read
    var arrayReading = this.state.Reading
    var arraywantToRead = this.state.wantToRead
    console.log(arrayRead)
    console.log(arrayReading)
    console.log(arraywantToRead)
    console.log("RES", res.id)
    //var res=event.target.value.split("___")
    var filterbook = this.state.books.filter((books) => books.id===res.id)
    if (filterbook.length > 0){
      BooksAPI.update(filterbook[0], status)
      BooksAPI.getAll().then((books) => {
      //BooksAPI.update(books,"none")
            //currentlyReading')
      this.setState({books})
      })
    }
    //console.log(event.target.value)
    //var res=event.target.value.split("_")
    //if(res[0]==='read'){
    //this.props.setState({Read: [...this.props.state.Read,res[1]]}
  if (status==='wantToRead'){
    if (arraywantToRead.indexOf(res) ===-1){
      console.log(status)
      this.setState(update(this.state, {wantToRead: {$push: [res]}}))
    }
  }
  else if (status==='Read'){
    if (arrayRead.indexOf(res) ===-1){
      console.log(status)
      this.setState(update(this.state, {Read: {$push: [res]}}))

    }
  }
  else if (status==='Reading'){
    if (arrayReading.indexOf(res) ===-1){
      console.log(status)
      this.setState(update(this.state, {Reading: {$push: [res]}}))
    }
  }
  else if (status==='keine'){
    //var index = array.indexOf(res)
    if (arrayRead.indexOf(res) !==-1){
      arrayRead.splice(arrayRead.indexOf(res),1)
      this.setState({Read: arrayRead})
    }
    if (arrayReading.indexOf(res) !==-1){
      arrayReading.splice(arrayReading.indexOf(res),1)
      this.setState({Reading: arrayReading})
    }
    if (arraywantToRead.indexOf(res) !==-1){
      arraywantToRead.splice(arraywantToRead.indexOf(res),1)
      this.setState({wantToRead: arraywantToRead})
    }
  }
  //  console.log(this)
  //}
  //this.props.setState()
    var fs = require('fs')
    console.log('fs:',fs)
    console.log(this.state.Read)
    var json = JSON.stringify(this.state.Read)
    console.log('JSON', json)
//    fs.writeFile('./Data.json', 'Hello', 
//      function(err){
//        if (err) throw err
//          console.log('complete')
//      }
//    )
  
}


  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <BookShelf 
            updateListChild={this.updateList}
            books={this.state.books}
            Reading={this.state.Reading}
            wantToRead={this.state.wantToRead}
            Read={this.state.Read}
            keine={this.state.keine}          
          />
          )}/>
        <Route path='/search' render={(books) => (
          <BooksSearch
            updateListChild={this.updateList}
            refresh={this.refresh}
            searchBooks={this.searchBooks}
            books={this.state.books}
            Reading={this.state.Reading}
            wantToRead={this.state.wantToRead}
            Read={this.state.Read}
            keine={this.state.keine}
          />
          )}/>
      </div>
      )
  }

}

export default BooksApp
