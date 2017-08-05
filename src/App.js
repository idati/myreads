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
  //  state = {
      books: [],
      Reading: [],
      wantToRead: [],
      Read: [],
      keine: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: true
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

  searchBooks = (match) => {
    let searchAnswer = BooksAPI.search(match)
    console.log("Answer", searchAnswer)
    searchAnswer.then((books) => {
      this.setState({books})
    })
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
//      <div className="app">
      
//        {this.state.showSearchPage ? (
//          <div className="search-books">
//            <div className="search-books-bar">
//              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
//              <div className="search-books-input-wrapper">
//                {/* 
//                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
//                  You can find these search terms here:
//                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
//                 
//                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
//                  you don't find a specific author or title. Every search is limited by search terms.
//                */}
//                <input type="text" placeholder="Search by title or author"/>
//                
//              </div>
//            </div>
//            <div className="search-books-results">
//              <ol className="books-grid"></ol>
//            </div>
//          </div>
//        ) : (
//
//          <div className="list-books">
//            <Route exact path='/' render={() => (
//              <)}
//            <div className="list-books-title">
//              <h1>MyReads</h1>
//            </div>
//            <div className="list-books-content">
//              <div>
//                <div className="bookshelf">
//                  <h2 className="bookshelf-title">Currently Reading</h2>
//                  <div className="bookshelf-books">
//                    <ol className="books-grid">
//                      <li>
//                        <div className="book">
//                          <div className="book-top">
//                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
//                            <div className="book-shelf-changer">
//                              <select>
//                                <option value="none" disabled>Move to...</option>
//                                <option value="currentlyReading">Currently Reading</option>
//                                <option value="wantToRead">Want to Read</option>
//                                <option value="read">Read</option>
//                                <option value="none">None</option>
//                              </select>
//                            </div>
//                          </div>
//                          <div className="book-title">To Kill a Mockingbird</div>
//                          <div className="book-authors">Harper Lee</div>
//                        </div>
//                      </li>
//                      <li>
//                        <div className="book">
//                          <div className="book-top">
//                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}></div>
//                            <div className="book-shelf-changer">
//                              <select>
//                                <option value="none" disabled>Move to...</option>
//                                <option value="currentlyReading">Currently Reading</option>
//                                <option value="wantToRead">Want to Read</option>
//                                <option value="read">Read</option>
//                                <option value="none">None</option>
//                              </select>
//                            </div>
//                          </div>
//                          <div className="book-title">Ender's Game</div>
//                          <div className="book-authors">Orson Scott Card</div>
//                        </div>
//                      </li>
//                    </ol>
//                  </div>
//                </div>
//                <div className="bookshelf">
//                  <h2 className="bookshelf-title">Want to Read</h2>
//                  <div className="bookshelf-books">
//                    <ol className="books-grid">
//                      <li>
//                        <div className="book">
//                          <div className="book-top">
//                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")' }}></div>
//                            <div className="book-shelf-changer">
//                              <select>
//                                <option value="none" disabled>Move to...</option>
//                                <option value="currentlyReading">Currently Reading</option>
//                                <option value="wantToRead">Want to Read</option>
//                                <option value="read">Read</option>
//                                <option value="none">None</option>
//                              </select>
//                            </div>
//                          </div>
//                          <div className="book-title">1776</div>
//                          <div className="book-authors">David McCullough</div>
//                        </div>
//                      </li>
//                      <li>
//                        <div className="book">
//                          <div className="book-top">
//                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")' }}></div>
//                            <div className="book-shelf-changer">
//                              <select>
//                                <option value="none" disabled>Move to...</option>
//                                <option value="currentlyReading">Currently Reading</option>
//                                <option value="wantToRead">Want to Read</option>
//                                <option value="read">Read</option>
//                                <option value="none">None</option>
//                              </select>
//                            </div>
//                          </div>
//                          <div className="book-title">Harry Potter and the Sorcerer's Stone</div>
//                          <div className="book-authors">J.K. Rowling</div>
//                        </div>
//                      </li>
//                    </ol>
//                  </div>
//                </div>
//                <div className="bookshelf">
//                  <h2 className="bookshelf-title">Read</h2>
//                  <div className="bookshelf-books">
//                    <ol className="books-grid">
//                      <li>
//                        <div className="book">
//                          <div className="book-top">
//                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' }}></div>
//                            <div className="book-shelf-changer">
//                              <select>
//                                <option value="none" disabled>Move to...</option>
//                                <option value="currentlyReading">Currently Reading</option>
//                                <option value="wantToRead">Want to Read</option>
//                                <option value="read">Read</option>
//                                <option value="none">None</option>
//                              </select>
//                            </div>
//                          </div>
//                          <div className="book-title">The Hobbit</div>
//                          <div className="book-authors">J.R.R. Tolkien</div>
//                        </div>
//                      </li>
//                      <li>
//                        <div className="book">
//                          <div className="book-top">
//                            <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")' }}></div>
//                            <div className="book-shelf-changer">
//                              <select>
//                                <option value="none" disabled>Move to...</option>
//                                <option value="currentlyReading">Currently Reading</option>
//                                <option value="wantToRead">Want to Read</option>
//                                <option value="read">Read</option>
//                                <option value="none">None</option>
//                              </select>
//                            </div>
//                          </div>
//                          <div className="book-title">Oh, the Places You'll Go!</div>
//                          <div className="book-authors">Seuss</div>
//                        </div>
//                      </li>
//                      <li>
//                        <div className="book">
//                          <div className="book-top">
//                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' }}></div>
//                            <div className="book-shelf-changer">
//                              <select>
//                                <option value="none" disabled>Move to...</option>
//                                <option value="currentlyReading">Currently Reading</option>
//                                <option value="wantToRead">Want to Read</option>
//                                <option value="read">Read</option>
//                                <option value="none">None</option>
//                              </select>
//                            </div>
//                          </div>
//                          <div className="book-title">The Adventures of Tom Sawyer</div>
//                          <div className="book-authors">Mark Twain</div>
//                        </div>
//                      </li>
//                    </ol>
//                  </div>
//                </div>
//              </div>
//            </div>
//            <div className="open-search">
//              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
//            </div>
//          </div>
      //  )}
      //</div>
    
//  }
//}

export default BooksApp
