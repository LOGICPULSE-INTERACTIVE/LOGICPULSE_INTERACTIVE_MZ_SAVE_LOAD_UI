//=============================================================================
// LPSaveLoadProvider.js
//=============================================================================

LOGICPULSE.SaveLoadProvider = {
    _globalInfo: [],
    _metadata: {},
    _initialized: false,

    initialize: function() {
        if (this._initialized) return;
        if (!DataManager.isDatabaseLoaded()) return;
        this.reloadInfo();
        this.loadMetadata();
        this._initialized = true;

    },

    reloadInfo: function() {
        DataManager.loadGlobalInfo();
        this._globalInfo = DataManager._globalInfo || [];
        this.loadMetadata();  // <-- add this

    },

    loadMetadata: function() {
        var data = localStorage.getItem('save_metadata');

        if (data) {
            try {
                this._metadata = JSON.parse(data);

            } catch(e) {

                this._metadata = {};
            }
        } else {

            this._metadata = {};
        }
    },

    saveMetadata: function() {
        localStorage.setItem('save_metadata', JSON.stringify(this._metadata));
    },

    getMetadataForSlot: function(slotId) {
        return this._metadata[slotId] || { gold: 0, level: 0 };
    },

    setMetadataForSlot: function(slotId, gold, level) {
        this._metadata[slotId] = { gold: gold, level: level };
        this.saveMetadata();
    },

    getSlotInfo: function(slotId) {
        return this._globalInfo[slotId] || null;
    },

    getSlotDisplayData: function(slotId) {
        var info = this.getSlotInfo(slotId);
        var meta = this.getMetadataForSlot(slotId);

        if (!info) {
            return {
                empty: true,
                title: "Empty",
                playtime: "",
                level: meta.level || 0,
                gold: meta.gold || 0
            };
        }
        return {
            empty: false,
            title: info.title || "Unknown",
            playtime: info.playtime || "",
            level: meta.level || 0,
            gold: meta.gold || 0
        };
    },

    saveGame: function(slotId) {
        DataManager.saveGame(slotId);
        this.reloadInfo();
    },

    loadGame: function(slotId) {
        return DataManager.loadGame(slotId);
    },

    isSlotOccupied: function(slotId) {
        return !!this._globalInfo[slotId];
    }
};