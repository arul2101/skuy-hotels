import supabase from "./supabase";

async function getGuests() {
  const { data, error } = await supabase.from("guests").select("*");

  if (error) {
    throw new Error("Guests could not be loaded");
  }

  return data;
}

async function createGuest(request) {
  const { data, error } = await supabase
    .from("guests")
    .insert([{ ...request }])
    .select();

  if (error) {
    throw new Error("Guest could not be created");
  }

  return data;
}

export {
  getGuests,
  createGuest
}