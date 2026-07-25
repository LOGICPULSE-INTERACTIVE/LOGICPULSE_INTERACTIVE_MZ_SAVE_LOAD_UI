LOGICPULSE.SaveLoadController = class {
    constructor(scene) {
        this._scene = scene;
        this._provider = LOGICPULSE.SaveLoadProvider;
        this._mode = LOGICPULSE.Constants.SaveLoad.ModeSave;
    }

    get _grid() {
        return this._scene._grid;
    }

    update() {
        this._processInput();
    }

    _processInput() {
        var B = LOGICPULSE.Bindings;
        var grid = this._grid;
        if (!grid) return;

        if (LOGICPULSE.Input.isRepeated(B.MoveUp)) {
            grid.moveUp();
        } else if (LOGICPULSE.Input.isRepeated(B.MoveDown)) {
            grid.moveDown();
        } else if (LOGICPULSE.Input.isRepeated(B.MoveLeft)) {
            grid.moveLeft();
        } else if (LOGICPULSE.Input.isRepeated(B.MoveRight)) {
            grid.moveRight();
        } else if (LOGICPULSE.Input.isTriggered(B.ToggleMode)) {
            this.toggleMode();
        } else if (LOGICPULSE.Input.isTriggered(B.Confirm)) {
            this.onConfirm();
        } else if (LOGICPULSE.Input.isTriggered(B.Cancel)) {
            this._scene.onCancel();
        }
    }

    toggleMode() {
        var newMode = (this._mode === LOGICPULSE.Constants.SaveLoad.ModeSave)
            ? LOGICPULSE.Constants.SaveLoad.ModeLoad
            : LOGICPULSE.Constants.SaveLoad.ModeSave;
        this.setMode(newMode);
    }

    setMode(mode) {
        this._mode = mode;
        this._scene.updateTabVisuals();
        var params = LOGICPULSE.Assets.getSaveLoadParams();
        AudioManager.playSe({ name: params.CursorSE, volume: 90, pitch: 100, pan: 0 });
    }

    onConfirm() {
        var grid = this._grid;
        if (!grid) return;
        var slotId = grid.selectedIndex() + 1;
        var occupied = this._provider.isSlotOccupied(slotId);
        var params = LOGICPULSE.Assets.getSaveLoadParams();

        if (this._mode === LOGICPULSE.Constants.SaveLoad.ModeSave) {
            // 1. Save the game normally
            DataManager.saveGame(slotId);
            // 2. Capture current gold and level
            var leader = $gameParty.leader();
            var gold = $gameParty.gold();
            var level = leader ? leader.level : 0;
            // 3. Store in metadata
            this._provider.setMetadataForSlot(slotId, gold, level);
            // 4. Play sound and refresh
            AudioManager.playSe({ name: params.OkSE, volume: 90, pitch: 100, pan: 0 });
            var scene = this._scene;
            var provider = this._provider;
            setTimeout(function() {
                provider.reloadInfo();
                scene.refreshAllSlots();
            }, 150);
        } else {
            // Load mode unchanged
            if (!occupied) {
                AudioManager.playSe({ name: params.BuzzerSE, volume: 90, pitch: 100, pan: 0 });
                return;
            }
            if (this._provider.loadGame(slotId)) {
                AudioManager.playSe({ name: params.OkSE, volume: 90, pitch: 100, pan: 0 });
                Scene_Load.prototype.reloadMapIfUpdated.call(SceneManager._scene);
                SceneManager.goto(Scene_Map);
            }
        }
    }

    // --- Stubs for core mouse integration ---
    onSelectionChanged() {
        // No-op – only one grid
    }

    _applyFocus(focus) {
        // No-op – only one grid
    }

    // --- Getters / Setters ---
    getMode() {
        return this._mode;
    }

    getSelectedIndex() {
        return this._grid ? this._grid.selectedIndex() : 0;
    }

    setSelectedIndex(index) {
        if (this._grid) {
            this._grid.setSelectedIndex(index);
        }
    }
};