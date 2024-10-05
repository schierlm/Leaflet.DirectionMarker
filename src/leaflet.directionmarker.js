(function (factory, window) {
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('leaflet'));
    }
    if (typeof window !== 'undefined' && window.L) {
        window.L.Marker.Direction = factory(L);
    }
}(function (L) {
    var L_Marker_Direction = L.Marker.extend({
		options: {
			pane: 'directionPane', keyboard: false, raiseOnHover: false
		},
		onAdd: function(map) {
			if (L_Marker_Direction._normalIcon === undefined) {
				throw "Plugin not initialized";
			}
			if (map.getPane(this.options.pane) === undefined) {
				map.createPane(this.options.pane);
			}
			L.Marker.prototype.onAdd.call(this, map);
			this._move()
		},
		_move: function() {
			if (this._icon && this._map) {
				const pos = this._map.latLngToLayerPoint(this._latlng).round();
				const bounds = this._map.getPixelBounds();
				const opos = this._map.getPixelOrigin().add(pos);
				let newIcon, isArrow = false;
				if (opos.y < bounds.min.y) {
					pos.y += bounds.min.y - opos.y;
					isArrow = true;
					if (opos.x < bounds.min.x) {
						newIcon = L_Marker_Direction._upLeftArrow;
						pos.x += bounds.min.x - opos.x;
					} else if (opos.x > bounds.max.x) {
						newIcon = L_Marker_Direction._upRightArrow;
						pos.x -= opos.x - bounds.max.x;
					} else {
						newIcon = L_Marker_Direction._upArrow;
					}
				} else if (opos.y > bounds.max.y) {
					pos.y -= opos.y - bounds.max.y;
					isArrow = true;
					if (opos.x < bounds.min.x) {
						newIcon = L_Marker_Direction._downLeftArrow;
						pos.x += bounds.min.x - opos.x;
					} else if (opos.x > bounds.max.x) {
						newIcon = L_Marker_Direction._downRightArrow;
						pos.x -= opos.x - bounds.max.x;
					} else {
						newIcon = L_Marker_Direction._downArrow;
					}
				} else if (opos.x < bounds.min.x) {
					newIcon = L_Marker_Direction._leftArrow;
					pos.x += bounds.min.x - opos.x;
					isArrow = true;
				} else if (opos.x > bounds.max.x) {
					newIcon = L_Marker_Direction._rightArrow;
					pos.x -= opos.x - bounds.max.x;
					isArrow = true;
				} else if (opos.y > bounds.min.y + L_Marker_Direction._normalIcon.options.iconSize[1]) {
					newIcon = L_Marker_Direction._normalIcon;
				} else {
					newIcon = L_Marker_Direction._flippedIcon;
				}
				if (!isArrow && opos.y < bounds.min.y + 100 && (opos.x < bounds.min.x + 100 || opos.x > bounds.max.x - 100)) {
					let leftArrow = opos.x < bounds.min.x + 100;
					let avoidControls = this._map._avoidControlsForDirectionMarkers || (this._map.zoomControl === undefined ? [] : [ this._map.zoomControl ]);
					let mapRect = this._map.getContainer().getBoundingClientRect();
					let dx = opos.x - bounds.min.x + mapRect.x, dy = opos.y - bounds.min.y + mapRect.y;
					for (let control of avoidControls) {
						let ctRect = control.getContainer().getBoundingClientRect();
						if (dx >= ctRect.left && dx <= ctRect.right) {
							if (dy >= ctRect.top && dy <= ctRect.bottom) {
								isArrow = true;
								if (leftArrow) {
									newIcon = L_Marker_Direction._leftArrow;
									pos.x += ctRect.right - dx;
								} else {
									newIcon = L_Marker_Direction._rightArrow;
									pos.x -= dx - ctRect.left;
								}
								break;
							} else if (dy > ctRect.bottom && dy <= ctRect.bottom + L_Marker_Direction._normalIcon.options.iconSize[1]) {
								newIcon = L_Marker_Direction._flippedIcon;
							}
						}
					}
				}
				if (this._icon != newIcon) {
					this.setIcon(newIcon);
					this._setPos(pos);
				} else if (isArrow) {
					this._setPos(pos);
				}
			}
			return this;
		},
		getEvents: function () {
			return {
				zoom: this._move,
				viewreset: this._move,
				move: this._move
			};
		}
	});
	L_Marker_Direction.initialize = function(pathPrefix, markerSize, arrowSize) {
		markerSize = markerSize || [25, 41];
		arrowSize = arrowSize || [64, 64];
		L_Marker_Direction._normalIcon = L.icon({
			iconUrl: pathPrefix + 'direction-marker-icon-normal.png',
			shadowUrl: null,
			iconSize:  markerSize,
			iconAnchor: [(markerSize[0]>>1), markerSize[1]]
		});
		L_Marker_Direction._flippedIcon = L.icon({
			iconUrl: pathPrefix + 'direction-marker-icon-flipped.png',
			shadowUrl: null,
			iconSize: markerSize,
			iconAnchor: [(markerSize[0]>>1), 0]
		});
		L_Marker_Direction._upArrow = L.icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-up.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: [(arrowSize[0]>>1), 0]
		});
		L_Marker_Direction._downArrow = L.icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-down.png',
			shadowUrl: null,
			iconSize:  arrowSize,
			iconAnchor: [(arrowSize[0]>>1), arrowSize[1]]
		});
		L_Marker_Direction._leftArrow = L.icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-left.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: [0, (arrowSize[1]>>1)]
		});
		L_Marker_Direction._rightArrow = L.icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-right.png',
			shadowUrl: null,
			iconSize:  arrowSize,
			iconAnchor: [arrowSize[0], (arrowSize[1]>>1)]
		});
		L_Marker_Direction._upLeftArrow = L.icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-up-left.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: [0, 0]
		});
		L_Marker_Direction._upRightArrow = L.icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-up-right.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: [arrowSize[0], 0]
		});
		L_Marker_Direction._downLeftArrow = L.icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-down-left.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: [0, arrowSize[0]]
		});
		L_Marker_Direction._downRightArrow = L.icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-down-right.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: arrowSize
		});
	};
	L_Marker_Direction.avoidControls = function(map, controls) {
		map._avoidControlsForDirectionMarkers = controls;
	}
	L.marker.direction = function(latlng, options) {
		return new L_Marker_Direction(latlng, options);
	};
    return L_Marker_Direction;
}, window));
