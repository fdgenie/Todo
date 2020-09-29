export function setLoading(state) {
  state.loading += 1;
}

export function stopLoading(state) {
  if (state.loading === 0) {
    return;
  }
  state.loading -= 1;
}
