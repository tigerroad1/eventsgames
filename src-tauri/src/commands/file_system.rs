#[tauri::command]
pub fn save_project(path: String, data: String) -> Result<(), String> {
    // Placeholder for saving project to ZIP
    println!("Saving project to {}", path);
    Ok(())
}
