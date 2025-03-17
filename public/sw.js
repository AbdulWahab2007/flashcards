if (!self.define) {
  let e,
    a = {};
  const s = (s, n) => (
    (s = new URL(s + ".js", n).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, i) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[c]) return;
    let t = {};
    const f = (e) => s(e, c),
      o = { module: { uri: c }, exports: t, require: f };
    a[c] = Promise.all(n.map((e) => o[e] || f(e))).then((e) => (i(...e), t));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "027fb3aaa19e6da30c8183535df102f1",
        },
        {
          url: "/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",
          revision: "2b4c1ee4fbe3a7cf",
        },
        {
          url: "/_next/static/chunks/218.57a830a2c55ba802.js",
          revision: "57a830a2c55ba802",
        },
        {
          url: "/_next/static/chunks/4bd1b696-04f8735efff6ecb5.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/517-ecd2369676a443c2.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/610-52358572aeff5ea4.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/814-c66339a93e9a24ca.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-2d2f6a5d21af9765.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/app/layout-5a0f629c06171ae4.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/app/page-a09ad3f6fc40a84f.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/framework-6b27c2b7aa38af2d.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/main-app-364face13c99d3cb.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/main-ce7cd729a2d5e405.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/pages/_app-430fec730128923e.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/pages/_error-2d7241423c4a35ba.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-b09ce0c63eb9c0e9.js",
          revision: "q15nVbCxUz7FoJDJgPRKg",
        },
        {
          url: "/_next/static/css/d11ef0ff9f0cab03.css",
          revision: "d11ef0ff9f0cab03",
        },
        {
          url: "/_next/static/media/0484562807a97172-s.p.woff2",
          revision: "b550bca8934bd86812d1f5e28c9cc1de",
        },
        {
          url: "/_next/static/media/140d7ede024f369d-s.p.woff2",
          revision: "6596306681fe4cd1217a629d911a9cfb",
        },
        {
          url: "/_next/static/media/16ac71326f5c6f42-s.woff2",
          revision: "b0a922b2322a1fea4fafe8f34b93c8b6",
        },
        {
          url: "/_next/static/media/480d3e2442b3804b-s.woff2",
          revision: "4a97b577e237c94642d0ac5046a7aafe",
        },
        {
          url: "/_next/static/media/569ce4b8f30dc480-s.p.woff2",
          revision: "ef6cefb32024deac234e82f932a95cbd",
        },
        {
          url: "/_next/static/media/670b84281b234e8b-s.woff2",
          revision: "e57261a32029898e6b018f5032505fc0",
        },
        {
          url: "/_next/static/media/747892c23ea88013-s.woff2",
          revision: "a0761690ccf4441ace5cec893b82d4ab",
        },
        {
          url: "/_next/static/media/8b285fe5f7c506da-s.p.woff2",
          revision: "1ca579a7ff4766beadfec298f2a55977",
        },
        {
          url: "/_next/static/media/9031f1910fdd4104-s.woff2",
          revision: "1f520e7efb82df6ce42724acc946ca36",
        },
        {
          url: "/_next/static/media/93f479601ee12b01-s.p.woff2",
          revision: "da83d5f06d825c5ae65b7cca706cb312",
        },
        {
          url: "/_next/static/media/951b6d7ccab6badf-s.woff2",
          revision: "46ff066452aa349e1ff510b834ecb4fb",
        },
        {
          url: "/_next/static/media/97518b7e06d5f7e3-s.woff2",
          revision: "808038f18ec2043c55b4759d55ef9b42",
        },
        {
          url: "/_next/static/media/ba015fad6dcf6784-s.woff2",
          revision: "8ea4f719af3312a055caf09f34c89a77",
        },
        {
          url: "/_next/static/media/c3bc380753a8436c-s.woff2",
          revision: "5a1b7c983a9dc0a87a2ff138e07ae822",
        },
        {
          url: "/_next/static/media/ca7864bf2a958758-s.woff2",
          revision: "7847d471d271c6cd1b6a479b8b96aa36",
        },
        {
          url: "/_next/static/media/cd5a189da02f5132-s.woff2",
          revision: "46fb4e46ec07816b8e16c47ac81940ea",
        },
        {
          url: "/_next/static/media/f2f8e7ea0ffee501-s.woff2",
          revision: "6c825a377fa43d0cbd5fedbb8fd24d8a",
        },
        {
          url: "/_next/static/media/fc44ee2c67575b6b-s.woff2",
          revision: "d339e703fbc5afbb524e9f493cb7e188",
        },
        {
          url: "/_next/static/q15nVbCxUz7FoJDJgPRKg/_buildManifest.js",
          revision: "f2dfe0787adfd3e4dd8527626cfbd57f",
        },
        {
          url: "/_next/static/q15nVbCxUz7FoJDJgPRKg/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        { url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
        { url: "/globe.svg", revision: "2aaafa6a49b6563925fe440891e32717" },
        {
          url: "/icons/icon-192x192.png",
          revision: "ca35e811d0a600048c4ddd2183cba32a",
        },
        {
          url: "/icons/icon-512x512.png",
          revision: "41f4769a4749e5a42214df60ad824511",
        },
        { url: "/manifest.json", revision: "5e758dc630b5edca2bc3150139449a54" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        { url: "/vercel.svg", revision: "c0af2f507b369b085b35ef4bbe3bcf1e" },
        { url: "/window.svg", revision: "a2760511c65806022ad20adf74370ff3" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: a,
              event: s,
              state: n,
            }) =>
              a && "opaqueredirect" === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: "OK",
                    headers: a.headers,
                  })
                : a,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith("/api/auth/") && !!a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
