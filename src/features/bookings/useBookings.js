import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER  
  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all' ? null : {field: 'status', value: filterValue};

  // SORTBY
  const sortByRaw = searchParams.get('sortBy') || 'created_at';
  const [field, direction] = sortByRaw.split('-');

  const sortBy = {field, direction};


    const {isLoading, data:bookings,error} = useQuery({
        queryKey: ['bookings', filter, sortBy],
        queryFn: ()=>getBookings({filter, sortBy})
      })

      return {isLoading, bookings, error};
}


export {useBookings}