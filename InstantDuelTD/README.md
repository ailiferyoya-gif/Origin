# Instant Duel TD Pages Build

This is the GitHub Pages version of Instant Duel TD.

It is static HTML/CSS/JS and uses PeerJS/WebRTC for two-player synchronization. The first player to open a room becomes the host, and the second player connects to that host through the shared room URL.

Public URL after deployment:

```text
https://ailiferyoya-gif.github.io/Origin/InstantDuelTD/
```

Notes:

- GitHub Pages cannot run the original Node WebSocket server.
- PeerJS public signaling is used so that the static page can still connect two devices.
- If connection fails, open the URL on the first device first, then use the share button to open the same URL on the second device.
