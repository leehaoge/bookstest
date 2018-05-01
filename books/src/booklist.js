import React, { Component } from 'react';

class Navpages extends Component {
    render() {
        return (
            <div class="page-nav">
                <div class="nav-content">&lt;priorPage 1 2 3 4 5 6 7 8 9 10 nextPage&gt;</div>
            </div>
        );
    }
}

class Booklist extends Component {
    render() {
      return (
            <ul>
            </ul>
            <NavPages />
        );
    }
}

export default Booklist;      