//=============================================================================
// LPGridSlot.js (Save/Load specific – extends BaseGridSlot)
//=============================================================================

LOGICPULSE.UI.SaveLoadGridSlot = class extends LOGICPULSE.UI.BaseGridSlot {
    constructor(options) {
        super(options);
    }

    createBackground() {
        var folder = LOGICPULSE.Assets.Folders.SaveLoad;
        var idleName = LOGICPULSE.Assets.Images.SaveLoad.SlotIdle;
        var hoverName = LOGICPULSE.Assets.Images.SaveLoad.SlotHover;

        this._idleSprite = this.createSprite(folder, idleName);
        this._idleSprite.width = this._slotWidth;
        this._idleSprite.height = this._slotHeight;
        this.addChild(this._idleSprite);

        this._hoverSprite = this.createSprite(folder, hoverName);
        this._hoverSprite.width = this._slotWidth;
        this._hoverSprite.height = this._slotHeight;
        this._hoverSprite.visible = false;
        this.addChild(this._hoverSprite);

        // Store references for updateSelection
        this._bgSprites = [this._idleSprite, this._hoverSprite];
    }

    createContent() {
        var entry = this._entry || {};
        var empty = entry.empty !== undefined ? entry.empty : true;
        var title = entry.title || "Empty";
        var playtime = entry.playtime || "";
        var level = entry.level || 0;
        var gold = entry.gold || 0;

        var gridLayout = LOGICPULSE.Layout.SaveLoad.Grid;
        var partyData = gridLayout.PartyData || { x: 4, y: 4, spacingY: 5, align: "left" };
        var timeStamp = gridLayout.TimeStamp || { x: 0, y: 0, align: "right" };

        var params = LOGICPULSE.Assets.getSaveLoadParams();
        var fontFace = params.FontFace || $gameSystem.mainFontFace();
        var fontSize = Number(params.FontSize) || 16;
        var textColor = params.TextColor || "#FFFFFF";

        // Left side texts
        var leftText1 = empty ? "Empty" : title;
        var leftText2 = empty ? "" : "Lv." + level + "  Gold: " + gold;

        var lineHeight = fontSize + 2;
        var startY = partyData.y;

        // ---- First line (map name or "Empty") ----
        var emptyY = startY;
        if (empty) {
            // Center "Empty" text vertically
            emptyY = (this._slotHeight - lineHeight) / 2.5;
        }
        this._leftText1 = new LOGICPULSE.UI.Text({
            text: leftText1,
            x: partyData.x,
            y: emptyY,
            width: this._slotWidth - partyData.x - 10,
            height: lineHeight,
            align: partyData.align || "left",
            fontSize: fontSize,
            fontFace: fontFace,
            textColor: textColor
        });
        this.addChild(this._leftText1);

        // ---- Second line (level + gold) – only if not empty ----
        if (!empty) {
            var secondLineY = startY + lineHeight + (partyData.spacingY || 5);
            this._leftText2 = new LOGICPULSE.UI.Text({
                text: leftText2,
                x: partyData.x,
                y: secondLineY,
                width: this._slotWidth - partyData.x - 10,
                height: lineHeight,
                align: partyData.align || "left",
                fontSize: fontSize - 2,
                fontFace: fontFace,
                textColor: textColor
            });
            this.addChild(this._leftText2);
        }

        // ---- Right side: playtime ----
        if (!empty) {
            this._rightText = new LOGICPULSE.UI.Text({
                text: playtime,
                x: timeStamp.x,
                y: timeStamp.y,
                width: this._slotWidth - timeStamp.x - 5,
                height: lineHeight,
                align: timeStamp.align || "right",
                fontSize: fontSize,
                fontFace: fontFace,
                textColor: textColor
            });
            this.addChild(this._rightText);
        }
    }

    updateSelection() {
        if (this._focused) {
            if (this._idleSprite) this._idleSprite.visible = false;
            if (this._hoverSprite) this._hoverSprite.visible = true;
        } else {
            if (this._idleSprite) this._idleSprite.visible = true;
            if (this._hoverSprite) this._hoverSprite.visible = false;
        }
    }

    // Override mouse enter/exit to use our sprites
    _onMouseEnter() {
        if (this._focused) return;
        if (this._isDestroyed || this.destroyed) return;
        this._isHovered = true;
        if (this._idleSprite) this._idleSprite.visible = false;
        if (this._hoverSprite) this._hoverSprite.visible = true;
        this._triggerEvent('hoverEnter', [this]);
    }
    _onMouseExit() {
        if (this._isDestroyed || this.destroyed) return;
        this._isHovered = false;
        if (!this._focused) {
            if (this._idleSprite) this._idleSprite.visible = true;
            if (this._hoverSprite) this._hoverSprite.visible = false;
        }
        this._triggerEvent('hoverExit', [this]);
    }

    updateText(entry) {
        this._entry = entry;
        if (this._leftText1) { this.removeChild(this._leftText1); this._leftText1 = null; }
        if (this._leftText2) { this.removeChild(this._leftText2); this._leftText2 = null; }
        if (this._rightText) { this.removeChild(this._rightText); this._rightText = null; }
        this.createContent();
    }

    destroy(options) {
        this._isDestroyed = true;
        if (this._leftText1) { this._leftText1.destroy(); this._leftText1 = null; }
        if (this._leftText2) { this._leftText2.destroy(); this._leftText2 = null; }
        if (this._rightText) { this._rightText.destroy(); this._rightText = null; }
        this._idleSprite = null;
        this._hoverSprite = null;
        super.destroy(options);
    }
};