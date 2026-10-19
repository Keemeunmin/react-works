
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = 8000;

// 1. MySQL 데이터베이스 연결
const db = mysql.createConnection({
  host: 'localhost',
  user: 'jsuser',
  password: 'pwjs',
  database: 'jsdb'
});

// 2. MySQL 연결 확인
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }

  console.log('MySQL에 연결되었습니다.');
});

// 3. CORS 설정
app.use(cors({
  origin: 'http://localhost:5173'
}));

// 4. JSON 요청 처리
app.use(express.json());

// 5. 기본 페이지
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 6. 상품 목록 조회

/* 상품 목록 조회: 검색 + 정렬 + 서버 페이징 */
app.get('/api/products', (req, res) => {
  // URL에서 전달받은 페이지와 검색 조건
  const requestedPage = Number(req.query.page);
  const requestedLimit = Number(req.query.limit);

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const limit =
    Number.isInteger(requestedLimit) &&
    requestedLimit > 0 &&
    requestedLimit <= 100
      ? requestedLimit
      : 5;

  const search = String(req.query.search || '').trim();
  const sort = String(req.query.sort || 'idAsc');

  // 정렬 컬럼은 미리 허용한 값만 사용
  const sortOptions = {
    idAsc: 'id ASC',
    idDesc: 'id DESC',
    priceAsc: 'price ASC, id ASC',
    priceDesc: 'price DESC, id ASC',
    nameAsc: 'product_name ASC, id ASC'
  };

  const orderBy = sortOptions[sort] || sortOptions.idAsc;

  // 상품명 또는 설명 검색
  const whereSql = `
    WHERE product_name LIKE ?
       OR description LIKE ?
  `;

  const keyword = `%${search}%`;
  const searchParams = [keyword, keyword];

  // 검색 조건에 맞는 전체 상품 수 조회
  const countSql = `
    SELECT COUNT(*) AS total
    FROM product
    ${whereSql}
  `;

  db.query(countSql, searchParams, (countErr, countResults) => {
    if (countErr) {
      console.error('상품 개수 조회 오류:', countErr);
      return res.status(500).json({
        message: '상품 개수 조회 실패'
      });
    }

    const totalItems = countResults[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    // 범위를 벗어난 페이지를 유효한 페이지로 조정
    const currentPage = Math.min(
      page,
      Math.max(totalPages, 1)
    );

    const offset = (currentPage - 1) * limit;

    // MySQL에서 현재 페이지의 상품만 조회
    const listSql = `
      SELECT id, product_name, price, description, created_at
      FROM product
      ${whereSql}
      ORDER BY ${orderBy}
      LIMIT ${limit} OFFSET ${offset}
    `;

    db.query(listSql, searchParams, (listErr, products) => {
      if (listErr) {
        console.error('상품 목록 조회 오류:', listErr);
        return res.status(500).json({
          message: '상품 목록 조회 실패'
        });
      }

      res.json({
        products,
        totalItems,
        totalPages,
        currentPage,
        limit
      });
    });
  });
});


// 7. 상품 상세 조회
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  const sql = 'SELECT * FROM product WHERE id = ?';

  db.query(sql, [productId], (err, results) => {
    if (err) {
      console.error('상품 상세 조회 에러:', err);
      return res.status(500).send('상품 상세 조회 실패');
    }

    if (results.length === 0) {
      return res.status(404).send('상품이 없습니다.');
    }

    res.json(results[0]);
  });
});

// 8. 상품 등록
app.post('/api/products', (req, res) => {
  const { productName, price, description } = req.body;

  const sql =
    'INSERT INTO product (product_name, price, description) VALUES (?, ?, ?)';

  db.query(sql, [productName, price, description], (err) => {
    if (err) {
      console.error('상품 등록 에러:', err);
      return res.status(500).send('상품 등록 실패');
    }

    res.status(201).send('상품 등록 성공');
  });
});

// 9. 상품 수정
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const { productName, price, description } = req.body;

  const sql =
    'UPDATE product SET product_name = ?, price = ?, description = ? WHERE id = ?';

  db.query(
    sql,
    [productName, price, description, productId],
    (err) => {
      if (err) {
        console.error('상품 수정 에러:', err);
        return res.status(500).send('상품 수정 실패');
      }

      res.send('상품 수정 성공');
    }
  );
});

// 10. 상품 삭제
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  const sql = 'DELETE FROM product WHERE id = ?';

  db.query(sql, [productId], (err) => {
    if (err) {
      console.error('상품 삭제 에러:', err);
      return res.status(500).send('상품 삭제 실패');
    }

    res.send('상품 삭제 성공');
  });
});

// 11. 서버 실행
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}에서 서버 실행중...`);
});

