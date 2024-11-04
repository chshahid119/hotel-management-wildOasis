import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';


export default function CabinTable() {
 const {isLoading, cabins, error} = useCabins();
  const [searchParams]= useSearchParams();

  if(isLoading) return <Spinner/>

  // 1) FILTER
  const filterValue = searchParams.get('discount') || 'all';
  console.log(filterValue);

  let filteredCabins;
  if(filterValue === 'all') filteredCabins = cabins;
  if(filterValue === 'no-discount') filteredCabins = cabins.filter(cabin=>cabin.discount === 0);
  if(filterValue === 'with-discount') filteredCabins = cabins.filter(cabin=>cabin.discount > 0);


  // 2) SORT
    const soryBy= searchParams.get('sortBy') || 'startDate-asc';
    const [field, direction] = soryBy.split('-');
    const modifier = direction === 'asc' ? 1 : -1;
    const SortedCabins = filteredCabins.sort((a,b)=>(a[field]-b[field]) * modifier) ;
  return (
    <Menus>
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={SortedCabins}
       render={(cabin=><CabinRow cabin={cabin} key={cabin.id} />)}/>
   </Table>
   </Menus>
  )
}
