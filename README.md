Leaflet.DirectionMarker
=======================

Provides direction markers that can indicate the position of a marker, even when it is out of range or covered by a control.

Can be used, for example, to highlight markers when hovered in a sidebar or similar.

A plugin for [Leaflet](http://leafletjs.com), a JS library for interactive maps, version 1.0.0 or above (tested with 1.0.0 and 1.9.4).


Usage
-----

- Include [`leaflet.directionmarker.js`](./src/leaflet.directionmarker.js) on your page after Leaflet files.

- If you want to place the direction markers on the direction pane (default), you also need one line of CSS:

  ```css
  .leaflet-direction-pane { z-index: 620; pointer-events: none; }
  ```

- Initialize the plugin, pointing to the prefix where you have the 10 marker/arrow images stored:

  ```js
  L.Marker.Direction.initialize('./src/');
  ```

- In case you use other controls than the default zoom and attribution controls, or you do not want direction
  markers to avoid all controls you use, register the ones to avoid for the plugin:

  ```js
  L.Marker.Direction.avoidControls(map, [map.zoomControl, layerControl]);
  ```

- Create direction markers when needed and add them to the map:

  ```js
  L.marker.direction([52.5167,13.3833], {alt: "Berlin"}).addTo(map);
  ```


Examples
--------

- [`city-example.html`](./examples/city-example.html) ([view in browser](https://schierlm.github.io/Leaflet.DirectionMarker/examples/city-example.html)) shows
  how to use direction markers when hovering city names on a side bar. It also shows interaction with the [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster/)
  plugin.

- [`small-example.html`](./examples/small-example.html) ([view in browser](https://schierlm.github.io/Leaflet.DirectionMarker/examples/small-example.html)) shows
  a simple map with three markers and options to decide which of them (if any) should be pointed to by the
  direction marker. It also includes controls in all four corners to test the avoidance strategies when the
  marker is covered by controls.

- [`mini-example.html`](./examples/mini-example.html) ([view in browser](https://schierlm.github.io/Leaflet.DirectionMarker/examples/mini-example.html)) uses the least code
  possible to show a single marker and a direction marker pointing to it.


API
---

- `L.Marker.Direction` is a subclass of `L.Marker` with no extra public API. These default options are changed:
  - **pane**: `'directionPane'`
  - **keyboard**: false
  - **raiseOnHover**: false

- `L.Marker.Direction.initialize(pathPrefix, markerSize = [25, 41], arrowSize = [64, 64])` initializes the plugin and provides a
  prefix for the images. If you use custom images that are different sizes, you can pass the marker and arrow sizes. No shadows
  are used, and the anchors are in the corners or the middle of an edge.

- `L_Marker_Direction.avoidControls(map, controls)` registers an array of controls to avoid on the given map. If no controls are
  explicitly registered for a map, the zoom control is avoided automatically. To avoid that, register an empty array.

- `L.marker.direction` is the factory function to create direction markers, as per Leaflet convention.


License
-------

Leaflet.DirectionMarker is free software, and may be redistributed under the MIT license.
