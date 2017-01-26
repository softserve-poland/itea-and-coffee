[![Build Status](https://travis-ci.org/fedyk/itea-and-coffee.svg?branch=master)](https://travis-ci.org/fedyk/itea-and-coffee)

# ITea and Coffee 

Promo page for Event organized by Soft Serve Poland.

## Usage

**&#9733; Run & watch**

Run server and watch changes in HTML, CSS and JS files.

`npm start`

**&#9733; Optimize images**

Images (.jpeg, .png, .svg) will taken from `src/img`, optimized and placed to `assets/img`.

`npm run img`

**&#9733; Build project**

Copy HTML-files and `assets/` to `build/`.

`npm run build`

**&#9733; Deploy**

Publish project to GithubPages.

`npm run deploy`

**&#9733; Check**

Check files with editorconfig-tools.

`npm run check`

**&#9733; Fix**

Fix files with editorconfig-tools.

`npm run fix`

## How to get access_token for instagram?

Step one:

```
https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=code
```


Step two:

```
curl -F 'client_id=CLIENT ID' \
    -F 'client_secret=CLIENT SECRET' \
    -F 'grant_type=authorization_code' \
    -F 'redirect_uri=redirect_uri' \
    -F 'code=CODE' \
    https://api.instagram.com/oauth/access_token
```
