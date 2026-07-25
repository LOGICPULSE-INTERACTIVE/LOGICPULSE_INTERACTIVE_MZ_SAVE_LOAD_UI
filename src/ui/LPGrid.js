LOGICPULSE.UI.SaveLoadGrid = class extends LOGICPULSE.UI.BaseGrid {
    constructor(layout, options) {
        super(layout, options);
        // The vertical step between rows is spacingY (not slotHeight + spacingY)
        this._rowHeight = this._layout.spacingY;
        this._visibleRows = Math.floor(this._layout.rect.height / this._rowHeight);
    }

    createSlot(options) {
        return new LOGICPULSE.UI.SaveLoadGridSlot(options);
    }

    buildSlots() {
        var items = this.items();
        var slotWidth = this._layout.slotWidth;   // directly from layout
        var slotHeight = this._layout.slotHeight;
        var cols = this._layout.columns;
        for (var index = 0; index < items.length; index++) {
            var position = this.slotPosition(index);
            var slot = this.createSlot({
                x: position.x,
                y: position.y,
                entry: items[index],
                width: slotWidth,
                height: slotHeight,
                column: index % cols
            });
            this._slotLayer.addChild(slot);
            this._slots.push(slot);
        }
    }

    updateViewport() {
        if (this._selectedIndex < 0) return;
        var row = Math.floor(this._selectedIndex / this._layout.columns);
        var totalRows = Math.max(1, Math.ceil(this.items().length / this._layout.columns));
        var maxScrollRow = Math.max(0, totalRows - this._visibleRows);
        if (row < this._scrollRow) {
            this._scrollRow = row;
        } else if (row >= this._scrollRow + this._visibleRows) {
            this._scrollRow = row - this._visibleRows + 1;
        }
        this._scrollRow = Math.max(0, Math.min(this._scrollRow, maxScrollRow));
        this._scrollTargetY = -(this._scrollRow * this._rowHeight);
    }
};