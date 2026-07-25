"use strict";

module.exports = [

    //=========================================================================
    // 1. CORE
    //=========================================================================

    "src/Header.js",
    "src/Version.js",
    "src/Constants.js",

    //=========================================================================
    // 2. BASE MANAGERS (no dependencies)
    //=========================================================================

    "src/managers/LPAssets.js",          // Asset loading
    "src/managers/LPLayout.js",          // Layout definitions

    //=========================================================================
    // 3. Key bindings
    //=========================================================================

    "src/managers/LPBindings.js",        // Key bindings

    //=========================================================================
    // 4. PROVIDER (data layer)
    //=========================================================================

    "src/managers/LPSaveLoadProvider.js",    // PROVIDER (data layer)


    //=========================================================================
    // 5. CONTROLLER (depends on Provider, Input, Bindings)
    //=========================================================================

    "src/managers/LPSaveLoadController.js",  // Tab switching, focus, cart logic


    //=========================================================================
    // 6. GRID COMPONENTS (depends on UIElement, Text, etc.)
    //=========================================================================

    "src/ui/LPGridSlot.js",              // Individual grid slot
    "src/ui/LPGrid.js",                  // Grid logic (selection, scroll)

    //=========================================================================
    // 7. SCENE (depends on everything)
    //=========================================================================

    "src/scenes/LPSaveLoadScene.js",         // Full shop scene

    //=========================================================================
    // 8. ENTRY POINT
    //=========================================================================

    "src/Main.js"                        // Plugin entry point

];