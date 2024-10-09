import supabase from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins Could not be loaded');
  }

  return data;
}

export async function createCabin(cabin) {
  const { data, error } = await supabase.from('cabins').insert([cabin]);

  if (error) {
    console.log(error);
    throw new Error('Cabin Could not be created');
  }

  return data;
}



export async function deleteCabin(id) {
const {data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)

   if (error) {
    console.log(error);
    throw new Error('Cabin Could not be Deleted');
  }

  return data;
}


