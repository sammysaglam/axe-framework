import lazyLoad from '../../../../LazyLoader/createLazyLoadedComponent';

export default typeof document === 'undefined' ?

	() => null

	:

	lazyLoad(module.hot ?

		require('./ReactLoginPanel')

		:

		() => import('./ReactLoginPanel') , {
			loading:'Loading...'
		}
	)

;