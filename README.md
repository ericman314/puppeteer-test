# puppeteer-test

## 1. Install

```
npm install

# Additionally, if you don't already have pm2 installed:
# npm install pm2 -g
```

## 2. Run

Either run with node directly:

```
node image-server.js
```

Or run with pm2 in cluster mode:

```
pm2 start process.json
```

# 3. Test

After starting the server, run in another terminal:

```
curl localhost:3000/render.png --output render.png
```

