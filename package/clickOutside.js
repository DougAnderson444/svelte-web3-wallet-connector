/**
 * Click Outside
 * @param {Node} node
 */
export default (node, _options = {}) => {
	const options = { onClickOutside: () => {}, ..._options };

	console.log('include: ', options.include);

	function detect({ target }) {
		if (!node.contains(target) || options.include.some((i) => target.isSameNode(i))) {
			options.onClickOutside();
		}
	}
	document.addEventListener('click', detect, { passive: true, capture: true });

	return {
		destroy() {
			document.removeEventListener('click', detect);
		}
	};
};
