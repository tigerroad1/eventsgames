-- src/uiBuilder.lua: Construction de l'interface

local widget = require("widget")
local config = require("config")
local themeManager = require("src.themeManager")
local fileExplorer = require("src.fileExplorer")
local textEditor = require("src.textEditor")
-- local aiAssistant = require("src.aiAssistant") -- Removed to match screenshot

local uiBuilder = {}

function uiBuilder.buildUI(sceneGroup) -- Accept the scene's group as an argument
    local theme = themeManager.getCurrentTheme()

    -- Groupe principal is now passed in, no need to create a new one.

    -- Fond
    local background = display.newRect(sceneGroup, display.contentCenterX, display.contentCenterY, display.actualContentWidth, display.actualContentHeight)
    background.fill = theme.background

    -- Barre d'icônes à l'extrême gauche
    local iconBarWidth = 50
    local iconBar = display.newRect(sceneGroup, 0, 0, iconBarWidth, display.actualContentHeight)
    iconBar.anchorX = 0
    iconBar.anchorY = 0
    iconBar.fill = theme.icon_bar_bg

    -- Ajout des icônes à la barre
    local icons = { "icon_explorer.png", "icon_search.png", "icon_git.png", "icon_debug.png" }
    local yPos = 30
    for i, iconFile in ipairs(icons) do
        local icon = display.newImageRect(sceneGroup, "icons/" .. iconFile, 24, 24)
        icon.x = iconBarWidth / 2
        icon.y = yPos
        yPos = yPos + 40
    end
    -- Settings icon at the bottom
    local settingsIcon = display.newImageRect(sceneGroup, "icons/icon_settings.png", 24, 24)
    settingsIcon.x = iconBarWidth / 2
    settingsIcon.y = display.actualContentHeight - 30

    -- Panneau gauche: Explorateur
    local explorerWidth = display.actualContentWidth * 0.2
    local leftPanel = display.newGroup()
    sceneGroup:insert(leftPanel)
    leftPanel.x, leftPanel.y = iconBarWidth, 0

    local leftPanelBg = display.newRect(leftPanel, 0, 0, explorerWidth, display.actualContentHeight)
    leftPanelBg.anchorX, leftPanelBg.anchorY = 0, 0
    leftPanelBg.fill = theme.sidebar
    fileExplorer.init(leftPanel)

    -- Panneau central: Éditeur
    local editorX = iconBarWidth + explorerWidth
    local editorWidth = display.actualContentWidth - editorX
    local centerPanel = display.newGroup()
    sceneGroup:insert(centerPanel)
    centerPanel.x, centerPanel.y = editorX, 0

    local centerPanelBg = display.newRect(centerPanel, 0, 0, editorWidth, display.actualContentHeight)
    centerPanelBg.anchorX, centerPanelBg.anchorY = 0, 0
    centerPanelBg.fill = theme.editor
    textEditor.init(centerPanel)

    -- Barre de statut inférieure
    local statusBarHeight = 22
    local statusBar = display.newGroup()
    sceneGroup:insert(statusBar)
    statusBar.x = 0
    statusBar.y = display.actualContentHeight - statusBarHeight

    local statusBarBg = display.newRect(statusBar, 0, 0, display.actualContentWidth, statusBarHeight)
    statusBarBg.anchorX, statusBarBg.anchorY = 0, 0
    statusBarBg.fill = theme.statusBar

    -- Helper to create status text
    local function createStatusText(parent, options)
        local text = display.newText({
            parent = parent,
            text = options.text,
            x = options.x,
            y = statusBarHeight / 2,
            font = config.font,
            fontSize = 12
        })
        text:setFillColor(unpack(theme.text))
        return text
    end

    -- Left side items
    local branchText = createStatusText(statusBar, { text = "main", x = iconBarWidth + 15 })
    branchText.anchorX = 0

    -- Right side items, positioned from the right edge
    local rightEdge = display.actualContentWidth - 15

    local saveText = createStatusText(statusBar, { text = "Save", x = rightEdge })
    saveText.anchorX = 1

    local langText = createStatusText(statusBar, { text = "TypeScript React", x = saveText.x - saveText.width - 15 })
    langText.anchorX = 1

    local encodingText = createStatusText(statusBar, { text = "UTF-8", x = langText.x - langText.width - 15 })
    encodingText.anchorX = 1

    local spacesText = createStatusText(statusBar, { text = "Spaces: 2", x = encodingText.x - encodingText.width - 15 })
    spacesText.anchorX = 1

    local lineColText = createStatusText(statusBar, { text = "Ln 1, Col 1", x = spacesText.x - spacesText.width - 15 })
    lineColText.anchorX = 1
end

return uiBuilder