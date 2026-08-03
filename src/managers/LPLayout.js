//=============================================================================
// LPLayout.js
//=============================================================================

LOGICPULSE.Layout = LOGICPULSE.Layout || {};
LOGICPULSE.Layout.SaveLoad = {

    Tabs: {
        SaveTab: {
            x: 313,
            y: 117,
            width: 390,
            height: 98
        },
        LoadTab: {
            x: 578,
            y: 117,
            width: 390,
            height: 98
        }
    },

    Grid: {
        rect: { x: 320, y: 240, width: 644, height: 438 },
        mask: { x: 320, y: 240, width: 644, height: 438 },
        PartyData: { x: 4, y: 3, spacingY: 5, align: "left"},
        TimeStamp: { x: 0, y: 15, align: "right",},
        columns: 2,
        slotWidth: 300,
        slotHeight: 50,
        spacingX: 340,
        spacingY: 55,
        totalSlots: 100
    },

};