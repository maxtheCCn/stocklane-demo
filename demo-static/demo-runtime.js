// Stocklane static demo runtime (generated)
(function () {
  var READ_ONLY = "[{\"_1\":2},\"data\",{\"_3\":4,\"_5\":6},\"ok\",false,\"error\",\"This is a read-only demo — changes aren’t saved.\"]\n";
  var manifestPromise = null;
  function manifest() {
    manifestPromise = manifestPromise || fetchOriginal("/stocklane-demo/demo-static/manifest.json").then(function (r) { return r.json(); }).catch(function () { return {}; });
    return manifestPromise;
  }
  var fetchOriginal = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var request = new Request(input, init);
    var url = new URL(request.url, location.href);
    if (url.origin !== location.origin) return fetchOriginal(input, init);
    var method = request.method.toUpperCase();
    if (method !== "GET" && method !== "HEAD") {
      return Promise.resolve(new Response(READ_ONLY, { status: 200, headers: { "Content-Type": "text/x-script", "X-Remix-Response": "yes" } }));
    }
    if (!/\.data$/.test(url.pathname)) return fetchOriginal(input, init);
    var params = new URLSearchParams(url.search);
    params.delete("_routes");
    params.delete("index");
    params.sort();
    var q = params.toString();
    return manifest().then(function (m) {
      var file = q ? m[url.pathname + "?" + q] : null;
      return fetchOriginal(file || url.pathname, { credentials: "same-origin" });
    });
  };
})();
