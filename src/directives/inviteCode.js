const inviteCode = {
    bind(el, binding, vnode) {
        el.onclick = function (event) {
            event.stopPropagation();
            if (vnode.context.$store.state.userInfo.fdlPriorID > 0) {
                binding.expression && binding.value();
            } else {
                vnode.context.registerInviteDlg = true;
            }
        }
    }
};

export default inviteCode
