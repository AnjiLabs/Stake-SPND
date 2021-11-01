# Stake SafePanda for Bamboo

## Dependencies

- Node
- NPM

## Setup

Install package dependencies
```
npm install
```

This will install required packages for running

## Run in local web server

```
npm start
```

Navigate to http://localhost:9000

Build JS for production

```
npm run build
```

The production JS code will be placed into a local dist folder dist/bamboo.js

The HTML within the index.html will need to be copied across whilst also using the CDN version of web3.js (link below) as well as CDN version of fontawesome.
```
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
```

Once built you can simply add the web3 JS file and the built bamboo.js file to your webpage whilst simply adding.
```
<div id="spnd-bmbo-staking"></div>
```

To specify where the widget should be loaded.
