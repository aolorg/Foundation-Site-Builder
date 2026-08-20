---
name: Managed AI proxy
description: The foundation website assistant’s required AI credential model.
---

Use the Replit AI Integrations OpenAI proxy as the sole model provider for the
Arena of Life website assistant.

**Why:** The visitor-facing assistant must not rely on a founder-provided OpenAI
API key; Replit manages the proxy credentials and usage instead.

**How to apply:** Keep the API server’s chat client conditional on the managed
proxy configuration. If it is unavailable, return a clear unavailable response
and keep the founder-message fallback usable rather than silently switching to
a direct third-party key.