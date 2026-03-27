# Container Candidate

This is a tiny dependency-free testing app built with plain HTML, CSS, and JavaScript.

## What it does

- shows a small dashboard with fake runtime metrics
- lets you run health checks and simulate traffic
- stores recent activity in browser local storage
- works without Node, Python, or any build tooling

## Run it locally

Open [index.html](./index.html) in a browser.

On Windows PowerShell you can also run:

```powershell
start .\index.html
```

## Files

- `index.html`: page structure
- `styles.css`: layout and styling
- `app.js`: interactive behavior and local storage state

## Docker later

Because this is a static app, it is easy to containerize later with a simple web server such as `nginx` or `caddy`.

One common pattern is copying these files into `/usr/share/nginx/html` in an `nginx` image.

## Docker now

Build the image:

```powershell
docker build -t container-candidate .
```

Run the container:

```powershell
docker run --rm -p 8080:80 container-candidate
```

Then open `http://localhost:8080`.
