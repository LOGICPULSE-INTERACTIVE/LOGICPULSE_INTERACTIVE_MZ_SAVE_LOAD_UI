//=============================================================================
// Main.js
//=============================================================================

if (!LOGICPULSE.CoreVersion) {
    throw new Error("LOGICPULSE_Core is required for this plugin.");
}

LOGICPULSE.Assets.loadSaveLoadParams();

(function() {

    var _SceneManager_create = SceneManager.create;
    SceneManager.create = function() {
        _SceneManager_create.call(this);
        if (LOGICPULSE.SaveLoadProvider && !LOGICPULSE.SaveLoadProvider._initialized) {
            if (DataManager.isDatabaseLoaded()) {
                LOGICPULSE.SaveLoadProvider.initialize();
            } else {
                setTimeout(function() {
                    if (DataManager.isDatabaseLoaded()) {
                        LOGICPULSE.SaveLoadProvider.initialize();
                    }
                }, 100);
            }
        }
    };
// ============================================================================
// Add gold and level to the save file header (makeSaveFileInfo)
// ============================================================================
    (function() {

        var _orig = DataManager.makeSaveFileInfo;
        DataManager.makeSaveFileInfo = function() {
            var info = _orig.call(this);
            var leader = $gameParty.leader();
            info.level = leader ? leader.level : 0;
            info.gold = $gameParty.gold();
            console.log('[SAVE_LOAD] Header saved – level:', info.level, 'gold:', info.gold);
            return info;
        };
    })();
})();

console.log('[LOGICPULSE] Save/Load plugin loaded.');