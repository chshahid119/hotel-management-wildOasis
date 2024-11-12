import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const queryClient= useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER  
  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all' ? null : {field: 'status', value: filterValue};

  // SORTBY
  const sortByRaw = searchParams.get('sortBy') || 'created_at';
  const [field, direction] = sortByRaw.split('-');

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))


  const sortBy = {field, direction};


  const {isLoading, data:{data: bookings, count}={},error} = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: ()=>getBookings({filter, sortBy, page})
      })

  // PRE-FETCHING
  const pageCount = Math.ceil(count/PAGE_SIZE)
  if(page < pageCount) {
  queryClient.prefetchQuery({
    queryKey: ['bookings', filter, sortBy, page+1],
    queryFn: ()=>getBookings({filter, sortBy, page: page+1})
  })
}
  if(page > 1) {
  queryClient.prefetchQuery({
    queryKey: ['bookings', filter, sortBy, page-1],
    queryFn: ()=>getBookings({filter, sortBy, page: page-1})
  })
}


  return {isLoading, error, bookings, count };
}


export {useBookings} 