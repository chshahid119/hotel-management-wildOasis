import supabase, {supabaseUrl} from './supabase';


export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins Could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin) {
    // Bucket Url
    // https://zxpaxwzbcylqriumgaao.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create a new cabin
  const { data, error } = await supabase.from('cabins').insert([{ ...newCabin,image: imagePath} ]);

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
