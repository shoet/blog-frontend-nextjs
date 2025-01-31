self.addEventListener("fetch", (event) => {
  if (event.request.method === "PUT" || event.request.method === "POST") {
    event.respondWith(
      (async function () {
        const originalRequest = event.request;
        const clonedRequest = originalRequest.clone();
        const buffer = await clonedRequest.arrayBuffer();
        const hash = await calculateSHA256(buffer);

        const modifiedRequest = new Request(originalRequest, {
          headers: new Headers(originalRequest.headers),
        });
        modifiedRequest.headers.set("x-amz-content-sha256", hash);

        return fetch(modifiedRequest).catch((error) => {
          console.error("Failed to fetch by service worker", error);
          throw error;
        });
      })(),
    );
  }
});

self.addEventListener("install", () => {
  console.log("installed");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("activated");
  clients.claim();
});

async function calculateSHA256(requestBuffer) {
  const hashBuffer = await crypto.subtle.digest("SHA-256", requestBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
