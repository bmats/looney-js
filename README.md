# looney.js

> Make page transitions more entertaining

looney.js uses SVG masks to animate a page transition.

## Usage

```html
<a href="https://www.google.com">Google</a>

<script src="build/looney.min.js"></script>
<script>
  // Basic usage
  looney()

  // All options with default values
  looney(document.body, {
    selector: 'a',    // which elements trigger the transition
    fill: '#000',     // the transition fill
    blur: 0,          // how much the circle edges should be blurred
    playAudio: false, // whether to play music
    duration: 6900,   // the transition duration (music speed is adjusted accordingly)
    pause: 0          // how long to pause before redirecting
  })
</script>
```

## Bookmarklet

Copy the contents of [build/bookmarklet.js](build/bookmarklet.js) into a bookmarklet to loonify any webpage!

## To do

- Add multiple easings (bounce)
- Add option to invert the animation
- Add option to pause at a specific distance before continuing
