import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import $ from 'jquery';
import './App.css';

const pageSize = 10;
var currPage = 1, pageData, theApp, keyword;

function setPageData(data) {
  pageData = data;
  if (typeof (pageData.pageNo) !== 'number') pageData.pageNo = parseInt(pageData.pageNo);
  if (typeof (pageData.pageSize) !== 'number') pageData.pageSize = parseInt(pageData.pageSize);
  if (typeof (pageData.totalPages) !== 'number') pageData.totalPages = parseInt(pageData.totalPages);

  var indexed = {};

  for (var i in pageData.books) {
    var book = pageData.books[i], id = book._id.$oid;
    console.log(book.title);
    indexed[id] = book;
  }
  pageData.indexed = indexed;
  currPage = pageData.pageNo;
}


class NavPages extends Component {

  prevClick() {
    if (theApp) theApp.navPage(--currPage);    
  }

  nextClick() {
    if (theApp) theApp.navPage(++currPage);
  }

  pageClick(idx) {
    if (theApp) {
      currPage = idx;
      theApp.navPage(currPage);
    }
  }

  render() {
    var self = this, prevLink = function () {
      if (pageData && pageData.pageNo > 1) {
        return (<a href="#" onClick={()=>{self.prevClick()}}>Privious Page</a>)
      } else
        return (<span>Privious Page</span>);
    },
      nextLink = function () {
        if (pageData && pageData.pageNo < pageData.totalPages) {
          return (<a href="#" onClick={()=>{self.nextClick()}}>Next Page</a>)
        } else
          return (<span>Next Page</span>);
      },
      pageLinks = function () {
        var ret = [];
        for (var i = 1; i <= pageData.totalPages; i++) {
          if (i == pageData.pageNo) {
            ret.push(<span className="curr-page">{i}</span>);
          } else {
            ret.push(<a href="#" data-id={i} onClick={(e)=>{
              var idx = parseInt(e.target.attributes['data-id'].value);
              self.pageClick(idx)}
            }>{i}</a>);
          }
          if (i < pageData.totalPages) ret.push(<span>&nbsp;</span>);
        }
        return ret;
      };

    return (
      <div className="page-nav">
        <div className="nav-content">{prevLink()} {pageLinks()} {nextLink()}</div>
      </div>
    );
  }
}

class Book extends Component {

  imgHref() {
    if (!this.state || !this.state.value || !this.state.value.image) {
      return 'data:image/png;base64,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';
    }
    var s = this.state.value.image,
      noNeed = s.startsWith('http://') || s.startsWith('https://');
    return (noNeed ? '' : 'http://') + this.state.value.image;
  }

  click() {
    if (this.state.value) {
      ReactDOM.render(<BookDetail book={this.state.value} />, document.getElementById('book-list'));
    }
  }

  render() {
    if (this.props && this.props.bookid) {
      this.state = { value: pageData.indexed[this.props.bookid] };
    } else {
      this.state = {
        value: {
          image: 'data:image/png;base64,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',
          title: 'untitled',
        }
      };
    }
    return (
      <div className="book-list-item-content" onClick={()=>this.click()}>
        <img src={this.imgHref()} />
        <div className="book-list-title">{this.state.value.title}</div>
      </div>
    );
  }
}

class BookDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {value: props.book};
  }

  imgHref() {
    if (!this.state || !this.state.value || !this.state.value.image) {
      return 'data:image/png;base64,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';
    }
    var s = this.state.value.image,
      noNeed = s.startsWith('http://') || s.startsWith('https://');
    return (noNeed ? '' : 'http://') + this.state.value.image;
  }

  getDescription() {
    return this.state.value.description;
  }


  componentDidMount() {
    document.getElementById('book-desc').innerHTML = this.getDescription();
  }

  back2List() {
    if (theApp) theApp.navPage(currPage);
  }

  render() {
    return (
      <div>
        <div className="text-left"><a href="#" onClick={()=>this.back2List()}>Go Back</a></div>
        <div className="book-detail-pane">
          <div className="book-detail-image">
            <img src={this.imgHref()} />
          </div>
          <div className="book-detail-data">
            <h2>{this.state.value.title}</h2>
            <p>Author: {this.state.value.authors[0].display_name}</p>
            <p>ISBN: {this.state.value.primary_isbn}</p>
            <p>Price: {this.state.value.price}</p>
            <p>Publisher: {this.state.value.publisher}</p>
            <p>Description:<div id="book-desc"></div></p>
            <p>Genre: {this.state.value.genre}</p>
          </div>
        </div>
      </div>
    );
  }
}

class Booklist extends Component {
  render() {
    var booklist = function () {
      var ret = [];
      if (pageData && pageData.books) {
        var books = pageData.books;
        for (var i in books) {
          var book = books[i];
          ret.push(
            <li className="book-list-item">
              <Book bookid={book._id.$oid} />
            </li>
          );
        }
      }
      return ret;
    };
    return (
      <div>
        <ul className="book-list">
          {booklist()}
        </ul>
        <NavPages />
      </div>
    );
  }
}

class Booksearch extends Component {
  search() {
    if (!this.state || !this.state.value) this.state = {value: ''};
    $.ajax({
      url: 'http://localhost:4000/search',
      data: { keyword: this.state.value},
      type: 'post',
      dataType: 'json',
      success: function (msg) {
        if (msg) setPageData(msg);
        ReactDOM.render(<Booklist />, document.getElementById('book-list'));
      }
    });
  }

  inpChanged(e) {
    this.state = {value: e.target.value};
    keyword = e.target.value;
  }

  render() {
    var self = this;
    return (
      <div className="search-bar">
        <input id="inp-search" className="book-search-input" type="input" onChange={(e)=>this.inpChanged(e)} />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVGhU_flmz2nS762CR-DUviFkG1QZ3O2cgKN4ciZxJAs04gang"
           onClick={()=>self.search()} />
      </div>
    );
  }
}


class App extends Component {

  navPage(pageNo) {
    var data = { page: currPage, pageSize: pageSize };
    if (keyword && keyword.length > 0) data.keyword = keyword;
    $.ajax({
      url: 'http://localhost:4000/page',
      data: data,
      type: 'post',
      dataType: 'json',
      success: function (msg) {
        if (msg) setPageData(msg);
        ReactDOM.render(<Booklist />, document.getElementById('book-list'));
      }
    });
  }

  componentDidMount() {
    theApp = this;
    this.navPage(currPage);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Book Test Project</h1>
          <Booksearch />
        </header>
        <div id="book-list" />
      </div>
    );
  }
}

export default App;
