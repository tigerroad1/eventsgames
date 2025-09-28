-- src/inputHandler.lua: Gestion des entrées

local inputHandler = {}

function inputHandler.init()
    Runtime:addEventListener("key", inputHandler.onKey)
    -- Ajouter touch, etc.
end

function inputHandler.onKey(event)
    if event.phase == "down" then
        -- Gérer raccourcis
        if event.keyName == "s" and (event.isCtrlDown or event.isCommandDown) then
            -- Sauvegarder
            require("src.textEditor").saveFile()
        elseif event.keyName == "n" and (event.isCtrlDown or event.isCommandDown) then
            -- Nouveau
            require("src.textEditor").newFile()
        end
        -- Ajouter plus selon liste
    end
end

return inputHandler