import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class BooksSearch extends Component {


state = {
	query: ''
}

updateQuery = (query) => {
	this.setState({query: query.trim() })
}

handleChange = (event) => {
	var res=event.target.value.split("___")
	var filterbook = this.props.books.filter((books) => books.id===res[1])
  this.props.updateListChild(res[0], filterbook[0])
}

clearQuery = () => {
	this.setState({ query: '' })
}
searchAll = (match) => {
  this.props.searchBooks(match)
  this.clearQuery()
}


render() {
	const {books} = this.props
	const{query} = this.state

	let showingBooks
	if(query){
		const match = new RegExp(escapeRegExp(query), 'i')
    if (books.length > 0){
		showingBooks = books.filter((book)=>match.test([book.authors, book.title]))
    }
	  } else {
		  showingBooks = books
  }
	
	return(
      <div className="app">      
          <div className="search-books">
            <div className="search-books-bar">
              <a href='/' className="close-search">Close</a>
              <div className="search-books-input-wrapper">
                <input 
                	type="text" 
                	placeholder="Search by title or author"
                	value={this.state.query}
                	onChange={(event) => this.updateQuery(event.target.value)}
                />             
              </div>
              <button onClick={() =>  this.searchAll(this.state.query)}>Search All</button>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
          <div className="bookshelf-books">
                    <ol className="books-grid">
                    { 
                      showingBooks.map((books) =>(
                      <li key={books.id}>
                        <div className="book">
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