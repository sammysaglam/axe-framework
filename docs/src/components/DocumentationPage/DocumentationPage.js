import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import reduce from 'reduce-object';

import { urlFriendly } from '../../utils/urlFriendly';
import TableOfContents from './TableOfContents/TableOfContents';

export default class DocumentationPageGenerator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isMobileTableOfContentsVisible: false
		};

		this.onShowMobileTableOfContents = this.onShowMobileTableOfContents.bind(this);
		this.onHideMobileTableOfContents = this.onHideMobileTableOfContents.bind(this);
	}

	onShowMobileTableOfContents(event) {
		if (event) {
			event.stopPropagation();
		}

		this.setState({
			isMobileTableOfContentsVisible: true
		});
	}

	onHideMobileTableOfContents(event) {
		if (event) {
			event.stopPropagation();
		}

		this.setState({
			isMobileTableOfContentsVisible: false
		});
	}

	render() {
		const { baseUrl, pages } = this.props;
		const { isMobileTableOfContentsVisible } = this.state;
		const { onShowMobileTableOfContents, onHideMobileTableOfContents } = this;

		const firstPageLabel = Object.keys(pages)[0];

		const toRoutesWithPages = (sections, subpages, groupLabel) => [
			...sections,
			...subpages.map(({ label, view }) => (
				<Route key={groupLabel + '/' + label} path={`${baseUrl}/${urlFriendly(groupLabel)}/${urlFriendly(label)}`} render={() => view} />
			))
		];

		// call window resize to correct line numbers
		setTimeout(() => {
			window.dispatchEvent(new Event('resize'));
		}, 200);

		return (
			<React.Fragment>
				<Route
					component={() => <Redirect to={`${baseUrl}/${urlFriendly(firstPageLabel)}/${urlFriendly(pages[firstPageLabel][0].label)}`} />}
					exact={true}
					path={baseUrl}
				/>
				<div className="documentation-page" onClick={onHideMobileTableOfContents}>
					<div className="documentation-page__inner">
						<div className="documentation-page__markdown-wrapper">{reduce(pages, toRoutesWithPages, [])}</div>
						<TableOfContents
							baseUrl={baseUrl}
							isVisibleForMobile={isMobileTableOfContentsVisible}
							onHideMobileTableOfContents={onHideMobileTableOfContents}
							onShowMobileTableOfContents={onShowMobileTableOfContents}
							pages={pages}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

DocumentationPageGenerator.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	pages: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				view: PropTypes.element.isRequired
			})
		)
	).isRequired
};
