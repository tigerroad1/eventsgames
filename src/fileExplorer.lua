-- src/fileExplorer.lua: Explorateur de fichiers

-- local lfs = require("lfs") -- Removed as it's not used and was causing a crash
local widget = require("widget")
local config = require("config")
local themeManager = require("src.themeManager")

local fileExplorer = {}

local treeGroup
local currentDir = system.DocumentsDirectory -- Default, can be changed

function fileExplorer.init(parent)
    local theme = themeManager.getCurrentTheme()

    -- ScrollView for the file list
    local scrollView = widget.newScrollView({
        top = 0,
        left = 0,
        width = parent.width,
        height = parent.height,
        horizontalScrollDisabled = true,
    })
    parent:insert(scrollView)

    treeGroup = display.newGroup()
    scrollView:insert(treeGroup)

    -- Section Title (e.g., "SRC" like in the picture)
    local title = display.newText({
        parent = treeGroup,
        text = "SRC", -- Changed from EXPLORATEUR
        x = 10,
        y = 20,
        font = config.font,
        fontSize = 11
    })
    title.anchorX = 0
    title:setFillColor(unpack(theme.text))

    -- For the demo, let's just create a few fake files to match the UI,
    -- as LFS on device might not have a nice project structure.
    -- This makes the demo predictable and identical to the image.
    local fakeFiles = {
        { name = "App.tsx", isDir = false, level = 1 },
        { name = "index.css", isDir = false, level = 1 },
        { name = "main.tsx", isDir = false, level = 1 }
    }

    local yPos = 45
    local indentSize = 20

    for _, file in ipairs(fakeFiles) do
        local xPos = 10 + (file.level * indentSize)

        -- Icon
        local iconName = file.isDir and "folder.png" or "file.png"
        local icon = display.newImageRect(treeGroup, "icons/"..iconName, 16, 16)
        icon.x = xPos
        icon.y = yPos
        icon.anchorX = 0

        -- Label
        local label = display.newText({
            parent = treeGroup,
            text = file.name,
            x = xPos + 22,
            y = yPos,
            font = config.font,
            fontSize = 13,
            align = "left"
        })
        label.anchorX = 0
        label:setFillColor(unpack(theme.text))

        -- Create a tappable area
        local tapArea = display.newRect(treeGroup, 5, yPos - 12, parent.width - 10, 24)
        tapArea.anchorX = 0
        tapArea.isSensor = true -- makes it invisible
        tapArea.filePath = file.name -- In a real app, this would be the full path

        function tapArea:tap(event)
             -- For this demo, we'll use a fake file path to open
             local mockPath = system.pathForFile(self.filePath, system.DocumentsDirectory)
             local file = io.open(mockPath, "w")
             if file then
                -- Write some dummy content to simulate opening a real file
                if self.filePath == "App.tsx" then
                    file:write([[
import React, { useState } from 'react';
import './index.css';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR updates.
        </p>
      </div>
    </div>
  );
};

export default App;
                    ]])
                else
                    file:write("File content for: " .. self.filePath)
                end
                file:close()
                require("src.textEditor").openFile(mockPath)
             end
        end
        tapArea:addEventListener("tap", tapArea)

        yPos = yPos + 25
    end
end

return fileExplorer