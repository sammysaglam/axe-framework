webpackJsonp([0],{

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolbarIcon = function (_React$Component) {
	_inherits(ToolbarIcon, _React$Component);

	function ToolbarIcon(props) {
		_classCallCheck(this, ToolbarIcon);

		var _this = _possibleConstructorReturn(this, (ToolbarIcon.__proto__ || Object.getPrototypeOf(ToolbarIcon)).call(this, props));

		_this.onMouseDown = _this.onMouseDown.bind(_this);
		return _this;
	}

	_createClass(ToolbarIcon, [{
		key: 'onMouseDown',
		value: function onMouseDown(e) {
			this.props.onToggle(this.props.id_, this.props.type);
			e.preventDefault();
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'li',
				{ className: this.props.active ? 'active' : '', onMouseDown: this.onMouseDown },
				_react2.default.createElement(
					'span',
					{ className: this.props.id_.toLowerCase() },
					this.props.label
				)
			);
		}
	}]);

	return ToolbarIcon;
}(_react2.default.Component);

exports.default = ToolbarIcon;

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(23);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _editableContent = __webpack_require__(237);

var _editableContent2 = _interopRequireDefault(_editableContent);

var _jquery = __webpack_require__(59);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).ready(function () {

	(0, _jquery2.default)(".axe-editable_content.allow_edit:not(.js_added)").each(function (index, element) {
		(0, _jquery2.default)(element).addClass('js_added');

		var id = (0, _jquery2.default)(element).data('editable-content-id');
		var rawContent = function () {
			try {
				return JSON.parse((0, _jquery2.default)(element).find(".raw-content").html());
			} catch (e) {
				return false;
			}
		}();

		var ajaxOps = void 0;
		var ajaxSaveFn = function ajaxSaveFn(htmlContent, rawContent) {
			if (ajaxOps) ajaxOps.abort();
			ajaxOps = _jquery2.default.ajax({
				url: '/save-content/' + id,
				type: 'POST',
				data: {
					htmlContent: htmlContent,
					rawContent: rawContent
				}
			});
		};

		_reactDom2.default.render(_react2.default.createElement(_editableContent2.default, { rawContent: rawContent, saveFn: ajaxSaveFn }), (0, _jquery2.default)(element).get(0));
	});
});

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(238);

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _jquery = __webpack_require__(59);

var _jquery2 = _interopRequireDefault(_jquery);

var _draftJs = __webpack_require__(34);

var _draftConvert = __webpack_require__(91);

var _Link = __webpack_require__(240);

var _Link2 = _interopRequireDefault(_Link);

var _Image = __webpack_require__(239);

var _Image2 = _interopRequireDefault(_Image);

var _LinkToolbar = __webpack_require__(243);

var _LinkToolbar2 = _interopRequireDefault(_LinkToolbar);

var _InlineToolbar = __webpack_require__(242);

var _InlineToolbar2 = _interopRequireDefault(_InlineToolbar);

var _SideToolbar = __webpack_require__(244);

var _SideToolbar2 = _interopRequireDefault(_SideToolbar);

