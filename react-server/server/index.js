
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcryptjs';

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

// ========================================
// 11. 회원 API
// ========================================

// 11-1. 회원 목록 조회
app.get('/api/users', (req, res) => {
  const sql = `
    SELECT id, username, email, role, created_at
    FROM users
    ORDER BY id ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('회원 목록 조회 에러:', err);
      return res.status(500).send('회원 조회 중 오류가 발생했습니다.');
    }

    res.json(results);
  });
});


// 회원가입
app.post('/api/users', async (req, res) => {
  const { username, password, email } = req.body;

  if (!username?.trim() || !password || !email?.trim()) {
    return res.status(400).send('모든 항목을 입력하세요.');
  }

  try {
    // 비밀번호 암호화(해시)
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (username, password, email)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [username.trim(), hashedPassword, email.trim()],
      (err, results) => {
        if (err) {
          console.error('회원가입 에러:', err);

          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).send('이미 존재하는 아이디입니다.');
          }

          return res.status(500).send('회원가입 실패');
        }

        res.status(201).json({
          message: '회원가입이 완료되었습니다.',
          id: results.insertId
        });
      }
    );
  } catch (error) {
    console.error('비밀번호 처리 에러:', error);
    res.status(500).send('회원가입 실패');
  }
});


// 11-3. 회원 상세 조회
app.get('/api/users/:username', (req, res) => {
  const username = req.params.username;

  const sql = `
    SELECT id, username, email, role, created_at
    FROM users
    WHERE username = ?
  `;

  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error('회원 상세 조회 에러:', err);
      return res.status(500).send('회원 조회 중 오류가 발생했습니다.');
    }

    if (results.length === 0) {
      return res.status(404).send('존재하지 않는 회원입니다.');
    }

    res.json(results[0]);
  });
});

// 로그인
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: '아이디와 비밀번호를 입력하세요.'
    });
  }

  const sql = `
    SELECT id, username, password, role
    FROM users
    WHERE username = ?
  `;

  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('로그인 오류:', err);
      return res.status(500).json({
        message: '로그인 처리 중 오류가 발생했습니다.'
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: '아이디 또는 비밀번호가 일치하지 않습니다.'
      });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: '아이디 또는 비밀번호가 일치하지 않습니다.'
        });
      }

      res.json({
        message: '로그인 성공',
        username: user.username,
        role: user.role
      });
    } catch (error) {
      console.error('비밀번호 검증 오류:', error);
      res.status(500).json({
        message: '로그인 처리 중 오류가 발생했습니다.'
      });
    }
  });
});


// ========================================
// 12. 서버 실행
// ========================================

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}에서 서버 실행중...`);
});
