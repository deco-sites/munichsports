import { join } from "jsr:@std/path";

interface DenoJSON {
  name: string;
  version: string;
  imports: Record<string, string>;
  exports: Record<string, string>;
}
const linkedDenoJSONPath = Deno.args[0];

const denoJSONPath = join(Deno.cwd(), "deno.json");
const projectDenoJSON: DenoJSON = await Deno.readTextFile(
  denoJSONPath,
).then((str) => JSON.parse(str));

const linkedDenoJSON: DenoJSON = await Deno.readTextFile(
  join(Deno.cwd(), linkedDenoJSONPath, "deno.json"),
).then((str) => JSON.parse(str));

const jsrEntry = `jsr:${linkedDenoJSON.name}@^${linkedDenoJSON.version}`;
const isReset = projectDenoJSON.imports[linkedDenoJSON.name] !== jsrEntry;

if (isReset) {
  const { name: pkgName, exports } = linkedDenoJSON;
  for (const key of Object.keys(exports)) {
    const entryKey = key.replace(".", pkgName);
    delete projectDenoJSON.imports[entryKey];
  }
  projectDenoJSON.imports[linkedDenoJSON.name] = jsrEntry;
} else {
  const { name: pkgName, exports } = linkedDenoJSON;

  const entries: Record<string, string> = projectDenoJSON.imports;

  for (const [key, value] of Object.entries(exports)) {
    const entryKey = key.replace(".", pkgName);
    entries[entryKey] = value.replace(".", linkedDenoJSONPath);
  }
}

await Deno.writeTextFile(
  denoJSONPath,
  JSON.stringify(projectDenoJSON, null, 2),
);
