-- src/textEditor.lua: Éditeur de texte

local widget = require("widget")
local config = require("config")
local themeManager = require("src.themeManager")

local textEditor = {}

local editorGroup
local tabGroup
local lineNumbersGroup
local editorScrollView
local openFiles = {} -- To track open files and their text fields
local activeFile = nil

local function updateLineNumbers()
    -- Implementation from before, but needs to target the active editor
    if not activeFile or not openFiles[activeFile] then return end

    local textField = openFiles[activeFile].textField
    local lines = {}
    for line in textField.text:gmatch("([^\n]*)\n?") do
        table.insert(lines, line)
    end

    -- Effacer anciens
    for i = lineNumbersGroup.numChildren, 1, -1 do
        lineNumbersGroup[i]:removeSelf()
    end

    local theme = themeManager.getCurrentTheme()
    for i = 1, #lines do
        local num = display.newText({
            parent = lineNumbersGroup,
            text = i,
            x = 25,
            y = (i - 1) * config.lineHeight + (config.lineHeight / 2),
            font = config.font,
            fontSize = config.fontSize - 2,
            align = "right"
        })
        num.anchorX = 1
        num:setFillColor(unpack(theme.lineNumber))
    end
end

local function renderTabs()
    -- Clear existing tabs
    for i = tabGroup.numChildren, 1, -1 do
        tabGroup[i]:removeSelf()
    end

    local theme = themeManager.getCurrentTheme()
    local xPos = 0
    for path, fileData in pairs(openFiles) do
        local tabWidth = 120 -- Fixed width for now
        local isActive = (path == activeFile)

        local tabRect = display.newRect(tabGroup, xPos, 0, tabWidth, 30)
        tabRect.anchorX = 0
        tabRect.anchorY = 0
        tabRect.fill = isActive and theme.tab_active_bg or theme.tab_inactive_bg

        local filename = path:match("([^/]+)$") -- Get just the filename
        local tabLabel = display.newText({
            parent = tabGroup,
            text = filename,
            x = xPos + tabWidth / 2,
            y = 15,
            font = config.font,
            fontSize = 12
        })
        tabLabel:setFillColor(unpack(theme.text))

        -- Close button 'x'
        local closeButton = display.newText(tabGroup, "x", xPos + tabWidth - 15, 15, native.systemFont, 12)
        closeButton:setFillColor(unpack(theme.text))

        tabRect.filePath = path
        function tabRect:tap(event)
            textEditor.openFile(self.filePath)
        end
        tabRect:addEventListener("tap", tabRect)

        xPos = xPos + tabWidth + 1 -- 1px separator
    end
end

function textEditor.init(parent)
    editorGroup = display.newGroup()
    parent:insert(editorGroup)

    local theme = themeManager.getCurrentTheme()

    -- Tab bar
    tabGroup = display.newGroup()
    editorGroup:insert(tabGroup)
    tabGroup.x, tabGroup.y = 0, 0

    local tabBg = display.newRect(tabGroup, 0, 0, parent.width, 30)
    tabBg.anchorX, tabBg.anchorY = 0, 0
    tabBg.fill = theme.sidebar -- A base color for the tab bar area

    -- ScrollView for the editor content
    editorScrollView = widget.newScrollView({
        left = 0,
        top = 30, -- Position below the tab bar
        width = parent.width,
        height = parent.height - 30, -- Adjust height for tab bar
        horizontalScrollDisabled = false,
        verticalScrollDisabled = false
    })
    editorGroup:insert(editorScrollView)

    -- Group for line numbers
    lineNumbersGroup = display.newGroup()
    editorScrollView:insert(lineNumbersGroup)
    lineNumbersGroup.x = 0
    lineNumbersGroup.y = 0
end

function textEditor.openFile(path)
    if activeFile and openFiles[activeFile] then
        openFiles[activeFile].textField.isVisible = false
    end

    if not openFiles[path] then
        -- File not open yet, create a new text field for it
        local file = io.open(path, "r")
        if not file then return end

        local content = file:read("*a")
        file:close()

        local theme = themeManager.getCurrentTheme()
        local textField = native.newTextBox(40, 0, editorScrollView.width - 40, 2000) -- Large height for scrolling
        textField.text = content
        textField.isEditable = true
        textField.hasBackground = false
        textField.font = native.newFont(config.font, config.fontSize)
        textField:setTextColor(unpack(theme.text))
        editorScrollView:insert(textField)

        openFiles[path] = { textField = textField, content = content }
    end

    -- Set as active
    activeFile = path
    openFiles[path].textField.isVisible = true

    renderTabs()
    updateLineNumbers()
end

function textEditor.highlightSyntax()
    print("Syntax highlighting not fully implemented in this version.")
end

function textEditor.saveFile()
    if not activeFile or not openFiles[activeFile] then return end

    local fileData = openFiles[activeFile]
    local file = io.open(activeFile, "w")
    if file then
        file:write(fileData.textField.text)
        file:close()
        print("File saved: " .. activeFile)
        -- Here you could also update a status bar message
    else
        print("Error saving file: " .. activeFile)
    end
end

function textEditor.newFile()
    -- Create a unique name for the new file
    local newIndex = 1
    while openFiles["Untitled-"..newIndex..".txt"] do
        newIndex = newIndex + 1
    end
    local newFileName = "Untitled-"..newIndex..".txt"
    local newFilePath = system.pathForFile(newFileName, system.DocumentsDirectory)

    -- This will effectively "open" a new, blank file
    local file = io.open(newFilePath, "w")
    if file then
        file:write("")
        file:close()
        textEditor.openFile(newFilePath)
    end
end

return textEditor