import supabase from "@/services/supabase";
import { supabaseURL } from "./supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

async function createCabin(request) {
  const imageName = `${Math.floor(Math.random() * 999999999)}-${request.imageName}`.replace("/", "").replace(" ", "");
  const imagePath = `${supabaseURL}/storage/v1/object/public/cabin-images/${imageName}`;

  // Example ImagePath to :
  // https://whvqwnrqhrhpkeqddyzq.supabase.co/storage/v1/object/public/cabin-images/610-nama-image.png

  const values = {
    name: request.name,
    max_capacity: request.max_capacity,
    regular_price: request.regular_price,
    discount: request.discount,
    description: request.description,
    image: imagePath
  }

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...values }])
    .select();

  if (error) {
    throw new Error("Cabins could not be created");
  }

  // Upload Cabin Image
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, request.image);

  // Delete The cabin if there was an error upload image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
  }

  return data;
}

async function updateCabin(request) {
  let values = {
    name: request.name,
    max_capacity: request.max_capacity,
    regular_price: request.regular_price,
    discount: request.discount,
    description: request.description,
  }

  const imageName = `${Math.floor(Math.random() * 999999999)}-${request.imageName}`.replace("/", "").replace(" ", "");
  const imagePath = `${supabaseURL}/storage/v1/object/public/cabin-images/${imageName}`;
  const isNewUploadImage = request.image ? true : false;

  // select old data
  let { data: cabin, error: selectError } = await supabase
    .from('cabins')
    .select("image")
    .eq("id", request.id)
    .single();

  if (selectError) {
    console.error(error);
    throw new Error("Failed select cabin detail!");
  }

  if (isNewUploadImage) values.image = imagePath;

  const { error } = await supabase
    .from("cabins")
    .update({ ...values })
    .eq("id", request.id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }

  if (isNewUploadImage) {
    // Upload New Cabin Image
    const { error: storageError } = await supabase
      .storage
      .from('cabin-images')
      .upload(imageName, request.image);

    if (storageError) {
      console.error(error);
      throw new Error("New image coult not be uploaded!");
    }

    // Delete Old Image
    const oldImageName = cabin.image.split("/").slice(-1)[0];
    const { error: storageOldError } = await supabase
      .storage
      .from('cabin-images')
      .remove([oldImageName])

    if (storageOldError) {
      console.log(storageError);
      throw new Error("Failed delete image cabin");
    }
  }
}

async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  const imageName = data.image.split("/").slice(-1)[0];

  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .remove([imageName])

  if (storageError) {
    console.log(storageError);
    throw new Error("Failed delete image cabin");
  }
}

export {
  getCabins,
  createCabin,
  updateCabin,
  deleteCabin
}