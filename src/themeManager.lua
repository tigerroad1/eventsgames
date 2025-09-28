-- src/themeManager.lua: Gestion des thèmes

local themeManager = {}

local themes = {
    dark = {
        name = "VSCode Dark",

        -- Main UI Colors from screenshot
        background = {0.117, 0.117, 0.117}, -- #1e1e1e (Editor background)
        sidebar = {0.156, 0.156, 0.156},    -- #252526 (File explorer background)
        editor = {0.117, 0.117, 0.117},     -- #1e1e1e
        statusBar = {0.0, 0.478, 0.8},      -- #007acc

        -- Text Colors
        text = {0.86, 0.86, 0.86},          -- #dcdcdc
        lineNumber = {0.53, 0.53, 0.53},    -- #888888

        -- Syntax Highlighting (simplified for now)
        syntax = {
            keyword = {0.35, 0.6, 0.81},    -- #5999d1 (like 'const', 'from')
            string = {0.8, 0.5, 0.3},       -- #ce9178
            comment = {0.41, 0.6, 0.34},    -- #6a9955
            type = {0.3, 0.8, 0.73},        -- #4ec9b0 (like 'React')
            number = {0.7, 0.8, 0.4},       -- #b5cea8
            tag = {0.35, 0.6, 0.81},        -- #5999d1 (like 'div')
            attribute = {0.6, 0.7, 0.9},    -- #9cdcfe (like 'className')
            functionCall = {0.86, 0.86, 0.5}-- #dcdcaa (like 'useState')
        },

        -- UI elements for future implementation
        tab_active_bg = {0.117, 0.117, 0.117}, -- same as editor
        tab_inactive_bg = {0.176, 0.176, 0.176}, -- #2d2d2d
        icon_bar_bg = {0.20, 0.20, 0.20}, -- #333333
        icon_selected_bg = {0.0, 0.478, 0.8} -- same as status bar for selection
    },
    light = {
        name = "Clair",
        background = {1, 1, 1},
        sidebar = {0.95, 0.95, 0.95},
        editor = {1, 1, 1},
        statusBar = {0.9, 0.9, 0.9},
        text = {0, 0, 0},
        lineNumber = {0.6, 0.6, 0.6},
        syntax = {
            keyword = {0, 0, 1},
            string = {1, 0, 0},
            comment = {0.5, 0.5, 0.5},
        }
    },
    blue = {
        -- Implémentez similaire
    }
}

local currentTheme = themes.dark

function themeManager.applyTheme(themeName)
    if themes[themeName] then
        currentTheme = themes[themeName]
        -- Mettre à jour UI (requiert référence aux éléments)
        print("Thème appliqué: " .. themeName)
    end
end

function themeManager.getCurrentTheme()
    return currentTheme
end

return themeManager