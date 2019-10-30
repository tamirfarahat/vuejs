Vue.directive('closable', {
    bind(el, binding, vnode) {
        window.handleOutsideClick = function (e) {
            e.stopPropagation();
            const {handler, exclude} = binding.value;
            let clickedOnExcludedEl = false;
            exclude.forEach(refName => {
                if (!clickedOnExcludedEl) {
                    const excludedEl = vnode.context.$refs[refName];
                    clickedOnExcludedEl = excludedEl.contains(e.target);
                }
            });
            if (!el.contains(e.target) && !clickedOnExcludedEl) {
                vnode.context[handler]();
            }

//            if (!el.contains(document.activeElement) && !clickedOnExcludedEl) {
//                console.log("1");
//                vnode.context[handler]();
//            }
        };

        window.handleFocus = function (e) {
            
            const {handler, exclude} = binding.value;
            let clickedOnExcludedEl = false;
            exclude.forEach(refName => {
                if (!clickedOnExcludedEl) {
                    const excludedEl = vnode.context.$refs[refName];
                    clickedOnExcludedEl = excludedEl.contains(e.target);
                }
            });
            if (!el.contains(e.target) && !clickedOnExcludedEl) {
                vnode.context[handler]();
            }

            if (!document.activeElement ) {
                vnode.context[handler]();
            }
        };


        document.addEventListener('click', window.handleOutsideClick);
        document.addEventListener('touchstart', window.handleOutsideClick);
        document.addEventListener('focusin', window.handleFocus);

    },

    unbind() {
        document.removeEventListener('click', window.handleOutsideClick);
        document.removeEventListener('touchstart', window.handleOutsideClick);
        document.removeEventListener('focusin', window.handleOutsideClick);

    }
});
