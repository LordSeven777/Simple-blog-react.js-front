import { useState } from "react";

// API calls
import { fetchUsers } from "../../apis/users-api";

// Other custom hooks
import usePaginatedApiCall from "../../hooks/usePaginatedApiCall";

// Custom hook for the users page
export default function useUsers() {
	const [page, setPage] = useState(1);
	const [order, setOrder] = useState("desc");
	const [search, setSearch] = useState("");

	const [users, isLoading, count, pages] = usePaginatedApiCall(
		() => {
			const LIMIT = 12;
			return fetchUsers(page, LIMIT, order, search);
		},
		null,
		[page, order, search]
	);

	return {
		users,
		page,
		order,
		search,
		isLoading,
		count,
		pages,
		handlePageChange: setPage,
		handleOrderChange: setOrder,
		handleSearchChange: setSearch,
	};
}
