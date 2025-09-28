local composer = require("composer")
local uiBuilder = require("src.uiBuilder")

local scene = composer.newScene()

-- -----------------------------------------------------------------------------------
-- Scene event functions
-- -----------------------------------------------------------------------------------

-- create()
function scene:create(event)
    local sceneGroup = self.view
    -- This is where the UI for the scene is built.
    -- We pass the scene's view group to the UI builder.
    uiBuilder.buildUI(sceneGroup)
end

-- show()
function scene:show(event)
    local sceneGroup = self.view
    local phase = event.phase

    if (phase == "will") then
        -- Code here runs when the scene is still off screen (but is about to come on screen)
    elseif (phase == "did") then
        -- Code here runs when the scene is entirely on screen
    end
end

-- hide()
function scene:hide(event)
    local sceneGroup = self.view
    local phase = event.phase

    if (phase == "will") then
        -- Code here runs when the scene is on screen (but is about to go off screen)
    elseif (phase == "did") then
        -- Code here runs immediately after the scene has finished transitioning off screen
        -- A common practice is to remove the scene from memory here
        composer.removeScene("interface")
    end
end

-- destroy()
function scene:destroy(event)
    local sceneGroup = self.view
    -- Code here runs prior to the removal of scene's view
end

-- -----------------------------------------------------------------------------------
-- Scene event listeners
-- -----------------------------------------------------------------------------------
scene:addEventListener("create", scene)
scene:addEventListener("show", scene)
scene:addEventListener("hide", scene)
scene:addEventListener("destroy", scene)
-- -----------------------------------------------------------------------------------

return scene