(function () {
	'use strict';
	
	var data, selectGame;
	
	data = [
		{
			name: 'Mark Twain',
			imageUrl: 'images/authors/marktwain.jpg',
			books: ['The adventures of Huckleberry Finn']
		},
		{
			name: 'Joseph Conrad',
			imageUrl: 'images/authors/josephconrad.PNG',
			books: ['Heart of Darkness']
		},
		{
			name: 'J.K. Rowling',
			imageUrl: 'images/authors/jkrowling.jpg',
			imageSource: 'Wikimedia Commons',
			imageAttribution: 'Daniel Ogren',
			books: ['Harry Potter and the Sorcerers Stone']
		},
		{
			name: 'Stephen King',
			imageUrl: 'images/authors/stephenking.jpg',
			imageSource: 'Wikimedia Commons',
			books: ['The Shining', 'It']
		},
		{
			name: 'Charles Dickens',
			imageUrl: 'images/authors/charlesdickens.jpg',
			imageSource: 'Wikimedia Commons',
			books: ['The adventures of Huckleberry Finn']
		},
		{
			name: 'William Shakespeare',
			imageUrl: 'images/authors/williamshakespeare.jpg',
			imageSource: 'Wikimedia Commons',
			books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
		}
	];
	
	selectGame = function() {
		var books,answer;
		
		books = _.shuffle(this.reduce((prev, curr) => {
			return prev.concat(curr.books);
		}, [])).slice(0, 4);
		
		answer = books[_.random(books.length - 1)];
		
		return {
			books: books,
			author: _.find(this, (author) => {
				return author.books.some((title) => {
					return title === answer;
				});
			}),
			checkAnswer: function(title) {
				return this.author.books.some((t) => {
					return t === title;
				});
			}
			
		};
	};
	
	data.selectGame = selectGame;
	
	// Two  different ways of doing bind
	// One with Inheritance
	class BaseComponent extends React.Component {
		_bind(...methods) {
			methods.forEach( (method) => this[method] = this[method].bind(this) );
		}
	};
	
	// And one with a simple function
	function bind(obj, ...methods) {
		methods.forEach( (method) => obj[method] = obj[method].bind(obj) );
	}
	
    class AddGameForm extends React.Component{
		
		constructor() {
			super();
			bind(this, "handleSubmit");
		}
		
        handleSubmit() {
            this.props.onGameFormSubmitted(getRefs(this));
            return false;
        }
		
        render() {
            return (<div>
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Add Game Form</h1>
                                <form role="form" onSubmit={this.handleSubmit}>
                                  <div className="form-group">
                                    <input ref="imageUrl" type="text" className="form-control" placeholder="Image Url" />
                                  </div>
                                  <div className="form-group">
                                    <input ref="answer1" type="text" className="form-control" placeholder="Answer 1" />
                                  </div>
                                  <div className="form-group">
                                    <input ref="answer2" type="text" className="form-control" placeholder="Answer 2" />
                                  </div>
                                  <div className="form-group">
                                    <input ref="answer3" type="text" className="form-control" placeholder="Answer 3" />
                                  </div>
                                  <div className="form-group">
                                    <input ref="answer4" type="text" className="form-control" placeholder="Answer 4" />
                                  </div>
                                  <button type="submit" className="btn btn-default">Submit</button>
                                </form>
                            </div>                            
                        </div> 
                    </div>
				);
        }
    };	

	AddGameForm.propTypes = {
		onGameFormSubmitted: React.PropTypes.func.isRequired
	};
	
	class Quiz extends React.Component{
		constructor() {
			super();
			//this._bind('getFirstState', 'handleBookSelected', 'handleContinue');
			bind(this, "getFirstState", "handleBookSelected", "handleContinue");
			this.state = this.getFirstState();
		}
		 
		getFirstState() {
			return _.extend({
				bgClass: 'neutral',
				showContinue: false,
			}, data.selectGame());
		}
		
		handleBookSelected(title) {
			var isCorrect = this.state.checkAnswer(title);
			this.setState({
				bgClass: isCorrect ? 'pass' : 'fail',
				showContinue: isCorrect
			});
		}
		
		handleContinue() {
			this.setState(this.getFirstState());
		}
		
		handleAddGame() {
			routie('add');
		}
		
		render() {
			return (<div>
				<div className="row">
					<div className="col-md-4">
						<img src={this.state.author.imageUrl} className="authorimage col-md-3" />
					</div>
					<div className="col-md-7">
						{this.state.books.map( (book) => {
							return <Book onBookSelected={this.handleBookSelected} key={book} title={book} />;
						})}
					</div>
					<div className={"col-md-1 " + this.state.bgClass} />
				</div>
				{this.state.showContinue ? (
					<div className="row">
						<div className="col-md-12">
							<input onClick={this.handleContinue} type="button" className="btn btn-primary btn-lg pull-right" value="Continue" />
						</div>
					</div>) : <span/>
				}
				<div className="row">
					<div className="col-md-12">
						<input onClick={this.handleAddGame} type="button" className="btn " id="addGameButton" value="Add Game" />
					</div>
				</div>				
			</div>
			);
		}
	};

	// http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
	Quiz.propTypes = {
		data: React.PropTypes.array.isRequired
	};
	
	class Book extends BaseComponent{
		constructor() {
		  super();
		  this._bind('handleClick');
		}		
		handleClick() {
			this.props.onBookSelected(this.props.title);
		}
		render() {
			return <div onClick={this.handleClick} className="answer"><h4>{this.props.title}</h4></div>;
		}
	};
	
	Book.propTypes = {
		title: React.PropTypes.string.isRequired
	};
	
	routie({
		'': () => {
			ReactDOM.render(<Quiz data={data} />, document.getElementById('app'));
		},
		'add': () => {
			ReactDOM.render(<AddGameForm onGameFormSubmitted={handleAddFormSubmitted} />, document.getElementById('app'));
		}
	});
	
	function handleAddFormSubmitted(data) {
		var quizData =[{
			imageUrl: data.imageUrl,
			books: [data.answer1, data.answer2, data.answer3, data.answer4]
		}];
		
		quizData.selectGame = selectGame;
		console.log('handleAddFormSubmitted');
		console.log(quizData);
		
		ReactDOM.render(<Quiz data={quizData} />, document.getElementById('app'));
	}
	
	function getRefs(component) {
		var result = {};
		Object.keys(component.refs).forEach((refName) => {
			//result[refName] = component.refs[refName].getDomNode().value;
			result[refName] = ReactDOM.findDOMNode(component.refs[refName]).value;
				
			//http://davematthewsband.com/wp-content/uploads/2012/07/2002.jpg
			
		});

		return result;
	}
	
	
})();

