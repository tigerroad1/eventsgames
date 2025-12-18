// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod asset_pipeline;

use commands::asset_processor::process_asset;
use commands::file_system::save_project;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            process_asset,
            save_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
