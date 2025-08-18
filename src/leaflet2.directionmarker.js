import {Marker, Util, Icon, LatLng} from 'leaflet';

export class DirectionMarker extends Marker {

	static {
		this.setDefaultOptions({
			pane: 'directionPane', keyboard: false, raiseOnHover: false
		});
	}

	onAdd(map) {
			if (DirectionMarker._normalIcon === undefined) {
				throw "Plugin not initialized";
			}
			if (map.getPane(this.options.pane) === undefined) {
				map.createPane(this.options.pane);
			}
			super.onAdd(map);
			this._move()
	}

	_move() {
			if (this._icon && this._map) {
				const L_Marker_Direction = DirectionMarker;
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
	}
	getEvents() {
			return {
				zoom: this._move,
				viewreset: this._move,
				move: this._move
			};
	}
}

DirectionMarker.initialize = function(pathPrefix, markerSize, arrowSize) {
		const L_Marker_Direction = DirectionMarker;
		markerSize = markerSize || [25, 41];
		arrowSize = arrowSize || [64, 64];
		L_Marker_Direction._normalIcon = new Icon({
			iconUrl: pathPrefix + 'direction-marker-icon-normal.png',
			shadowUrl: null,
			iconSize:  markerSize,
			iconAnchor: [(markerSize[0]>>1), markerSize[1]]
		});
		L_Marker_Direction._flippedIcon = new Icon({
			iconUrl: pathPrefix + 'direction-marker-icon-flipped.png',
			shadowUrl: null,
			iconSize: markerSize,
			iconAnchor: [(markerSize[0]>>1), 0]
		});
		L_Marker_Direction._upArrow = new Icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-up.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: [(arrowSize[0]>>1), 0]
		});
		L_Marker_Direction._downArrow = new Icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-down.png',
			shadowUrl: null,
			iconSize:  arrowSize,
			iconAnchor: [(arrowSize[0]>>1), arrowSize[1]]
		});
		L_Marker_Direction._leftArrow = new Icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-left.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: [0, (arrowSize[1]>>1)]
		});
		L_Marker_Direction._rightArrow = new Icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-right.png',
			shadowUrl: null,
			iconSize:  arrowSize,
			iconAnchor: [arrowSize[0], (arrowSize[1]>>1)]
		});
		L_Marker_Direction._upLeftArrow = new Icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-up-left.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: [0, 0]
		});
		L_Marker_Direction._upRightArrow = new Icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-up-right.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: [arrowSize[0], 0]
		});
		L_Marker_Direction._downLeftArrow = new Icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-down-left.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: [0, arrowSize[0]]
		});
		L_Marker_Direction._downRightArrow = new Icon({
			iconUrl: pathPrefix + 'direction-marker-arrow-down-right.png',
			shadowUrl: null,
			iconSize: arrowSize,
			iconAnchor: arrowSize
		});
};

DirectionMarker.avoidControls = function(map, controls) {
		map._avoidControlsForDirectionMarkers = controls;
};
