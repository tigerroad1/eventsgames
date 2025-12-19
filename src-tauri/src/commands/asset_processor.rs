use crate::asset_pipeline::fbx_parser::parse_fbx;

#[tauri::command]
pub fn process_asset(path: String) -> Result<String, String> {
    println!("Processing asset at {}", path);
    parse_fbx(&path)
}
