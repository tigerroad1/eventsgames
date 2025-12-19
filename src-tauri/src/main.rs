// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod asset_pipeline;

use commands::asset_processor::process_asset;
use commands::file_system::save_project;

// Wrapper for retargeting since it is in asset_pipeline module
#[tauri::command]
fn normalize_skeleton_cmd(path: String) -> Result<String, String> {
    asset_pipeline::retargeting::normalize_skeleton(&path)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            process_asset,
            save_project,
            normalize_skeleton_cmd
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
