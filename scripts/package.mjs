import { readFile, readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { zipSync } from "fflate";

const files = {};
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else
      files[relative("dist", path).replaceAll("\\", "/")] = new Uint8Array(
        await readFile(path),
      );
  }
}
await collect("dist");
await writeFile("campusconnect.zip", zipSync(files, { level: 6 }));
console.log("Created campusconnect.zip with index.html at the archive root.");
