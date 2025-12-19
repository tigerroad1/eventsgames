use std::fs::File;
use std::io::Write;
use zip::write::FileOptions;
use std::path::Path;

#[tauri::command]
pub fn save_project(path: String, data: String) -> Result<(), String> {
    println!("Saving project to {}", path);

    let path_obj = Path::new(&path);
    let file = File::create(path_obj).map_err(|e| e.to_string())?;

    let mut zip = zip::ZipWriter::new(file);

    // Default compression
    let options = FileOptions::default()
        .compression_method(zip::CompressionMethod::Stored)
        .unix_permissions(0o755);

    // Write project.json
    zip.start_file("project.json", options).map_err(|e| e.to_string())?;
    zip.write_all(data.as_bytes()).map_err(|e| e.to_string())?;

    // We could add more files here (assets, etc.)

    zip.finish().map_err(|e| e.to_string())?;

    Ok(())
}
