import supabase from "./supabase";

async function getSettings() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export {
  getSettings
}