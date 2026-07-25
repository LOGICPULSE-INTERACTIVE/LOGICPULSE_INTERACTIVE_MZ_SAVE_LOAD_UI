//=============================================================================
// LPBindings.js (specific to save/load)
//=============================================================================

LOGICPULSE.Bindings = LOGICPULSE.Bindings || {};
Object.assign(LOGICPULSE.Bindings, {
    MoveLeft: { action: "moveLeft", key: "left", name: "Move Left" },
    MoveRight: { action: "moveRight", key: "right", name: "Move Right" },
    MoveUp: { action: "moveUp", key: "up", name: "Move Up" },
    MoveDown: { action: "moveDown", key: "down", name: "Move Down" },
    Confirm: { action: "confirm", key: "ok", name: "Confirm" },
    Cancel: { action: "cancel", key: "cancel", name: "Cancel" },
    ToggleMode: { action: "toggleMode", key: "tab", name: "Toggle Save/Load Mode" }
});