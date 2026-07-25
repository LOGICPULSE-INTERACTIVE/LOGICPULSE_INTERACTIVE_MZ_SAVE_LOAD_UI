//=============================================================================
// LPSaveLoadScene.js (uses our grid and core UI)
//=============================================================================

LOGICPULSE.Scenes.SaveLoad = class extends Scene_MenuBase {
    initialize() {
        super.initialize();
        this._provider = LOGICPULSE.SaveLoadProvider;
        this._controller = null;
        this._grid = null;
        this._background = null;
        this._saveTab = null;
        this._loadTab = null;
        this._saveTabHover = null;
        this._loadTabHover = null;
        this._saveTabIdle = null;
        this._loadTabIdle = null;
        this._params = LOGICPULSE.Assets.getSaveLoadParams();
    }

    create() {

        this._provider.reloadInfo();

        super.create();

        // Fallback dark background
        var bgFill = new Sprite();
        bgFill.bitmap = new Bitmap(Graphics.width, Graphics.height);
        bgFill.bitmap.fillAll("#0a0a1a");
        this.addChildAt(bgFill, 0);

        this.createBackground();
        this.createTabs();
        this.createGrid();
        this.createController();
        this.updateTabVisuals();
        this.refreshAllSlots();
    }

    createBackground() {
        var folder = LOGICPULSE.Assets.Folders.SaveLoad;
        var bgName = LOGICPULSE.Assets.Images.SaveLoad.Background;
        var bg = LOGICPULSE.Assets.createSprite(folder, bgName);
        if (!bg.bitmap || bg.bitmap.isError()) {
            bg.bitmap = new Bitmap(Graphics.width, Graphics.height);
            bg.bitmap.fillAll("#0a0a0a");
            console.warn('[LOGICPULSE] Background missing, fallback color.');
        }
        this._background = bg;
        this.addChild(bg);
    }

    createTabs() {
        var folder = LOGICPULSE.Assets.Folders.SaveLoad;
        var saveIdle = LOGICPULSE.Assets.Images.SaveLoad.SaveTabIdle;
        var saveHover = LOGICPULSE.Assets.Images.SaveLoad.SaveTabHover;
        var loadIdle = LOGICPULSE.Assets.Images.SaveLoad.LoadTabIdle;
        var loadHover = LOGICPULSE.Assets.Images.SaveLoad.LoadTabHover;

        this._saveTab = LOGICPULSE.Assets.createSprite(folder, saveIdle);
        this._saveTab.x = LOGICPULSE.Layout.SaveLoad.Tabs.SaveTab.x;
        this._saveTab.y = LOGICPULSE.Layout.SaveLoad.Tabs.SaveTab.y;
        this._saveTab.width = LOGICPULSE.Layout.SaveLoad.Tabs.SaveTab.width;
        this._saveTab.height = LOGICPULSE.Layout.SaveLoad.Tabs.SaveTab.height;
        this.addChild(this._saveTab);

        this._loadTab = LOGICPULSE.Assets.createSprite(folder, loadIdle);
        this._loadTab.x = LOGICPULSE.Layout.SaveLoad.Tabs.LoadTab.x;
        this._loadTab.y = LOGICPULSE.Layout.SaveLoad.Tabs.LoadTab.y;
        this._loadTab.width = LOGICPULSE.Layout.SaveLoad.Tabs.LoadTab.width;
        this._loadTab.height = LOGICPULSE.Layout.SaveLoad.Tabs.LoadTab.height;
        this.addChild(this._loadTab);

        this._saveTabHover = LOGICPULSE.Assets.load(folder, saveHover);
        this._loadTabHover = LOGICPULSE.Assets.load(folder, loadHover);
        this._saveTabIdle = this._saveTab.bitmap;
        this._loadTabIdle = this._loadTab.bitmap;
    }

    createGrid() {
        this._provider.reloadInfo();

        var gridLayout = LOGICPULSE.Layout.SaveLoad.Grid;
        var totalSlots = gridLayout.totalSlots || 100;
        var self = this;

        function provider(grid) {
            var entries = [];
            for (var i = 0; i < totalSlots; i++) {
                var slotId = i + 1;
                var info = self._provider.getSlotDisplayData(slotId);
                entries.push(info);
            }

            return entries;
        }

        this._grid = new LOGICPULSE.UI.SaveLoadGrid(gridLayout, { provider: provider });
        this._grid.x = 0;
        this._grid.y = 0;
        this.addChild(this._grid);
    }

    createController() {
        this._controller = new LOGICPULSE.SaveLoadController(this);
        this._controller.setSelectedIndex(0);
    }

    updateTabVisuals() {
        if (!this._controller) return;
        var mode = this._controller.getMode();
        this._saveTab.bitmap = (mode === LOGICPULSE.Constants.SaveLoad.ModeSave) ? this._saveTabHover : this._saveTabIdle;
        this._loadTab.bitmap = (mode === LOGICPULSE.Constants.SaveLoad.ModeLoad) ? this._loadTabHover : this._loadTabIdle;
    }

    refreshAllSlots() {
        if (!this._grid) return;
        this._grid.buildGrid();
        var idx = this._controller ? this._controller.getSelectedIndex() : 0;
        this._grid.setSelectedIndex(idx);
        this._grid.updateViewport();
    }

    onCancel() {
        SceneManager.pop();
    }

    update() {
        super.update();
        this._updateTabHover();
        if (this._controller) this._controller.update();
        if (this._grid) this._grid.update();
        LOGICPULSE.Mouse.update();

        // Manual click handling – ensures slots are selectable even if core mouse fails
        // Manual click handling with confirm on double-click (or second click)
        if (TouchInput.isTriggered()) {
            var x = TouchInput.x;
            var y = TouchInput.y;
            var slot = this._grid.getSlotAt(x, y);
            if (slot) {
                var index = this._grid._slots.indexOf(slot);
                if (index >= 0) {
                    var currentSelected = this._grid.selectedIndex();
                    if (currentSelected === index) {
                        // Already selected -> confirm (save/load)
                        if (this._controller && this._controller.onConfirm) {
                            this._controller.onConfirm();
                        }
                    } else {
                        // Select the new slot
                        this._grid.setSelectedIndex(index);
                        this._controller.setSelectedIndex(index);
                    }
                }
            }
        }
    }

    _updateTabHover() {
        var mx = LOGICPULSE.Mouse.x();
        var my = LOGICPULSE.Mouse.y();
        var saveRect = LOGICPULSE.Layout.SaveLoad.Tabs.SaveTab;
        var loadRect = LOGICPULSE.Layout.SaveLoad.Tabs.LoadTab;
        var saveHover = this._isPointInRect(mx, my, saveRect);
        var loadHover = this._isPointInRect(mx, my, loadRect);
        var mode = this._controller ? this._controller.getMode() : LOGICPULSE.Constants.SaveLoad.ModeSave;

        if (saveHover) {
            this._saveTab.bitmap = this._saveTabHover;
        } else {
            this._saveTab.bitmap = (mode === LOGICPULSE.Constants.SaveLoad.ModeSave) ? this._saveTabHover : this._saveTabIdle;
        }
        if (loadHover) {
            this._loadTab.bitmap = this._loadTabHover;
        } else {
            this._loadTab.bitmap = (mode === LOGICPULSE.Constants.SaveLoad.ModeLoad) ? this._loadTabHover : this._loadTabIdle;
        }

        if (TouchInput.isTriggered()) {
            if (saveHover && this._controller) {
                this._controller.setMode(LOGICPULSE.Constants.SaveLoad.ModeSave);
            } else if (loadHover && this._controller) {
                this._controller.setMode(LOGICPULSE.Constants.SaveLoad.ModeLoad);
            }
        }
    }

    _isPointInRect(x, y, rect) {
        return x >= rect.x && x <= rect.x + rect.width &&
            y >= rect.y && y <= rect.y + rect.height;
    }

    destroy(options) {
        this._controller = null;
        this._grid = null;
        this._background = null;
        super.destroy(options);
    }
};