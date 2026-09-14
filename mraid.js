(function installPagesMraidPreview(global) {
  const listeners = new Map();

  function emit(name, value) {
    const callbacks = listeners.get(name) || [];
    callbacks.forEach((callback) => callback(value));
  }

  global.__PAGES_MRAID_PREVIEW__ = true;
  global.mraid = {
    getState() {
      return "default";
    },
    isViewable() {
      return !document.hidden;
    },
    getAudioVolume() {
      return 100;
    },
    addEventListener(name, callback) {
      const callbacks = listeners.get(name) || [];
      callbacks.push(callback);
      listeners.set(name, callbacks);
    },
    open(url) {
      if (url) global.open(url, "_blank", "noopener,noreferrer");
    },
  };

  document.addEventListener("visibilitychange", () => {
    emit("viewableChange", !document.hidden);
  });
  global.addEventListener("resize", () => emit("sizeChange"));
})(window);