var _entry = __webpack_require__(245);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditableContent = function (_React$Component) {
	_inherits(EditableContent, _React$Component);

	function EditableContent(props) {
		_classCallCheck(this, EditableContent);

		var _this = _possibleConstructorReturn(this, (EditableContent.__proto__ || Object.getPrototypeOf(EditableContent)).call(this, props));

		_this.sideToolbarTimeout = null;
		_this.linkToolbarTimeout = null;

		var decorators = new _draftJs.CompositeDecorator([{
			strategy: _Link2.default.findLinkEntities,
			component: function component(props) {
				return _react2.default.createElement(_Link2.default, _extends({
					showLinkToolbar: _this.showLinkToolbar,
					hideLinkToolbar: _this.hideLinkToolbar
				}, props));
			}
		}]);

		var editorState = void 0;
		var _this$props$rawConten = _this.props.rawContent,
		    rawContent = _this$props$rawConten === undefined ? {} : _this$props$rawConten;

		if (!rawContent.blocks) {
			editorState = _draftJs.EditorState.createEmpty(decorators);
		} else {

			// add empty entity map if doesnt exist
			if (!rawContent.entityMap) rawContent.entityMap = {};

			// process blocks
			rawContent.blocks.forEach(function (block, index) {

				// convert HTML special chars to normal chars - e.g. '&lt;' ==> '<'
				var tempElement = document.createElement("textarea");
				tempElement.innerHTML = block.text;
				block.text = tempElement.value;

				// make sure depth properties are integers, or else Draft hangs
				block.depth = parseInt(block.depth);
			});

			// create editorState
			editorState = _draftJs.EditorState.createWithContent((0, _draftJs.convertFromRaw)(rawContent), decorators);
		}

		_this.state = {
			editorState: editorState,
			inlineToolbar: { show: false },
			linkToolbar: { show: false },
			sideToolbar: { isExpanded: false }
		};

		_this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
		_this.onTab = _this.onTab.bind(_this);
		_this.onChange = _this.onChange.bind(_this);
		_this.toggleStyle = _this.toggleStyle.bind(_this);
		_this.toggleLink = _this.toggleLink.bind(_this);
		_this.toggleBlockType = _this.toggleBlockType.bind(_this);
		_this.addImage = _this.addImage.bind(_this);
		_this.removeImage = _this.removeImage.bind(_this);
		_this.removeLink = _this.removeLink.bind(_this);
		_this.updateSelection = _this.updateSelection.bind(_this);
		_this.contentStateToHTML = _this.contentStateToHTML.bind(_this);

		_this.expandSideToolbar = _this.expandSideToolbar.bind(_this);
		_this.collapseSideToolbar = _this.collapseSideToolbar.bind(_this);
		_this.showLinkToolbar = _this.showLinkToolbar.bind(_this);
		_this.hideLinkToolbar = _this.hideLinkToolbar.bind(_this);

		_this.handlePastedText = _this.handlePastedText.bind(_this);
		_this.blockRenderer = _this.blockRenderer.bind(_this);
		_this.mediaBlockRenderer = _this.mediaBlockRenderer.bind(_this);
		return _this;
	}

	_createClass(EditableContent, [{
		key: 'onChange',
		value: function onChange(editorState) {

			// is selection is not collapsed, show the inlineToolbar for formatting the selection
			var selection = _entry.utils.selection.getSelection();
			if (!selection.isCollapsed && !editorState.getSelection().isCollapsed() && selection.range) {

				var offset = _entry.utils.selection.getSelectionCoords(this.refs.container, selection.range);

				this.setState({
					inlineToolbar: {
						show: true,
						position: {
							top: offset.top,
							left: offset.left
						}
					}
				});
			} else {
				this.setState({ inlineToolbar: { show: false } });
			}

			var newContentState = editorState.getCurrentContent();
			var newHtmlContent = this.contentStateToHTML(newContentState);
			var oldHtmlContent = this.state.htmlContent;
			var rawContent = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());

			this.setState({
				editorState: editorState,
				htmlContent: newHtmlContent
			});

			if (this.props.saveFn && newHtmlContent !== oldHtmlContent) {
				this.props.saveFn(newHtmlContent, rawContent);
			}

			setTimeout(this.updateSelection, 0);
		}
	}, {
		key: 'contentStateToHTML',
		value: function contentStateToHTML(contentState) {
			var html = (0, _draftConvert.convertToHTML)({
				styleToHTML: function styleToHTML(style) {
					if (style === 'BOLD') {
						return _react2.default.createElement('strong', null);
					} else if (style === 'UNDERLINE') {
						return _react2.default.createElement('span', { style: { textDecoration: 'underline' } });
					} else if (style === 'STRIKETHROUGH') {
						return _react2.default.createElement('span', { style: { textDecoration: 'line-through' } });
					}
				},
				blockToHTML: function blockToHTML(block) {
					if (block.type === 'code-block') {
						return {
							start: '<code class="code-line">',
							end: '</code>',
							nestStart: '<pre>',
							nestEnd: '</pre>'
						};
					} else if (block.type === 'atomic') {
						return _react2.default.createElement('div', null);
					} else if (block.type === 'unstyled') {
						return {
							start: '<div class="paragraph">',
							end: '</div>',
							empty: '<div class="paragraph">&nbsp;</div>'
						};
					}
				},
				entityToHTML: function entityToHTML(entity, originalText) {

					if (entity.type === 'LINK') {
						return '<a href="' + entity.data.url + '" target="' + entity.data.target + '">' + originalText + '</a>';
					} else if (entity.type === 'IMAGE') {

						var alignStyle = void 0;
						var floatStyle = void 0;
						switch (entity.data.align) {
							case 'left':
								alignStyle = '';
								floatStyle = 'float:left ;';
								break;

							case 'right':
								alignStyle = '';
								floatStyle = 'float:right ;';
								break;

							case 'center':
								alignStyle = 'text-align:center ;';
								floatStyle = 'float:none ;';
								break;
						}

						return '<div style="' + alignStyle + '"><img src=\'' + entity.data.src + '\' style=\'' + floatStyle + '\' /></div>';
					}

					return originalText;
				}
			})(contentState);

			return html;
		}
	}, {
		key: 'updateSelection',
		value: function updateSelection() {
			var selectionRange = _entry.utils.selection.getSelection().range;
			var selectedBlock = void 0;
			if (selectionRange) {
				selectedBlock = _entry.utils.selection.getSelectedBlockElement(selectionRange);
			}
			this.setState({
				selectedBlock: selectedBlock,
				selectionRange: selectionRange
			});
		}
	}, {
		key: 'handleKeyCommand',
		value: function handleKeyCommand(command) {
			var newState = _draftJs.RichUtils.handleKeyCommand(this.state.editorState, command);
			if (newState) {
				this.onChange(newState);
				return 'handled';
			}

			return 'not-handled';
		}
	}, {
		key: 'onTab',
		value: function onTab(e) {
			var editorState = this.state.editorState;

			var contentState = editorState.getCurrentContent();
			var selectionState = editorState.getSelection();
			var selectionKey = selectionState.getStartKey();
			var currentBlock = contentState.getBlockForKey(selectionKey);
			var blockType = currentBlock.getType();

			if (blockType === 'ordered-list-item' || blockType === 'unordered-list-item') {
				var maxDepth = 9;
				this.onChange(_draftJs.RichUtils.onTab(e, this.state.editorState, maxDepth));
			} else {

				var rangeRemoved = _draftJs.Modifier.removeRange(contentState, selectionState, 'backward');
				var rangeRemovedState = _draftJs.EditorState.push(editorState, rangeRemoved, 'selection-removed');

				var tabAdded = _draftJs.Modifier.insertText(rangeRemovedState.getCurrentContent(), rangeRemovedState.getSelection(), "   ");

				var newState = _draftJs.EditorState.push(editorState, tabAdded, 'tab-added');
				this.onChange(newState);

				e.preventDefault();
			}
		}
	}, {
		key: 'toggleStyle',
		value: function toggleStyle(id) {
			var newState = _draftJs.RichUtils.toggleInlineStyle(this.state.editorState, id);
			this.onChange(newState);
		}
	}, {
		key: 'toggleLink',
		value: function toggleLink(url) {
			var editorState = this.state.editorState;

			var contentState = editorState.getCurrentContent();
			var contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: url, target: '_self' });
			var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
			var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentStateWithEntity });
			var newState = _draftJs.RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);
			this.onChange(newState);
		}
	}, {
		key: 'removeLink',
		value: function removeLink(entityKey) {
			var _this2 = this;

			var editorState = this.state.editorState;


			var entityRange = _entry.utils.selection.getEntityRange(editorState, entityKey);
			var selection = editorState.getSelection();
			var entitySelection = selection.merge({
				anchorKey: entityRange.blockKey,
				anchorOffset: entityRange.start,
				focusKey: entityRange.blockKey,
				focusOffset: entityRange.end
			});
			var newState = _draftJs.RichUtils.toggleLink(editorState, entitySelection, null);
			this.onChange(newState);
			setTimeout(function () {
				_this2.refs.editor.focus();
			}, 0);
		}
	}, {
		key: 'addImage',
		value: function addImage(url) {
			var editorState = this.state.editorState;

			var contentState = editorState.getCurrentContent();
			var contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url, align: 'left' });
			var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
			var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentStateWithEntity });
			var newState = _draftJs.AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
			this.onChange(newState);
		}
	}, {
		key: 'removeImage',
		value: function removeImage(entityKey) {
			var _this3 = this;

			var editorState = this.state.editorState;


			var entityRange = _entry.utils.selection.getEntityRange(editorState, entityKey);
			var selection = editorState.getSelection();
			var entitySelection = selection.merge({
				anchorKey: entityRange.blockKey,
				anchorOffset: entityRange.start,
				focusKey: entityRange.blockKey,
				focusOffset: entityRange.end
			});

			var withoutImage = _draftJs.Modifier.removeRange(editorState.getCurrentContent(), entitySelection, 'backward');
			var resetBlock = _draftJs.Modifier.setBlockType(withoutImage, withoutImage.getSelectionAfter(), 'unstyled');
			var newState = _draftJs.EditorState.push(editorState, resetBlock, 'remove-range');

			this.onChange(_draftJs.EditorState.forceSelection(newState, resetBlock.getSelectionAfter()));
			setTimeout(function () {
				_this3.refs.editor.focus();
			}, 0);
		}
	}, {
		key: 'toggleBlockType',
		value: function toggleBlockType(id) {
			var newState = _draftJs.RichUtils.toggleBlockType(this.state.editorState, id);
			this.onChange(newState);
		}
	}, {
		key: 'expandSideToolbar',
		value: function expandSideToolbar() {
			this.setState({ sideToolbar: { isExpanded: true } });
			clearTimeout(this.sideToolbarTimeout);
		}
	}, {
		key: 'collapseSideToolbar',
		value: function collapseSideToolbar() {
			var _this4 = this;

			this.sideToolbarTimeout = setTimeout(function () {
				_this4.setState({ sideToolbar: { isExpanded: false } });
			}, 200);
		}
	}, {
		key: 'showLinkToolbar',
		value: function showLinkToolbar(linkPosition, linkComponent) {

			if (linkComponent) {

				var containerPosition = this.refs.container.getBoundingClientRect();
				var toolbarPosition = {
					top: linkPosition.top - containerPosition.top - 45,
					left: linkPosition.left - containerPosition.left
				};

				this.setState({
					linkToolbar: {
						show: true,
						position: toolbarPosition,
						linkComponent: linkComponent
					}
				});
			} else {

				var linkToolbarSettings = this.state.linkToolbar;
				linkToolbarSettings.show = true;
				this.setState({
					linkToolbar: linkToolbarSettings
				});
			}

			clearTimeout(this.linkToolbarTimeout);
		}
	}, {
		key: 'hideLinkToolbar',
		value: function hideLinkToolbar() {
			var _this5 = this;

			var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			this.linkToolbarTimeout = setTimeout(function () {
				_this5.setState({ linkToolbar: { show: false } });
			}, timeout ? 200 : 0);
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    editorState = _state.editorState,
			    selectedBlock = _state.selectedBlock;

			var editor = this.refs.container;

			// get selectedBlock, and make sure it is the child of the editor
			var sideToolbarOffsetTop = 0;
			if (selectedBlock && function (parent, child) {

				var node = child.parentNode;
				while (node != null) {
					if (node == parent) {
						return true;
					}
					node = node.parentNode;
				}
				return false;
			}(editor, selectedBlock)) {

				// calculate sideToolbar coordinates
				var editorBounds = editor.getBoundingClientRect();
				var blockBounds = selectedBlock.getBoundingClientRect();

				sideToolbarOffsetTop = blockBounds.top - editorBounds.top - (blockBounds.top - blockBounds.bottom) / 2 - 16;
			}

			return _react2.default.createElement(
				'div',
				{ ref: 'container' },
				_react2.default.createElement(_InlineToolbar2.default, {
					editorState: editorState,
					showToolbar: this.state.inlineToolbar.show && !this.state.sideToolbar.isExpanded,
					toggleStyle: this.toggleStyle,
					toggleLink: this.toggleLink,
					position: this.state.inlineToolbar.position
				}),
				selectedBlock ? _react2.default.createElement(_SideToolbar2.default, {
					editorState: editorState,
					position: { top: sideToolbarOffsetTop },
					toggleBlockType: this.toggleBlockType,
					addImage: this.addImage,
					expandSideToolbar: this.expandSideToolbar,
					collapseSideToolbar: this.collapseSideToolbar,
					isExpanded: this.state.sideToolbar.isExpanded
				}) : null,
				this.state.linkToolbar.show && !this.state.sideToolbar.isExpanded && !this.state.inlineToolbar.show ? _react2.default.createElement(_LinkToolbar2.default, {
					position: this.state.linkToolbar.position,
					linkComponent: this.state.linkToolbar.linkComponent,
					removeLink: this.removeLink,
					showLinkToolbar: this.showLinkToolbar,
					hideLinkToolbar: this.hideLinkToolbar
				}) : null,
				_react2.default.createElement(_draftJs.Editor, {
					editorState: this.state.editorState,
					spellCheck: true,
					blockRendererFn: this.blockRenderer,
					blockStyleFn: this.myBlockStyleFn,
					handlePastedText: this.handlePastedText,
					onChange: this.onChange,
					onTab: this.onTab,
					handleKeyCommand: this.handleKeyCommand,
					ref: 'editor',
					placeholder: 'Enter some text...'
				})
			);
		}
	}, {
		key: 'handlePastedText',
		value: function handlePastedText(text, html) {

			// build html into DOM elements
			var editorState = this.state.editorState;

			var domObject = (0, _jquery2.default)(html);

			var newHtml = void 0;

			// check if code is being pasted
			if ((0, _jquery2.default)(domObject).eq(1).prop('tagName') && (0, _jquery2.default)(domObject).eq(1).prop('tagName').toLowerCase() === 'pre') {

				// retrieve pasted HTML and convert all line breaks to <pre> tags
				newHtml = domObject.eq(1).html();
				newHtml = "<pre>" + newHtml.split("<br>").join("</pre><pre>") + "</pre>";
			} else if (domObject.eq(2).prop('tagName') && domObject.eq(2).prop('tagName').toLowerCase() === 'pre') {

				// loop through all code lines, and convert to simple text
				newHtml = '';
				domObject.eq(2).find("> pre").each(function (index, element) {
					newHtml += '<pre>' + (0, _jquery2.default)(element).text() + '</pre>';
				});

				// if the above didnt work, try the following
				if (!newHtml) {
					newHtml = domObject.eq(2).html();
					newHtml = newHtml.split("\n").join("</code><code>");
					newHtml = newHtml.replace(/<code/g, '<pre').replace(/<\/code>/g, '<\/pre>');
				}
			} else if (domObject.eq(2).prop('tagName') && domObject.eq(2).prop('tagName').toLowerCase() === 'code') {

				// retrieve pasted HTML and convert all line breaks to <pre> tags
				newHtml = domObject.eq(2).html();
				newHtml = "<pre>" + newHtml.split("<br>").join("</pre><pre>") + "</pre>";
				newHtml = newHtml.replace(/<code/g, '<pre').replace(/<\/code>/g, '<\/pre>');
			} else if (domObject.eq(2).find("> .phpcode > code").length === 1) {

				// retrieve pasted HTML and convert all line breaks to <pre> tags
				newHtml = domObject.eq(2).find("> .phpcode > code").html();
				newHtml = "<pre>" + newHtml.split("<br>").join("</pre><pre>") + "</pre>";
				newHtml = newHtml.split("\n").join("</pre><pre>");
				newHtml = newHtml.replace(/<code/g, '<pre').replace(/<\/code>/g, '<\/pre>');
			}

			// if a new HTML is defined, override default paste behaviour
			if (newHtml) {

				// add empty block before code - or else, for some unknown reason, Draft tends to hang if not
				newHtml = '<div>&nbsp;</div>' + newHtml;

				// keep empty code lines
				newHtml = newHtml.replace(/<pre><\/pre>/g, '<pre>&nbsp; </pre>');

				// create blocks from modified HTML
				var blocksFromHTML = (0, _draftJs.convertFromHTML)(newHtml);
				var pastedDataState = _draftJs.ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
				var blockMap = pastedDataState.getBlockMap();

				// insert new blocks into current selection
				var newState = _draftJs.Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), blockMap);
				this.onChange(_draftJs.EditorState.push(editorState, newState, 'insert-fragment'));

				// return true, to let Draft know we have handled the paste event
				return true;
			}
		}
	}, {
		key: 'blockRenderer',
		value: function blockRenderer(block) {

			if (block.getType() === 'atomic') {
				return {
					component: this.mediaBlockRenderer,
					editable: false
				};
			}

			return null;
		}
	}, {
		key: 'myBlockStyleFn',
		value: function myBlockStyleFn(contentBlock) {
			var type = contentBlock.getType();

			if (type === 'code-block') {
				return 'code-line';
			} else if (type === 'unstyled') {
				return 'paragraph';
			}
		}
	}, {
		key: 'mediaBlockRenderer',
		value: function mediaBlockRenderer(props) {
			var entityKey = props.block.getEntityAt(0);
			var entity = props.contentState.getEntity(entityKey);
			var entityData = entity.getData();
			var entityType = entity.getType();

			var media = void 0;
			if (entityType === 'IMAGE') {
				media = _react2.default.createElement(_Image2.default, { src: entityData.src, align: entityData.align, entityKey: entityKey, contentState: props.contentState, removeImage: this.removeImage });
			}

			return media;
		}
	}]);

	return EditableContent;
}(_react2.default.Component);

