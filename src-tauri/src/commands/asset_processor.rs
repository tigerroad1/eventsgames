#[tauri::command]
pub fn process_asset(path: String) -> Result<String, String> {
    // Placeholder for processing FBX/OBJ
    println!("Processing asset at {}", path);
    Ok("processed_path.gltf".to_string())
}
