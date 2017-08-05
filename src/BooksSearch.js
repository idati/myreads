import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
//import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
//import ImageInput from './ImageInput'
//import serializeForm from 'form-serialize'
//import update from 'react-addons-update'

class BooksSearch extends Component {


state = {
	query: ''
}

updateQuery = (query) => {
	this.setState({query: query.trim() })
}

handleChange = (event) => {
  //console.log(BooksAPI.update("nggnmAEACAAJ","Reading"))
  //console.log(BooksAPI.search("Android"))
	//console.log(event.target.value)
	var res=event.target.value.split("___")
	console.log(res)
	var filterbook = this.props.books.filter((books) => books.id===res[1])
	//console.log(BooksAPI)
	//BooksAPI.update(filterbook, 'read')
  //console.log("event",filterbook[0], res[1])
  //console.log(res[0])
  //console.log("feedbakck: ",BooksAPI.update(filterbook[0],"none"))
  //console.log(typeof res[0])
  //BooksAPI.update(filterbook[0], res[0])//'"'+res[0]+'"')
	if(res[0] !== 'none'){
		//this.props.setState({Read: [...this.props.state.Read,res[1]]})
		//this.setState(update(this.props, {Read: {$push: [res[1]]}}))
		//this.props.updateListChild(res[0], filterbook)
    this.props.updateListChild(res[0], filterbook[0])
		console.log(this)
	}
	if(res[0]==='none'){
		//this.props.updateListChild(res[0], filterbook)
    console.log("book id", this.props.books[0].id)
    //BooksAPI.update(this.props.books[0].id,"none")
    //this.props.books.shelf="none"
    this.props.updateListChild(res[0], filterbook[0])
		console.log(this)
	}
	//this.props.setState()
}

clearQuery = () => {
	this.setState({ query: '' })
}
searchAll = (match) => {
  let searchAnswer=this.props.searchBooks(match)
  //console.log(searchAnswer[1].error)
  this.clearQuery()
  console.log("search All Positive")
}


render() {
	const {books, Reading, wantToRead, Read} = this.props
	const{query} = this.state

	let showingBooks
	if(query){
		const match = new RegExp(escapeRegExp(query), 'i')
    //console.log(BooksAPI.search(match))
    //this.props.searchBook(match)
    console.log(match)
    if (books.length > 0){
		showingBooks = books.filter((book)=>match.test([book.authors, book.title]))
    }
    console.log(showingBooks.length)
    //showingBooks = BooksAPI.search(match)//books.filter((books)=>match.test([books.authors, books.title]))
	} else {
		showingBooks = books
	}
	return(
      <div className="app">      
          <div className="search-books">
            <div className="search-books-bar">
              <a href='/' className="close-search">Close</a>
              <div className="search-books-input-wrapper">
                 {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                 
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                	type="text" 
                	placeholder="Search by title or author"
                	value={this.state.query}
                	onChange={(event) => this.updateQuery(event.target.value)}
                />             
              </div>
              <button onClick={() => this.searchAll(this.state.query)}>Search All</button>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
          <div className="bookshelf-books">
                    <ol className="books-grid">
                    {showingBooks.map((books) =>(
                      <li key={books.id}>
                        <div className="book" style={{background: '#ddd'}}>
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage: `url(${books.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={this.handleChange}>
                                <option value='none'>Move to ...</option>
                                <option value={'currentlyReading___'+books.id}>Currently Reading</option>
                                <option value={'wantToRead___'+books.id}>Want to Read</option>
                                <option value={'read___'+books.id}>Read</option>
                                <option value={'none___'+books.id}>None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{books.title}</div>
                          <div className="book-authors">{books.authors}</div>
                          <div className="book-id">{books.id}</div>
                        </div>
                      </li>
                      ))}
                   </ol>
           </div>
        </div>
		)
	}	
}
export default BooksSearch