/*:
 * @target MZ
 * @plugindesc LOGICPULSE Interactive Save/Load UI (18‑slot custom scene)
 * @author LOGICPULSE
 * @version 1.0.0
 *
 * @help
 * ============================================================================
 * LOGICPULSE Interactive MZ SaveandLoad UI — User Guide
 * ============================================================================
 *
 * This plugin replaces RPG Maker MZ’s default Save/Load scene with a fully
 * customisable 18‑slot grid interface using pictures, mouse support, and
 * keyboard navigation.
 *
 * All settings are adjustable via Plugin Manager.
 *
 * --------------------------------------------------------------------------
 * BACKGROUND & TAB PICTURES
 * --------------------------------------------------------------------------
 *
 * BackgroundPicture
 *     Full‑screen background image for the scene.
 *
 * SaveTabPicture
 *     Picture shown when the SAVE tab is active.
 *
 * LoadTabPicture
 *     Picture shown when the LOAD tab is active.
 *
 * SlotBaseName
 *     Base filename for slot pictures. The plugin automatically appends
 *     two‑digit numbers: e.g. SAVE_LOAD_SLOT_01, SAVE_LOAD_SLOT_02, etc.
 *
 * SlotCount
 *     Number of save slots. Default is 18.
 *
 * --------------------------------------------------------------------------
 * GRID SYSTEM (Slot Positioning)
 * --------------------------------------------------------------------------
 *
 * The plugin uses a grid system to position slot content (pictures and text).
 * Each grid cell is a fixed pixel size (default 48×48). Text is drawn relative
 * to the grid coordinates.
 *
 * FirstColumnGridX
 *     Grid X position for the first column of slots.
 *
 * SecondColumnGridX
 *     Grid X position for the second column of slots.
 *
 * FirstRowGridY
 *     Grid Y position for the first slot row.
 *
 * GridCellSize
 *     Pixel size of each grid cell.
 *
 * VerticalOffset
 *     Vertical offset applied to text inside each slot (fraction of cell).
 *
 * --------------------------------------------------------------------------
 * TEXT POSITIONING (within each slot)
 * --------------------------------------------------------------------------
 *
 * LeftTextOffsetX
 *     Horizontal offset for the left‑side text (map name + level).
 *
 * RightTextOffsetX
 *     Horizontal offset for the right‑side text (playtime).
 *
 * SecondColumnExtraOffsetX
 *     Extra horizontal offset applied ONLY to left text in column 2.
 *
 * SecondColumnRightExtraOffsetX
 *     Extra horizontal offset applied ONLY to right text in column 2.
 *
 * FontFace
 *     Custom font name. Leave empty for default.
 *
 * FontSize
 *     Size of the text drawn inside each slot.
 *
 * TextColor
 *     Color of the text in CSS format (e.g., #FFFFFF).
 *
 * --------------------------------------------------------------------------
 * SOUND EFFECTS
 * --------------------------------------------------------------------------
 *
 * CursorSE
 *     Sound played when moving between slots.
 *
 * OkSE
 *     Sound played when saving or loading.
 *
 * CancelSE
 *     Sound played when cancelling.
 *
 * BuzzerSE
 *     Sound played when trying to load an empty slot.
 *
 * --------------------------------------------------------------------------
 * HOW THE SYSTEM WORKS
 * --------------------------------------------------------------------------
 *
 * • The scene displays a background image and a SAVE or LOAD tab picture.
 * • Each slot is a full‑screen sprite (opacity toggled on selection) with
 *   text overlay.
 * • LEFT/RIGHT toggles between SAVE and LOAD modes.
 * • UP/DOWN moves between slots.
 * • OK saves or loads:
 *     - SAVE mode: saves to the selected slot.
 *     - LOAD mode: loads the selected slot (if occupied).
 * • Empty slots cannot be loaded; OK plays the buzzer.
 * • Text updates automatically after saving.
 * • Mouse click on a slot selects it; double‑click (or click + OK) triggers
 *   save/load.
 *
 * --------------------------------------------------------------------------
 * SCRIPT CALL
 * --------------------------------------------------------------------------
 *
 * To open the Save/Load UI from anywhere:
 *
 *     SceneManager.push(LOGICPULSE.Scenes.SaveLoad);
 *
 * ============================================================================
 * END OF HELP
 * ============================================================================
 *
 * @param BackgroundPicture
 * @text Background Picture
 * @type file
 * @dir img/LOGICPULSE_INTERACTIVE UI/Save_Load_UI
 * @default SAVE_LOAD Menu
 *
 * @param SaveTabPicture
 * @text Save Tab Picture
 * @type file
 * @dir img/LOGICPULSE_INTERACTIVE UI/Save_Load_UI
 * @default SAVE_Tab
 *
 * @param LoadTabPicture
 * @text Load Tab Picture
 * @type file
 * @dir img/LOGICPULSE_INTERACTIVE UI/Save_Load_UI
 * @default LOAD_Tab
 *
 * @param SlotBaseName
 * @text Slot Picture Base Name
 * @desc Base name for slot pictures, e.g. SAVE_LOAD_SLOT_
 * @default SAVE_LOAD_SLOT_
 *
 * @param SlotCount
 * @text Slot Count
 * @type number
 * @min 1
 * @max 99
 * @default 18
 *
 * @param FirstColumnGridX
 * @text First Column Grid X
 * @type number
 * @default 7
 *
 * @param SecondColumnGridX
 * @text Second Column Grid X
 * @type number
 * @default 14
 *
 * @param FirstRowGridY
 * @text First Row Grid Y
 * @type number
 * @default 6
 *
 * @param GridCellSize
 * @text Grid Cell Size (px)
 * @type number
 * @default 48
 *
 * @param VerticalOffset
 * @text Vertical Offset (grid cells)
 * @desc e.g. -0.5 to move text up
 * @type number
 * @decimals 2
 * @default -0.5
 *
 * @param LeftTextOffsetX
 * @text Left Text Offset X (px)
 * @type number
 * @default -50
 *
 * @param RightTextOffsetX
 * @text Right Text Offset X (px)
 * @type number
 * @default -2
 *
 * @param SecondColumnExtraOffsetX
 * @text Second Column Extra Offset X (px)
 * @type number
 * @default 10
 *
 * @param SecondColumnRightExtraOffsetX
 * @text Second Column Right Text Extra Offset X (px)
 * @type number
 * @default 4
 *
 * @param FontFace
 * @text Font Face
 * @desc Leave empty for default
 * @default
 *
 * @param FontSize
 * @text Font Size
 * @type number
 * @default 16
 *
 * @param TextColor
 * @text Text Color (CSS)
 * @default #FFFFFF
 *
 * @param CursorSE
 * @text Cursor SE
 * @type file
 * @dir audio/se
 * @default Cursor1
 *
 * @param OkSE
 * @text OK SE
 * @type file
 * @dir audio/se
 * @default Decision1
 *
 * @param CancelSE
 * @text Cancel SE
 * @type file
 * @dir audio/se
 * @default Cancel2
 *
 * @param BuzzerSE
 * @text Buzzer SE
 * @type file
 * @dir audio/se
 * @default Buzzer1
 */
