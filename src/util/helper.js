import { formatDistance, parseISO } from 'date-fns';

export function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("id", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export function filterBooking(bookings, searchParams) {
  // Filter
  let filteredBooking;
  const filterValue = searchParams.get("status") || "all";

  if (filterValue === "all") filteredBooking = bookings;
  if (filterValue === "checked-in") {
    filteredBooking = bookings.filter(booking => booking.status === filterValue)
  }
  if (filterValue === "checked-out") {
    filteredBooking = bookings.filter(booking => booking.status === filterValue)
  }

  if (filterValue === 'unconfirmed') {
    filteredBooking = bookings.filter(booking => booking.status === filterValue)
  }

  return filteredBooking;
}

export function filterCabins(cabins, searchParams) {
  // Filter
  let filteredCabins;
  const filterValue = searchParams.get("discount") || "all";

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter(cabin => cabin.discount > 0)
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter(cabin => cabin.discount === 0)
  }

  return filteredCabins;
}

export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};


// === From Antd ===