exports.default = EditableContent;

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _ImageToolbar = __webpack_require__(241);

var _ImageToolbar2 = _interopRequireDefault(_ImageToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_React$Component) {
	_inherits(Image, _React$Component);

	function Image(props) {
		_classCallCheck(this, Image);

		var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

		_this.state = { align: _this.props.align ? _this.props.align : 'left' };

		_this.alignLeft = _this.alignLeft.bind(_this);
		_this.alignCenter = _this.alignCenter.bind(_this);
		_this.alignRight = _this.alignRight.bind(_this);
		_this.scaleToOriginalSize = _this.scaleToOriginalSize.bind(_this);
		_this.scaleOut = _this.scaleOut.bind(_this);
		_this.scaleIn = _this.scaleIn.bind(_this);
		_this.removeImage = _this.removeImage.bind(_this);

		_this.onImageLoaded = _this.onImageLoaded.bind(_this);
		return _this;
	}

	_createClass(Image, [{
		key: 'alignLeft',
		value: function alignLeft() {
			this.props.contentState.mergeEntityData(this.props.entityKey, { align: 'left' });
			this.setState({
				align: 'left'
			});
		}
	}, {
		key: 'alignCenter',
		value: function alignCenter() {
			this.props.contentState.mergeEntityData(this.props.entityKey, { align: 'center' });
			this.setState({
				align: 'center'
			});
		}
	}, {
		key: 'alignRight',
		value: function alignRight() {
			this.props.contentState.mergeEntityData(this.props.entityKey, { align: 'right' });
			this.setState({
				align: 'right'
			});
		}
	}, {
		key: 'scaleToOriginalSize',
		value: function scaleToOriginalSize() {
			if (this.state.originalWidth) {
				this.setState({
					imageWidth: this.state.originalWidth
				});
			}
		}
	}, {
		key: 'scaleOut',
		value: function scaleOut() {
			if (this.state.originalWidth) {
				this.setState({
					imageWidth: this.state.imageWidth + 50
				});
			}
		}
	}, {
		key: 'scaleIn',
		value: function scaleIn() {
			if (this.state.originalWidth) {
				this.setState({
					imageWidth: this.state.imageWidth - 50
				});
			}
		}
	}, {
		key: 'removeImage',
		value: function removeImage() {
			if (confirm('Delete image?')) {
				this.props.removeImage(this.props.entityKey);
			}
		}
	}, {
		key: 'onMouseDown',
		value: function onMouseDown(e) {
			e.preventDefault();
		}
	}, {
		key: 'onKeyPress',
		value: function onKeyPress(e) {
			e.preventDefault();
		}
	}, {
		key: 'onImageLoaded',
		value: function onImageLoaded() {
			this.setState({
				originalWidth: this.refs.image.width,
				imageWidth: this.refs.image.width
			});
		}
	}, {
		key: 'render',
		value: function render() {

			var alignStyle = void 0;
			switch (this.state.align) {
				case 'left':
					alignStyle = {
						float: 'left'
					};
					break;

				case 'right':
					alignStyle = {
						float: 'right'
					};
					break;

				case 'center':
					alignStyle = {
						float: 'none',
						textAlign: 'center',
						width: '100%'
					};
					break;
			}

			var imageStyle = void 0;
			if (this.state.originalWidth) {
				imageStyle = {
					width: this.state.imageWidth,
					zIndex: -1
				};
			} else {
				imageStyle = {
					zIndex: -1
				};
			}

			return _react2.default.createElement(
				'div',
				{ onMouseDown: this.onMouseDown, className: 'image-entity align-' + this.state.align, style: alignStyle },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement('img', { onLoad: this.onImageLoaded, ref: 'image', src: this.props.src, style: imageStyle }),
						_react2.default.createElement(_ImageToolbar2.default, {
							scaleToOriginalSize: this.scaleToOriginalSize,
							scaleIn: this.scaleIn,
							scaleOut: this.scaleOut,
							alignLeft: this.alignLeft,
							alignCenter: this.alignCenter,
							alignRight: this.alignRight,
							removeImage: this.removeImage
						})
					)
				)
			);
		}
	}]);

	return Image;
}(_react2.default.Component);

