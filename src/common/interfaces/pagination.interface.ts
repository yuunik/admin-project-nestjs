export interface PaginatedResult<T> {
  data: T[]; // 当前页的数据列表
  total: number; // 总记录数
  page: number; // 当前页码
  pageSize: number; // 每页条数
  totalPages: number; // 总页数
}
