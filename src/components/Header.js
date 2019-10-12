import React, { Component } from 'react';
import { AutoComplete } from './AutoComplete';
import { DropDown } from './DropDown';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowDown, faArrowUp } from '@fortawesome/fontawesome-free-solid';

// export class DropDown extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       listOpen: false,
//       title: this.props.title
//     };
//     this.close = this.close.bind(this);
//   }

//   componentDidUpdate() {
//     const { listOpen } = this.state;
//     setTimeout(() => {
//       if (listOpen) {
//         window.addEventListener('click', this.close);
//       } else {
//         window.removeEventListener('click', this.close);
//       }
//     }, 0);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('click', this.close);
//   }

//   select(title, id, key) {
//     this.setState({
//       title: title,
//       selected: id,
//       key: key,
//       listOpen: false
//     });
//     if (this.props.update !== undefined) {
//       this.props.update(id);
//     }
//   }

//   close() {
//     this.setState({
//       listOpen: false
//     });
//   }

//   toggleList() {
//     this.setState({ listOpen: !this.state.listOpen });
//   }

//   render() {
//     return (
//       <div className="drop-down-wrapper">
//         <div className="drop-down-header" onClick={() => this.toggleList()}>
//           <div className="drop-down-header-title">{this.state.title}</div>
//           <div className="drop-down-arrow">
//             {this.state.listOpen ? (
//               <FontAwesomeIcon icon={faArrowUp} />
//             ) : (
//               <FontAwesomeIcon icon={faArrowDown} />
//             )}
//           </div>
//         </div>
//         {this.state.listOpen && (
//           <ul className="drop-down-list" onClick={e => e.stopPropagation()}>
//             {this.props.list.map(listItem => (
//               <li
//                 className="drop-down-list-item"
//                 key={listItem.id}
//                 onClick={() =>
//                   this.select(listItem.title, listItem.id, listItem.key)
//                 }
//               >
//                 {listItem.title}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   }
// }

export class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <DropDown
            title={'Most Popular'}
            list={this.props.list}
            update={this.props.update}
          />
          <h1>The Movie Site</h1>
          <AutoComplete movieSearch={this.props.movieSearch} />
        </header>
      </div>
    );
  }
}

export default Header;
