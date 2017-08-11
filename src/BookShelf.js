import React, {Component} from 'react'

class BookShelf extends Component {
	
	state = {
	query: ''
}

handleChange = (event) => {
  var res=event.target.value.split("___")
  var filterbook = this.props.books.filter((books) => books.id===res[1])
  this.props.updateListChild(filterbook[0], res[0])
}
	render(){
		return(
            <div>
              <h1 className="list-books-title">MyReads</h1>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.props.books.filter((books) => books.shelf==="currentlyReading").map((books) =>(
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.props.books.filter((books) => books.shelf==="wantToRead").map((books) =>(
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.props.books.filter((books) => books.shelf==="read").map((books) =>(
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
              </div>
            </div>
            <div className="open-search">
              <a href='/search' onClick={() => this.props.empty}>Add a book</a>
            </div>
          </div>
      

			)
	}
}

export default BookShelf