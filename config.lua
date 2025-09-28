-- config.lua: Configuration de l'application

local config = {
    appName = "SolarCode",
    version = "1.0.0",
    defaultTheme = "dark",
    supportedLanguages = {"lua", "javascript", "html", "css", "json", "markdown"},
    apiEndpoint = "https://api.openai.com/v1/chat/completions",
    apiModel = "gpt-3.5-turbo",
    -- Ajoutez votre clé API ici (ne pas commiter !)
    apiKey = "",
    font = "monospace.ttf", -- Police monospace à placer dans fonts/
    fontSize = 14,
    lineHeight = 20,
}

return config