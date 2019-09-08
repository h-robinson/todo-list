import React from 'react';

class SearchResults extends React.Component {
	statusSummary(match) {
		let status;
		if (match.status === 'completed') {
			status = [match.status, match.completed_date];
			console.log('first', status);
		} else if (match.date_operator) {
			status = ['do', match.date_operator, match.date];
			console.log('second', status);
		} else {
			status = [match.status]
			console.log('third', status);
		}

		return status.join(' ');
	}

  matchListItems() {
    return (
      this.props.searchMatches.map(match => {
        return (
          <li key={ match.id }>
            { this.props.listType === 'search' ?
            		this.searchListItems(match) :
            		this.addListItems(match) }
          </li>
        )
      })
    )
  }

  searchListItems(match) {
  	return (
  		<span>
 		 		{ match.title } { ' ' }
  			({ this.statusSummary(match) })
  		</span>
 		)
  }

  addListItems(match) {
  	return (
  		<span>
  			{ match.title }
  		</span>
		)
  }

	render(){
		return (
      <div className='matched-todos'>
        <ul>
          { this.matchListItems() }
        </ul>
      </div>
		);
	}
}

export default SearchResults;