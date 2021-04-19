- How to cache icons all together? (a little slow when first loaded)
- Current react-native bug: cannot show custom fonts on android, need to eject

## Current progress on data visualization

### Current data format

object of points: eg. { x: item.date, y: painLevel }

### Libraries and trial results

- Vanilla d3: cannot use CSS selector in react native, more work needs to be done to generate charts dynamically.
- React-native chart kit: haven't tried yet
- victory-native: good dynamic charts as document shows, but had problem with correct sizing of charts in container in react native.
- React-native-svg: currently using, still have problem with customized x-tick spacing, as well as deciding what data format to use (object of (x,y) points or array of x's and y's)
