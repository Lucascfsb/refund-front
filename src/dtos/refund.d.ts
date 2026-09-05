type RefundAPiResponse = {
  id: string;
  userId: string;
  name: string;
  category: CategoriesAPIEnum;
  amount: number;
  filename: string;
  user: {
    name: string;
  };
};

type RefundsPaginationResponse = {
  refunds: RefundAPiResponse[];
  pagination: {
    page: number;
    perPage: number;
    totelRecords: number;
    totalPages: number;
  };
};
