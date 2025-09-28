-- main.lua: Point d'entrée principal

local composer = require("composer")
local themeManager = require("src.themeManager")
local inputHandler = require("src.inputHandler")

-- Appliquer le thème par défaut
themeManager.applyTheme("dark")

-- Initialiser la gestion des entrées
inputHandler.init()

-- Aller à la scène de l'interface principale
composer.gotoScene("interface")