//=============================================================================
// LPAssets.js (plugin-specific folders/images)
//=============================================================================

// Augment core's Assets with our own folders and images
LOGICPULSE.Assets.Folders.SaveLoad = "img/LOGICPULSE_INTERACTIVE UI/Save_Load_UI/";

LOGICPULSE.Assets.Images.SaveLoad = {
    Background: "Background",
    SaveTabIdle: "Save Tab Idle",
    SaveTabHover: "Save Tab Hover",
    LoadTabIdle: "Load Tab Idle",
    LoadTabHover: "Load Tab Hover",
    SlotIdle: "Slot Box Idle",
    SlotHover: "Slot Box Hover"
};

// Plugin-specific parameters
LOGICPULSE.Assets._saveLoadParams = null;

LOGICPULSE.Assets.loadSaveLoadParams = function() {
    var p = PluginManager.parameters("LOGICPULSE_INTERACTIVE_MZ_SAVE_LOAD_UI");
    this._saveLoadParams = {
        FirstColumnGridX: Number(p.FirstColumnGridX || 7),
        SecondColumnGridX: Number(p.SecondColumnGridX || 14),
        FirstRowGridY: Number(p.FirstRowGridY || 6),
        GridCellSize: Number(p.GridCellSize || 48),
        VerticalOffset: Number(p.VerticalOffset || -0.5),
        LeftTextOffsetX: Number(p.LeftTextOffsetX || -50),
        RightTextOffsetX: Number(p.RightTextOffsetX || -2),
        SecondColumnExtraOffsetX: Number(p.SecondColumnExtraOffsetX || 10),
        SecondColumnRightExtraOffsetX: Number(p.SecondColumnRightExtraOffsetX || 4),
        FontFace: String(p.FontFace || ""),
        FontSize: Number(p.FontSize || 16),
        TextColor: String(p.TextColor || "#FFFFFF"),
        CursorSE: String(p.CursorSE || "Cursor1"),
        OkSE: String(p.OkSE || "Decision1"),
        CancelSE: String(p.CancelSE || "Cancel2"),
        BuzzerSE: String(p.BuzzerSE || "Buzzer1")
    };
    return this._saveLoadParams;
};

LOGICPULSE.Assets.getSaveLoadParams = function() {
    if (!this._saveLoadParams) this.loadSaveLoadParams();
    return this._saveLoadParams;
};