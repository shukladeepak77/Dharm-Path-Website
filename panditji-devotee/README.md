# PanditJi Premium MVP

## Run locally / on GCP

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Open:

```text
http://YOUR_VM_EXTERNAL_IP:5173
```

## Add YouTube videos

Edit:

```text
src/data/poojas.js
```

Replace:

```text
https://www.youtube.com/embed/YOUR_VIDEO_ID_1
```

If your YouTube video is:

```text
https://www.youtube.com/watch?v=abc123
```

Use:

```text
https://www.youtube.com/embed/abc123
```
