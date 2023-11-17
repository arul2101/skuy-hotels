import { getToday } from "../util/helper";
import supabase from "./supabase"

async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, start_date, end_date, num_nights, num_guests, status, total_price, cabins(name), guests(full_name, email)",
    );

  if (error) {
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Booking detail could not be loaded");
  }

  return data;
}

export async function updateBooking(request) {
  let values = {
    status: request.status,
    is_paid: request.is_paid,
  }

  if (request.breakfast) {
    values.has_breakfast = true;
    values.extras_price = request.breakfast.extras_price;
    values.total_price = request.breakfast.total_price;
  }

  const { error } = await supabase
    .from("bookings")
    .update({ ...values })
    .eq("id", request.id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
}

async function deleteBooking(id) {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}

async function createBooking(request) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([{ ...request }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extras_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export {
  getBookings,
  getBooking,
  deleteBooking,
  createBooking
}