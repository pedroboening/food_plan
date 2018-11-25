const callback = {
  open: null,
  dismiss: null,
};

export function subscribe(which, cb) {
  callback[which] = cb;
}

export function open(object) {
  callback.open(object);
}

export function dismiss() {
  callback.dismiss();
}