exports.default = Image;
;

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function (_React$Component) {
	_inherits(Link, _React$Component);

	function Link(props) {
		_classCallCheck(this, Link);

		var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, props));

		_this.state = Object.assign(_this.props.contentState.getEntity(_this.props.entityKey).getData());

		_this.onMouseOver = _this.onMouseOver.bind(_this);
		_this.onMouseLeave = _this.onMouseLeave.bind(_this);
		_this.onUrlChange = _this.onUrlChange.bind(_this);
		_this.onNewWindowOptionChange = _this.onNewWindowOptionChange.bind(_this);
		return _this;
	}

	_createClass(Link, [{
		key: 'onMouseOver',
		value: function onMouseOver() {
			var linkPosition = this.refs.link.getBoundingClientRect();
			this.props.showLinkToolbar(linkPosition, this);
		}
	}, {
		key: 'onMouseLeave',
		value: function onMouseLeave() {
			this.props.hideLinkToolbar();
		}
	}, {
		key: 'onUrlChange',
		value: function onUrlChange(newUrl) {
			this.props.contentState.mergeEntityData(this.props.entityKey, { url: newUrl });
			this.setState({ url: newUrl });
		}
	}, {
		key: 'onNewWindowOptionChange',
		value: function onNewWindowOptionChange(newVal) {
			this.props.contentState.mergeEntityData(this.props.entityKey, { target: newVal });
			this.setState({ target: newVal });
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'a',
				{ ref: 'link', href: this.state.url, onMouseOver: this.onMouseOver, onMouseLeave: this.onMouseLeave, target: this.state.target },
				this.props.children
			);
		}
	}], [{
		key: 'findLinkEntities',
		value: function findLinkEntities(contentBlock, callback, contentState) {
			contentBlock.findEntityRanges(function (character) {
				var entityKey = character.getEntity();
				return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
			}, callback);
		}
	}]);

	return Link;
}(_react2.default.Component);

