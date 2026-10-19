
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

function ProductList() {
  // 서버에서 받은 현재 페이지 상품
  const [products, setProducts] = useState([]);

  // 검색 및 정렬
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('idAsc');

  // 페이징
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 5;

  // 로딩 및 오류 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 페이지, 검색어, 정렬 기준이 바뀌면 다시 조회
  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await api.get('/products', {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: search,
            sort: sortType
          }
        });

        if (cancelled) return;

        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.totalItems);
        setCurrentPage(response.data.currentPage);
      } catch (err) {
        if (cancelled) return;

        console.error('상품 조회 오류:', err);
        setError('상품 목록을 불러오지 못했습니다.');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [currentPage, search, sortType]);

  // 검색어 변경
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // 정렬 기준 변경
  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setCurrentPage(1);
  };

  // 페이지 이동
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  // 화면 번호 시작값
  const startNumber = (currentPage - 1) * itemsPerPage;

  return (
    <div className="product-container">
      <div className="page-heading">
        <h2>상품 목록</h2>

        <Link to="/products/add" className="btn">
          + 상품 등록
        </Link>
      </div>

      <p>검색 결과: {totalItems}개</p>

      {/* 검색 및 정렬 */}
      <div className="search-container">
        <input
          type="text"
          placeholder="상품명 또는 설명 검색"
          value={search}
          onChange={handleSearchChange}
        />

        <select
          value={sortType}
          onChange={handleSortChange}
        >
          <option value="idAsc">등록 ID 오름차순</option>
          <option value="idDesc">등록 ID 내림차순</option>
          <option value="priceAsc">가격 낮은순</option>
          <option value="priceDesc">가격 높은순</option>
          <option value="nameAsc">상품명 가나다순</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>상품 목록을 불러오는 중입니다...</p>
      ) : (
        <>
          <table className="product-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>상품명</th>
                <th>가격</th>
                <th>상품 설명</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{startNumber + index + 1}</td>

                    <td>
                      <Link
                        to={`/products/${product.id}`}
                        className="product-link"
                      >
                        {product.product_name}
                      </Link>
                    </td>

                    <td>
                      {Number(product.price).toLocaleString()}원
                    </td>

                    <td>{product.description || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* 페이지 이동 버튼 */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                이전
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                다음
              </button>
            </div>
          )}

          {totalPages > 0 && (
            <p className="page-info">
              현재 {currentPage}페이지 / 전체 {totalPages}페이지
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;



