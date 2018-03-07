import React from 'react';
import PropTypes from 'prop-types';
import reduce from 'reduce-object';

import { urlFriendly } from '../../../utils/urlFriendly';
import Link from '../../Link/Link';

const TableOfContents = ({ baseUrl, pages, isVisibleForMobile, onShowMobileTableOfContents, onHideMobileTableOfContents }) => (
	<div
		className={`documentation-page__table-of-contents-wrapper ${
			isVisibleForMobile ? 'documentation-page__table-of-contents-wrapper--mobile-visible' : ''
		}`}
		onClick={event => {
			event.stopPropagation();
		}}
	>
		<div className="documentation-page__show-table-of-contents-button" onClick={onShowMobileTableOfContents}>
			≡
		</div>
		<div className="documentation-page__hide-table-of-contents-button" onClick={onHideMobileTableOfContents}>
			X
		</div>
		<div className={`documentation-page__table-of-contents ${isVisibleForMobile ? 'documentation-page__table-of-contents--mobile-visible' : ''}`}>
			<div className="documentation-page__table-of-contents-inner">
				{reduce(
					pages,
					(sections, subpages, groupLabel) => [
						...sections,
						<LinkGroup groupLabel={groupLabel} key={groupLabel}>
							{subpages.map(({ label }) => (
								<li className="documentation-page__list-item" key={`${groupLabel}/${label}`}>
									<Link onClick={onHideMobileTableOfContents} url={`${baseUrl}/${urlFriendly(groupLabel)}/${urlFriendly(label)}`}>{label}</Link>
								</li>
							))}
						</LinkGroup>
					],
					[]
				)}
			</div>
		</div>
	</div>
);

TableOfContents.propTypes = {
	baseUrl: PropTypes.string.isRequired,
	isVisibleForMobile: PropTypes.bool.isRequired,
	onHideMobileTableOfContents: PropTypes.func.isRequired,
	onShowMobileTableOfContents: PropTypes.func.isRequired,
	pages: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				view: PropTypes.element.isRequired
			})
		)
	).isRequired
};

// eslint-disable-next-line react/no-multi-comp
const LinkGroup = ({ groupLabel, children }) => (
	<React.Fragment key={groupLabel}>
		<h1 className="documentation-page__content-list-title">{groupLabel}</h1>
		<ul className="documentation-page__contents-list">{children}</ul>
	</React.Fragment>
);

LinkGroup.propTypes = {
	children: PropTypes.node.isRequired,
	groupLabel: PropTypes.string.isRequired
};

export default TableOfContents;