exports.default = Link;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageToolbar = function ImageToolbar(props) {
	return _react2.default.createElement(
		'div',
		{ className: 'settings-menu' },
		_react2.default.createElement(
			'div',
			{ onClick: props.scaleToOriginalSize },
			_react2.default.createElement('img', { src: __webpack_require__(361) })
		),
		_react2.default.createElement(
			'div',
			{ onClick: props.scaleIn },
			_react2.default.createElement('img', { src: __webpack_require__(362) })
		),
		_react2.default.createElement(
			'div',
			{ onClick: props.scaleOut },
			_react2.default.createElement('img', { src: __webpack_require__(363) })
		),
		_react2.default.createElement(
			'div',
			{ onClick: props.alignLeft },
			_react2.default.createElement('img', { src: __webpack_require__(358) })
		),
		_react2.default.createElement(
			'div',
			{ onClick: props.alignCenter },
			_react2.default.createElement('img', { src: __webpack_require__(357) })
		),
		_react2.default.createElement(
			'div',
			{ onClick: props.alignRight },
			_react2.default.createElement('img', { src: __webpack_require__(359) })
		),
		_react2.default.createElement(
			'div',
			{ onClick: props.removeImage },
			'X'
		)
	);
};

exports.default = ImageToolbar;

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _ToolbarIcon = __webpack_require__(116);

