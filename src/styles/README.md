# Styles

## Different with global.scss and base.scss

`base.scss` only injected in main.js. put global rule here

e.g.

```
<!-- related to reset -->
p {
  padding: 0;
  margin: 0;
}

<!-- related to font -->
@font-face {
  font-family: 'Source Sans Pro';
  src: url('@/assets/fonts/SourceSansPro-Regular.ttf') format('truetype');
}
```

`global.scss` will injected into every vue component, put variables, mixin, extend here

e.g.

```
<!-- related to variables -->
$EzyBooking-green: #189068;
```
