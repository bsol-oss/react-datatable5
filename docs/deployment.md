# Deployment

```bash
rm -rf ./dist
npm run build
git add ./dist/*
git commit -m "chore: update dist"
npm version prerelease --preid=beta
npm publish
```