var _ToolbarIcon2 = _interopRequireDefault(_ToolbarIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INLINE_STYLE = 0;
var LINK = 1;

var TOOLBAR_ITEMS = [{ id_: 'BOLD', label: 'B', type: INLINE_STYLE }, { id_: 'ITALIC', label: 'I', type: INLINE_STYLE }, { id_: 'UNDERLINE', label: 'U', type: INLINE_STYLE }, { id_: 'STRIKETHROUGH', label: 'abc', type: INLINE_STYLE }, { id_: 'LINK', label: 'url', type: LINK }];

var InlineToolbar = function (_React$Component) {
	_inherits(InlineToolbar, _React$Component);

	function InlineToolbar(props) {
		_classCallCheck(this, InlineToolbar);

		var _this = _possibleConstructorReturn(this, (InlineToolbar.__proto__ || Object.getPrototypeOf(InlineToolbar)).call(this, props));

		_this.onToggle = _this.onToggle.bind(_this);
		return _this;
	}

	_createClass(InlineToolbar, [{
		key: 'onToggle',
		value: function onToggle(id, type) {
			if (type === INLINE_STYLE) {
				this.props.toggleStyle(id);
			} else if (type === LINK) {
				var url = prompt('Enter URL', 'http://www.');
				if (url !== null) {
					this.props.toggleLink(url);
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var editorState = this.props.editorState;

			var currentStyle = editorState.getCurrentInlineStyle();

			var selectionState = editorState.getSelection();
			var selectionKey = selectionState.getStartKey();
			var contentState = editorState.getCurrentContent();

			// get the block where the cursor is
			var block = contentState.getBlockForKey(selectionKey);

			// get the entity where the cursor is
			var entityKey = block.getEntityAt(selectionState.getStartOffset());

			var entityType = '';
			if (entityKey) {
				var entityInstance = contentState.getEntity(entityKey);
				entityType = entityInstance.getType();
			}

			var _props$position = this.props.position,
			    position = _props$position === undefined ? { top: 0, left: 0 } : _props$position;


			var styleExp = {
				top: position.top,
				left: position.left,
				transform: 'scale(' + (this.props.showToolbar ? '1' : '0') + ')'
			};

			return _react2.default.createElement(
				'div',
				{ className: 'inline-toolbar toolbar', style: styleExp },
				this.props.showToolbar ? _react2.default.createElement(
					'ul',
					{ className: 'toolbar-icons' },
					TOOLBAR_ITEMS.map(function (item) {
						return _react2.default.createElement(_ToolbarIcon2.default, {
							key: item.id_,
							id_: item.id_,
							type: item.type,
							label: item.label,
							active: currentStyle.has(item.id_) || entityType === item.id_,
							onToggle: _this2.onToggle
						});
					})
				) : null
			);
		}
	}]);

	return InlineToolbar;
}(_react2.default.Component);

exports.default = InlineToolbar;

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkToolbar = function (_React$Component) {
	_inherits(LinkToolbar, _React$Component);

	function LinkToolbar(props) {
		_classCallCheck(this, LinkToolbar);

		var _this = _possibleConstructorReturn(this, (LinkToolbar.__proto__ || Object.getPrototypeOf(LinkToolbar)).call(this, props));

		_this.onMouseOver = _this.onMouseOver.bind(_this);
		_this.onMouseLeave = _this.onMouseLeave.bind(_this);
		_this.onUrlChange = _this.onUrlChange.bind(_this);
		_this.onNewWindowOptionChange = _this.onNewWindowOptionChange.bind(_this);
		_this.onDeleteLink = _this.onDeleteLink.bind(_this);
		return _this;
	}

	_createClass(LinkToolbar, [{
		key: 'onMouseOver',
		value: function onMouseOver() {
			this.props.showLinkToolbar();
		}
	}, {
		key: 'onMouseLeave',
		value: function onMouseLeave() {
			this.props.hideLinkToolbar();
		}
	}, {
		key: 'onDeleteLink',
		value: function onDeleteLink() {
			this.props.removeLink(this.props.linkComponent.props.entityKey);
			this.props.hideLinkToolbar(false);
		}
	}, {
		key: 'onUrlChange',
		value: function onUrlChange(e) {
			var newVal = e.target.value;
			this.forceUpdate();
			this.props.linkComponent.onUrlChange(newVal);
			this.forceUpdate();
		}
	}, {
		key: 'onNewWindowOptionChange',
		value: function onNewWindowOptionChange(e) {
			var newVal = e.target.checked ? '_blank' : '_self';
			this.forceUpdate();
			this.props.linkComponent.onNewWindowOptionChange(newVal);
			this.forceUpdate();
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{
					className: 'toolbar link-toolbar',
					style: this.props.position,
					onMouseOver: this.onMouseOver,
					onMouseLeave: this.onMouseLeave
				},
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement('input', { type: 'text', value: this.props.linkComponent.state.url, onChange: this.onUrlChange, onClick: this.onInputClick }),
					_react2.default.createElement(
						'button',
						{ onClick: this.onDeleteLink },
						'Remove'
					),
					_react2.default.createElement(
						'div',
						{ className: 'option' },
						_react2.default.createElement('input', { type: 'checkbox', checked: this.props.linkComponent.state.target === '_blank', onChange: this.onNewWindowOptionChange, onClick: this.onInputClick }),
						_react2.default.createElement(
							'span',
							null,
							'Open in new window'
						)
					)
				)
			);
		}
	}]);

	return LinkToolbar;
}(_react2.default.Component);

exports.default = LinkToolbar;

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _ToolbarIcon = __webpack_require__(116);

var _ToolbarIcon2 = _interopRequireDefault(_ToolbarIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideToolbar = function (_React$Component) {
	_inherits(SideToolbar, _React$Component);

	function SideToolbar(props) {
		_classCallCheck(this, SideToolbar);

		var _this = _possibleConstructorReturn(this, (SideToolbar.__proto__ || Object.getPrototypeOf(SideToolbar)).call(this, props));

		_this.onMouseOver = _this.onMouseOver.bind(_this);
		_this.onMouseLeave = _this.onMouseLeave.bind(_this);
		_this.onMouseDown = _this.onMouseDown.bind(_this);
		_this.promptForImage = _this.promptForImage.bind(_this);
		return _this;
	}

	_createClass(SideToolbar, [{
		key: 'onMouseOver',
		value: function onMouseOver() {
			this.props.expandSideToolbar();
		}
	}, {
		key: 'onMouseLeave',
		value: function onMouseLeave() {
			this.props.collapseSideToolbar();
		}
	}, {
		key: 'onMouseDown',
		value: function onMouseDown(e) {
			e.preventDefault();
		}
	}, {
		key: 'showUnderConstruction',
		value: function showUnderConstruction() {
			alert('Still under development!');
		}
	}, {
		key: 'promptForImage',
		value: function promptForImage(e) {
			var url = prompt('Enter URL', 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png');
			if (url !== null) this.props.addImage(url);
			e.preventDefault();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    editorState = _props.editorState,
			    isExpanded = _props.isExpanded;


			return _react2.default.createElement(
				'div',
				{ className: 'side-toolbar', style: { top: this.props.position.top } },
				_react2.default.createElement(
					'div',
					{ className: 'media-buttons' + (isExpanded ? ' expanded' : ''), onMouseDown: this.onMouseDown, onMouseOver: this.onMouseOver, onMouseLeave: this.onMouseLeave },
					_react2.default.createElement(
						'span',
						{ className: 'add-image', onClick: this.promptForImage },
						_react2.default.createElement('img', { src: __webpack_require__(355) })
					),
					_react2.default.createElement(
						'span',
						{ className: 'add-video', onClick: this.showUnderConstruction },
						_react2.default.createElement('img', { src: __webpack_require__(356) })
					),
					_react2.default.createElement(
						'span',
						{ className: 'add-audio', onClick: this.showUnderConstruction },
						_react2.default.createElement('img', { src: __webpack_require__(354) })
					)
				),
				_react2.default.createElement(
					'span',
					{ className: 'expand-icon', onMouseOver: this.onMouseOver, onMouseLeave: this.onMouseLeave, onMouseDown: this.onMouseDown },
					'\u2261'
				),
				isExpanded ? _react2.default.createElement(BlockSettings, {
					editorState: editorState,
					toggleBlockType: this.props.toggleBlockType,
					expandSideToolbar: this.onMouseOver,
					collapseSideToolbar: this.onMouseLeave,
					sideToolbarState: this.state
				}) : null
			);
		}
	}]);

	return SideToolbar;
}(_react2.default.Component);

exports.default = SideToolbar;


var BLOCK_TYPES = [{ id_: 'header-one', label: 'H1' }, { id_: 'header-two', label: 'H2' }, { id_: 'header-three', label: 'H3' }, { id_: 'header-four', label: 'H4' }, { id_: 'header-five', label: 'H5' }, { id_: 'header-six', label: 'H6' }, { id_: 'blockquote', label: '"' }, { id_: 'ordered-list-item', label: _react2.default.createElement('img', { src: __webpack_require__(360) }) }, { id_: 'unordered-list-item', label: _react2.default.createElement('img', { src: __webpack_require__(364) }) }, { id_: 'code-block', label: '<code>' }];

var BlockSettings = function (_React$Component2) {
	_inherits(BlockSettings, _React$Component2);

	function BlockSettings(props) {
		_classCallCheck(this, BlockSettings);

		var _this2 = _possibleConstructorReturn(this, (BlockSettings.__proto__ || Object.getPrototypeOf(BlockSettings)).call(this, props));

		_this2.state = {
			sideToolbarState: props.sideToolbarState
		};

		_this2.onToggle = _this2.onToggle.bind(_this2);
		return _this2;
	}

	_createClass(BlockSettings, [{
		key: 'onToggle',
		value: function onToggle(id) {
			this.props.toggleBlockType(id);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var editorState = this.props.editorState;

			var selection = editorState.getSelection();
			var currentBlockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

			return _react2.default.createElement(
				'div',
				{ className: 'block-settings toolbar', onMouseOver: this.props.expandSideToolbar, onMouseLeave: this.props.collapseSideToolbar },
				_react2.default.createElement(
					'ul',
					{ className: 'toolbar-icons' },
					BLOCK_TYPES.map(function (blockType) {
						return _react2.default.createElement(_ToolbarIcon2.default, {
							key: blockType.id_,
							id_: blockType.id_,
							label: blockType.label,
							active: currentBlockType === blockType.id_,
							onToggle: _this3.onToggle
						});
					})
				)
			);
		}
	}]);

	return BlockSettings;
}(_react2.default.Component);

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = undefined;

var _selection = __webpack_require__(246);

var selection = _interopRequireWildcard(_selection);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var utils = exports.utils = { selection: selection };

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.selectEntity = exports.getEntityRange = exports.getSelectionCoords = exports.getSelectedBlockElement = exports.getSelection = undefined;

var _draftJs = __webpack_require__(34);

var getSelection = exports.getSelection = function getSelection() {
	var selection = window.getSelection();
	return {
		isCollapsed: selection.isCollapsed,
		range: selection.rangeCount === 0 ? null : selection.getRangeAt(0)
	};
};

var getSelectedBlockElement = exports.getSelectedBlockElement = function getSelectedBlockElement(selectionRange) {
	var node = selectionRange.startContainer;
	do {
		var nodeIsDataBlock = node.getAttribute ? node.getAttribute('data-block') : null;
		if (nodeIsDataBlock) return node;
		node = node.parentNode;
	} while (node !== null);
	return null;
};

var getSelectionCoords = exports.getSelectionCoords = function getSelectionCoords(editor, selectionRange) {
	var editorBounds = editor.getBoundingClientRect();
	var rangeBounds = selectionRange.getBoundingClientRect();
	var rangeWidth = rangeBounds.right - rangeBounds.left;
	var rangeHeight = rangeBounds.bottom - rangeBounds.top;
	var offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2
	// 175px is width of inline toolbar
	- 175 / 2;
	// 42px is height of inline toolbar (35px) + 5px center triangle and 2px for spacing
	var offsetTop = rangeBounds.top - editorBounds.top - 42;

	return { top: offsetTop, left: offsetLeft };
};

var getEntityRange = exports.getEntityRange = function getEntityRange(editorState, entityKey) {

	var blocks = editorState.getCurrentContent().getBlocksAsArray();

	var entityRange = void 0;
	blocks.some(function (block, index) {
		block.findEntityRanges(function (value) {
			return value.get('entity') === entityKey;
		}, function (start, end) {
			entityRange = {
				start: start,
				end: end,
				blockKey: block.getKey(),
				text: block.get('text').slice(start, end)
			};
		});
		if (entityRange) return true;
	});

	return entityRange;
};

var selectEntity = exports.selectEntity = function selectEntity(editorState, entityKey) {

	var entityRange = getEntityRange(editorState, entityKey);

	var selection = editorState.getSelection();
	var entitySelection = selection.merge({
		anchorKey: entityRange.blockKey,
		anchorOffset: entityRange.start,
		focusKey: entityRange.blockKey,
		focusOffset: entityRange.end
	});

	return _draftJs.EditorState.forceSelection(editorState, entitySelection);
};

/***/ }),

/***/ 354:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 355:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAdxJREFUOI3tlLuO2kAUhn8HGNsSibgIISFRIRrLHe8ACHoairwDT4AoqKlxgShoAooEBRUFokkDHYjaDQU0Gy5r8O2kwKywcNCut4vyS6eY2zf/nDMzwH95qAWAAJwA7H3EwVn/AwC4O/C+UCh8rdVq2Gw2IKK/OiAiEBHS6TTi8ThUVQVjDKPRCIqiHAB8u5+/r9fr9AFZmqbpu93OJCKdiGgymRCAFwD44jdv0+lUF0WREolEQJZlE4ARiUTesuAXbLVaLRsAA4DVasXP53OkUqm3Ce8Bk67rBrmTHpAkiQNg3TbKZDKkadr7wYPB4MzzvNXtdi+4Vh0A0Gw2WaPRMCRJ0ofDoRmNRoOqqnoyHoq3XC61UCh0Axrj8fiViGxn2CQig4isW59TvN9PHW+323M+n4dhGMzpCpZKpeBsNtMAXLLZrFUul00ANtzX9qnjSy6Xe3WcuiIcDuuxWOzstO1qtXpynLscB+/JgiAAgFmpVKzFYiF67X48HkN3Ta7X64miKGqKonCMsYDXmkOn06F+v39yjvfg9knY7Xb7tF6vCden7TYjyzIlk0n9g1ACQIIgGMVikXie3z/k2A/QI57fik+IA9zF+wngO67fpu0TGAbw69PW/i39ATN9YGwyf1fJAAAAAElFTkSuQmCC"

/***/ }),

