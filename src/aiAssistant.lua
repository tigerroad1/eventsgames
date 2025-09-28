-- src/aiAssistant.lua: Assistant IA

local json = require("json")
local network = require("network")
local config = require("config")
local theme = require("src.themeManager").getCurrentTheme()

local aiAssistant = {}

local chatGroup
local inputField
local messages = {}

function aiAssistant.init(parent)
    chatGroup = display.newGroup()
    parent:insert(chatGroup)

    -- Titre
    local title = display.newText({
        parent = chatGroup,
        text = "Assistant IA",
        x = parent.width / 2,
        y = 20,
        font = config.font,
        fontSize = 14
    })
    title:setFillColor(unpack(theme.text))

    -- Zone de chat (scrollView)
    local scrollView = widget.newScrollView({
        left = 0,
        top = 50,
        width = parent.width,
        height = parent.height - 100
    })
    chatGroup:insert(scrollView)

    -- Champ d'entrée
    inputField = native.newTextField(0, parent.height - 30, parent.width - 60, 30)
    inputField.hasBackground = true
    inputField:addEventListener("userInput", aiAssistant.onInput)
    chatGroup:insert(inputField)

    -- Bouton envoyer
    local sendButton = widget.newButton({
        left = inputField.x + inputField.width + 10,
        top = inputField.y - 15,
        label = "Envoyer",
        onRelease = aiAssistant.sendMessage
    })
    chatGroup:insert(sendButton)
end

function aiAssistant.onInput(event)
    if event.phase == "submitted" then
        aiAssistant.sendMessage()
    end
end

function aiAssistant.sendMessage()
    local message = inputField.text
    if message ~= "" then
        table.insert(messages, {role = "user", content = message})
        aiAssistant.updateChat()
        aiAssistant.callAPI(message)
        inputField.text = ""
    end
end

function aiAssistant.callAPI(prompt)
    local headers = {
        ["Content-Type"] = "application/json",
        ["Authorization"] = "Bearer " .. config.apiKey
    }

    local body = json.encode({
        model = config.apiModel,
        messages = messages
    })

    local params = {
        headers = headers,
        body = body
    }

    network.request(config.apiEndpoint, "POST", aiAssistant.onAPIResponse, params)
end

function aiAssistant.onAPIResponse(event)
    if event.isError then
        print("Erreur API: " .. event.response)
    else
        local response = json.decode(event.response)
        local reply = response.choices[1].message.content
        table.insert(messages, {role = "assistant", content = reply})
        aiAssistant.updateChat()
    end
end

function aiAssistant.updateChat()
    -- Mettre à jour l'affichage du chat
    -- Effacer et recréer texts pour messages
    print("Chat updated")
end

function aiAssistant.configureAPI(key, model, endpoint)
    config.apiKey = key
    config.apiModel = model
    config.apiEndpoint = endpoint
end

return aiAssistant