import supabase from "./supabase";

export async function getCabins() {
    
    
let { data, error } = await supabase
  .from('cabins')
  .select('*')
    if (error) {
        console.log(error);
        throw new Error("Cabins Could not be loaded")
    }
    
    return data;
}


getCabins();