/***/ 356:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 357:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA+CAYAAACbQR1vAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAATZJREFUaIHtmrFKA0EQhmfXQVOktRCLqw2+SJ7ERvAp7GwF30sIghINpEtKIcE7b3yEW/DOD9n/q6f4+GBgGTa9fbx3VjFuZie0BEmmBWgUgBagUQBagEYBaAEaBaAFaNwsLWkJkhQRtANK9SugALQAjZcMrXaruXc+m1pmTDrvjovzxefQXFGAs8P8waK/+b3W3+Ffp49mdjs0V/0KKAAtQKMAtACNAtACNApAC9BUH6DoKWxte9+7P03sMirJ233RnA4ilaMAtACNr7fra1qCxOM7P9MSJNWvgALQAjQKQAvQKAAtQKMAtABN9QHcLV3QEiQ6iNACNApAC9AUXYVfN5srT/3l1DJjkiNvm6Z5GZorCpBTuusj/asfImGhHyIlKAAtQKMAtACNAtACNApAC9BUH+AHq+4z/tuYNisAAAAASUVORK5CYII="

/***/ }),

/***/ 358:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA+CAYAAACbQR1vAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAARxJREFUaIHt2jEKwkAURdE/+hHttRB0A6KFK0hj45rdgL1WokYkkMLGQgiKOq4hMHiLeWcBn8uDaULC8VK+LWNuZl06gtShA2gagA6gaQA6gKYB6ACaBqADaG4W1nQEKcQY6QZU9k9AA9ABND/UhyEd0VY9ru+FFUm+Y3j31bulOPRP02q6sIntU9zK/gloADqApgHoAJoGoANoGoAOoGU/gH8tLOmItgbWO6W6pQ8idABNA9ABND9X5zkdQfL46ezoCFL2T0AD0AE0DUAH0DQAHUDTAHQALfsB3C2M6QiSPojQATQNQAfQvLyWKzqirWbQbGej2SPFLf/GsElx6J/6z/7CTH+IJKEB6ACaBqADaBqADqBpADqAlv0AP3c1LCtM709zAAAAAElFTkSuQmCC"

