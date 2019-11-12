let timer = null;

export default {
	install(Vue, params) {
		let directive = (params && params.name) || "v-throttle";
		let time = (params && params.time) || 3000;
		Vue.directive(directive.replace("v-", ""), {
			bind(el, options) {
				let func = typeof options.value === 'function' ? options.value : () => options.value;
				let event = options.modifiers.touch ? 'touchend' : 'click';
				el.addEventListener(event, () => {
					if (timer) return;
					else {
						func();
						timer = setTimeout(() => {
							timer = null;
						}, time);
					}
				});
			}
		});
	}
};