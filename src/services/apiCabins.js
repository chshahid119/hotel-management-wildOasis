import supabase, {supabaseUrl} from './supabase';


export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins Could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(id);
  const hasImagePath= newCabin.image?.startsWith?.(supabaseUrl);   
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath ? newCabin.image :  `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from('cabins');

  // A) CREATE
  if(!id) query = query.insert([{ ...newCabin,image: imagePath} ])

  // B) EDIT
  if(id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const {data, error} = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('Cabin Could not be created');
  }

  // 2. Upload Image
  const { error: storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image);

  // 3. Delete the Cabin IF there was an error uploading images
  if(storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('Cabin Image Could not be uploaded and cabin was not created');
  }


  return data;
}
 
export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabin Could not be Deleted');
  }

  return data;
}
