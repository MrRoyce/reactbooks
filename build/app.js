'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	'use strict';

	var data, selectGame;

	data = [{
		name: 'Mark Twain',
		imageUrl: 'images/authors/marktwain.jpg',
		books: ['The adventures of Huckleberry Finn']
	}, {
		name: 'Joseph Conrad',
		imageUrl: 'images/authors/josephconrad.PNG',
		books: ['Heart of Darkness']
	}, {
		name: 'J.K. Rowling',
		imageUrl: 'images/authors/jkrowling.jpg',
		imageSource: 'Wikimedia Commons',
		imageAttribution: 'Daniel Ogren',
		books: ['Harry Potter and the Sorcerers Stone']
	}, {
		name: 'Stephen King',
		imageUrl: 'images/authors/stephenking.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['The Shining', 'It']
	}, {
		name: 'Charles Dickens',
		imageUrl: 'images/authors/charlesdickens.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['The adventures of Huckleberry Finn']
	}, {
		name: 'William Shakespeare',
		imageUrl: 'images/authors/williamshakespeare.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
	}];

	selectGame = function () {
		var books, answer;

		books = _.shuffle(this.reduce(function (prev, curr) {
			return prev.concat(curr.books);
		}, [])).slice(0, 4);

		answer = books[_.random(books.length - 1)];

		return {
			books: books,
			author: _.find(this, function (author) {
				return author.books.some(function (title) {
					return title === answer;
				});
			}),
			checkAnswer: function checkAnswer(title) {
				return this.author.books.some(function (t) {
					return t === title;
				});
			}

		};
	};

	data.selectGame = selectGame;

	// Two  different ways of doing bind
	// One with Inheritance

	var BaseComponent = (function (_React$Component) {
		_inherits(BaseComponent, _React$Component);

		function BaseComponent() {
			_classCallCheck(this, BaseComponent);

			_get(Object.getPrototypeOf(BaseComponent.prototype), 'constructor', this).apply(this, arguments);
		}

		_createClass(BaseComponent, [{
			key: '_bind',
			value: function _bind() {
				var _this = this;

				for (var _len = arguments.length, methods = Array(_len), _key = 0; _key < _len; _key++) {
					methods[_key] = arguments[_key];
				}

				methods.forEach(function (method) {
					return _this[method] = _this[method].bind(_this);
				});
			}
		}]);

		return BaseComponent;
	})(React.Component);

	;

	// And one with a simple function
	function bind(obj) {
		for (var _len2 = arguments.length, methods = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			methods[_key2 - 1] = arguments[_key2];
		}

		methods.forEach(function (method) {
			return obj[method] = obj[method].bind(obj);
		});
	}

	var AddGameForm = (function (_React$Component2) {
		_inherits(AddGameForm, _React$Component2);

		function AddGameForm() {
			_classCallCheck(this, AddGameForm);

			_get(Object.getPrototypeOf(AddGameForm.prototype), 'constructor', this).call(this);
			bind(this, "handleSubmit");
		}

		_createClass(AddGameForm, [{
			key: 'handleSubmit',
			value: function handleSubmit() {
				this.props.onGameFormSubmitted(getRefs(this));
				return false;
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ className: 'row' },
						React.createElement(
							'div',
							{ className: 'col-md-12' },
							React.createElement(
								'h1',
								null,
								'Add Game Form'
							),
							React.createElement(
								'form',
								{ role: 'form', onSubmit: this.handleSubmit },
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement('input', { ref: 'imageUrl', type: 'text', className: 'form-control', placeholder: 'Image Url' })
								),
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement('input', { ref: 'answer1', type: 'text', className: 'form-control', placeholder: 'Answer 1' })
								),
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement('input', { ref: 'answer2', type: 'text', className: 'form-control', placeholder: 'Answer 2' })
								),
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement('input', { ref: 'answer3', type: 'text', className: 'form-control', placeholder: 'Answer 3' })
								),
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement('input', { ref: 'answer4', type: 'text', className: 'form-control', placeholder: 'Answer 4' })
								),
								React.createElement(
									'button',
									{ type: 'submit', className: 'btn btn-default' },
									'Submit'
								)
							)
						)
					)
				);
			}
		}]);

		return AddGameForm;
	})(React.Component);

	;

	AddGameForm.propTypes = {
		onGameFormSubmitted: React.PropTypes.func.isRequired
	};

	var Quiz = (function (_React$Component3) {
		_inherits(Quiz, _React$Component3);

		function Quiz() {
			_classCallCheck(this, Quiz);

			_get(Object.getPrototypeOf(Quiz.prototype), 'constructor', this).call(this);
			//this._bind('getFirstState', 'handleBookSelected', 'handleContinue');
			bind(this, "getFirstState", "handleBookSelected", "handleContinue");
			this.state = this.getFirstState();
		}

		_createClass(Quiz, [{
			key: 'getFirstState',
			value: function getFirstState() {
				return _.extend({
					bgClass: 'neutral',
					showContinue: false
				}, data.selectGame());
			}
		}, {
			key: 'handleBookSelected',
			value: function handleBookSelected(title) {
				var isCorrect = this.state.checkAnswer(title);
				this.setState({
					bgClass: isCorrect ? 'pass' : 'fail',
					showContinue: isCorrect
				});
			}
		}, {
			key: 'handleContinue',
			value: function handleContinue() {
				this.setState(this.getFirstState());
			}
		}, {
			key: 'handleAddGame',
			value: function handleAddGame() {
				routie('add');
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				return React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ className: 'row' },
						React.createElement(
							'div',
							{ className: 'col-md-4' },
							React.createElement('img', { src: this.state.author.imageUrl, className: 'authorimage col-md-3' })
						),
						React.createElement(
							'div',
							{ className: 'col-md-7' },
							this.state.books.map(function (book) {
								return React.createElement(Book, { onBookSelected: _this2.handleBookSelected, key: book, title: book });
							})
						),
						React.createElement('div', { className: "col-md-1 " + this.state.bgClass })
					),
					this.state.showContinue ? React.createElement(
						'div',
						{ className: 'row' },
						React.createElement(
							'div',
							{ className: 'col-md-12' },
							React.createElement('input', { onClick: this.handleContinue, type: 'button', className: 'btn btn-primary btn-lg pull-right', value: 'Continue' })
						)
					) : React.createElement('span', null),
					React.createElement(
						'div',
						{ className: 'row' },
						React.createElement(
							'div',
							{ className: 'col-md-12' },
							React.createElement('input', { onClick: this.handleAddGame, type: 'button', className: 'btn ', id: 'addGameButton', value: 'Add Game' })
						)
					)
				);
			}
		}]);

		return Quiz;
	})(React.Component);

	;

	// http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
	Quiz.propTypes = {
		data: React.PropTypes.array.isRequired
	};

	var Book = (function (_BaseComponent) {
		_inherits(Book, _BaseComponent);

		function Book() {
			_classCallCheck(this, Book);

			_get(Object.getPrototypeOf(Book.prototype), 'constructor', this).call(this);
			this._bind('handleClick');
		}

		_createClass(Book, [{
			key: 'handleClick',
			value: function handleClick() {
				this.props.onBookSelected(this.props.title);
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ onClick: this.handleClick, className: 'answer' },
					React.createElement(
						'h4',
						null,
						this.props.title
					)
				);
			}
		}]);

		return Book;
	})(BaseComponent);

	;

	Book.propTypes = {
		title: React.PropTypes.string.isRequired
	};

	routie({
		'': function _() {
			ReactDOM.render(React.createElement(Quiz, { data: data }), document.getElementById('app'));
		},
		'add': function add() {
			ReactDOM.render(React.createElement(AddGameForm, { onGameFormSubmitted: handleAddFormSubmitted }), document.getElementById('app'));
		}
	});

	function handleAddFormSubmitted(data) {
		var quizData = [{
			imageUrl: data.imageUrl,
			books: [data.answer1, data.answer2, data.answer3, data.answer4]
		}];

		quizData.selectGame = selectGame;
		console.log('handleAddFormSubmitted');
		console.log(quizData);

		ReactDOM.render(React.createElement(Quiz, { data: quizData }), document.getElementById('app'));
	}

	function getRefs(component) {
		var result = {};
		Object.keys(component.refs).forEach(function (refName) {
			//result[refName] = component.refs[refName].getDomNode().value;
			result[refName] = ReactDOM.findDOMNode(component.refs[refName]).value;

			//http://davematthewsband.com/wp-content/uploads/2012/07/2002.jpg
		});

		return result;
	}
})();