/***/ }),

/***/ 359:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA+CAYAAACbQR1vAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAQ1JREFUaIHtmDEKwkAUBf8mS0gKwTZWgq2NlWfwzFY5gYXVgkQFwSPYGNdLfHaKfXOAxzDwYdlwe9y/VjHRzFpagqShBWgUgBagUQBagEYBaAEaBaAFaKJZONESJCHnTDugVH8CCkAL0ESvocmmOL7HtddeKdwCbJ7bfWP54rVXiupPQAFoARoFoAVoFIAWoFEAWoCm+gBuT+GhbdNnWQ5ee6XQhwgtQKMAtABNnF/znpYgiXlprrQESfUnoAC0AI0C0AI0CkAL0CgALUBTfYAYLYy0BIk+RGgBGgWgBWjcfoVTSqtu6I5ee6VwC9D0/e6X89lrrxTVn4AC0AI0CkAL0CgALUCjALQATfUB/rmGI8NCbVZRAAAAAElFTkSuQmCC"

/***/ }),

/***/ 360:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAANRJREFUKJGV0rFKA0EYBOAv4YgEtAoStA5EBCtbBSH6RD5EHsDnsEn6NIIQBBFSBSyEgKBiF5OAMWexe3AcJ14Gpvj//Wd3Z3bhEgO0VESCDXpo4xOHaMZ+EXW8Z8VtHO4i/YevtShq4w37uMEesrU8UjzCeRyujDqOcI/jgtdaCXcy0TMmQggnWONbCKLIFR4S9PGBL8zxFHdM/7jdNF80qnpKcIUf3G0jOsO18E4HGGFX8JZHFsYYLjAT0utgKfhZlzDFOMEphljgRfhCjZKTxP7qF8d3Oh9wbARMAAAAAElFTkSuQmCC"

/***/ }),

/***/ 361:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAR5JREFUKJF1kD0vg2EYha9zPxW7xKiLxGIRFh+JrTFYbCWRmO1Wu8lo8gOwaCOYkBi6+QmMlj5iEov3OYa3LWk40xmuc+4Pved8W8Gn+JGkA8OL7ZZgH3gF1oA55ZwfBev8DkRgG9sIKPZ8RFwDqSHo848kYXtR0kNIu6WU1QAmx0HbQ7sieGqktGf7CtgIYGKsduiWsXuS2obOoORQbznPflXVsyRSSqNm7B6wo4gz21SlkCQCGMGSwK5haRuphqsKlwLQDKCVUiIiahh6SG3gfHAQKYJGPf0kgKPBGkuum3eAiyE8pmgAd5IWSlXdG7YE3V8vHQ98BtKmS7ksdlvQ/QP6eTdM6S3nD0Nf0AGahlNJN5JmXMoxkAYwAdPfh5yHSwZDHkwAAAAASUVORK5CYII="

/***/ }),

/***/ 362:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAARVJREFUKJFtkL8uZ1EUhb+13VIyITQKUaklQlS6SYROwvAIeg+h03kJfxLRaEQxCW+hoBESSomx91Lce/0umZWc4uzzrXPWWXp9ebnIzH+S6CVp33AnQBHtDFYy87DJzF+SVhlKQq2xnyxl5t+y9xpJz/xHkkACe7kyb8reBY6b9jXwEO4MHsE7wImA+KLsCeB3Hwno4T/AiW2+GSTNCw4kEbCYHx+3WbULnBqw2wzNIImBK0kLmXldVZuKOMeG7nak2aHhEWnDVVtlbyviUoAlYtTW0SiSfY89Z1BIa4IzpPWvtlpF0xcUVVTEONI0MNMBD10hveGtkTRlmxwb6//x1K0h2G6lyaaq3iPizD8Of8oSUaVPcaeFDWlb5JAAAAAASUVORK5CYII="

/***/ }),

/***/ 363:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAASJJREFUKJFtkbEurVEQhb81e9NpRK3U6G5BguhEvMAlIVHrtV7DUyASUUuEKLyDUnPErUTCv2fd4v+PnHNiNVPMt1ZWZvTv/f2mtfYtiR9Jp8ALsIN9ArwCm8CK3kaje0nbTEgR2MY2ALZXI+IWKFXSaAoe5thg+0+JuAvpKDM3YoLpQSAzyT59PSKeo5Rj2zfAbmVGA4hgLaTHUspfw/VQ7yxm03uc9ZCeopQDRVxmJi0T4HbaMK4Bj1HKvqSL1hqttfFu+ceQNth7RXqIWveRLmzjTEKilgJwXm0TEczPzS20rjtTxCHSpTNxX4OJH0WVZNtk5kepdSszM7sObNDUAQE+q6Ql27SuSw8PG2JnYSwt1sz8iogroK/wCzjARKb+Ax4Xm9O3xwhHAAAAAElFTkSuQmCC"

/***/ }),

/***/ 364:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAMNJREFUKJG90UFKQnEQx/GP9IIWDyKE3JShuxZ2kY4gXSFP4KJuYBAdIFy1kqCNiOQBDHHlCVqkOxE3Uos3bR4vRBcN/PjPwPyZ33eG/4oDtPGOIwxwhjrKOM3pHN/wFckYTcyj/kvjBF20MEQPVdSwzLkq4QQjSGL04S5Md3gNpj6u0Ai2i5wu489+TE+xwTe8YIMK1gXOjjH9ZarswlRCB7d4jPc6/K8KelN85JlusNjCNEnwgHvZBp/xKTtBEVOK2Q/cVD35BeFUWgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(160);
module.exports = __webpack_require__(161);


/***/ })

},[367]);