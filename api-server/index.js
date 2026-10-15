
import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 8000;

// ========================================
// 1. 미들웨어 설정
// ========================================

// JSON 데이터 처리
app.use(express.json());

// 요청 로그 출력
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ========================================
// 2. MySQL 연결 설정
// ========================================

const db = mysql.createPool({
  host: 'localhost',
  user: 'jsuser',
  password: 'pwjs',
  database: 'jsdb'
});

// ========================================
// 3. 기본 페이지
// ========================================

app.get('/', (req, res) => {
  res.send('<h2>Hello Express + MySQL</h2>');
});

// ========================================
// 4. 전체 상품 조회 (GET)
// ========================================

app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, product_name AS name, price, created_at FROM product'
    );

    res.status(200).json(rows);

  } catch (err) {
    console.error('상품 조회 오류:', err);

    res.status(500).json({
      message: '상품 조회 실패'
    });
  }
});

// ========================================
// 5. 특정 상품 조회 (GET)
// ========================================

app.get('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: '올바른 상품 ID를 입력해주세요.'
      });
    }

    const [rows] = await db.execute(
      `SELECT id, product_name AS name, price, created_at
       FROM product WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: '상품을 찾을 수 없습니다.'
      });
    }

    res.status(200).json(rows[0]);

  } catch (err) {
    console.error('상품 상세 조회 오류:', err);

    res.status(500).json({
      message: '상품 상세 조회 실패'
    });
  }
});

// ========================================
// 6. 상품 등록 (POST)
// ========================================

app.post('/api/products', async (req, res) => {
  try {
    const { name, price } = req.body ?? {};

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      name.length > 20 ||
      typeof price !== 'number' ||
      !Number.isSafeInteger(price) ||
      price < 0 ||
      price > 2147483647
    ) {
      return res.status(400).json({
        message: '상품명과 가격을 올바르게 입력해주세요.'
      });
    }

    const [result] = await db.execute(
      'INSERT INTO product (product_name, price) VALUES (?, ?)',
      [name.trim(), price]
    );

    res.status(201).json({
      message: '상품이 등록되었습니다.',
      product: {
        id: result.insertId,
        name: name.trim(),
        price
      }
    });

  } catch (err) {
    console.error('상품 등록 오류:', err);

    res.status(500).json({
      message: '상품 등록 실패'
    });
  }
});

// ========================================
// 7. 상품 수정 (PUT)
// ========================================

app.put('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, price } = req.body ?? {};

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: '올바른 상품 ID를 입력해주세요.'
      });
    }

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      name.length > 20 ||
      typeof price !== 'number' ||
      !Number.isSafeInteger(price) ||
      price < 0 ||
      price > 2147483647
    ) {
      return res.status(400).json({
        message: '상품 정보를 올바르게 입력해주세요.'
      });
    }

    const [result] = await db.execute(
      `UPDATE product
       SET product_name = ?, price = ?
       WHERE id = ?`,
      [name.trim(), price, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: '상품을 찾을 수 없습니다.'
      });
    }

    res.status(200).json({
      message: '상품이 수정되었습니다.',
      product: {
        id,
        name: name.trim(),
        price
      }
    });

  } catch (err) {
    console.error('상품 수정 오류:', err);

    res.status(500).json({
      message: '상품 수정 실패'
    });
  }
});

// ========================================
// 8. 상품 삭제 (DELETE)
// ========================================

app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: '올바른 상품 ID를 입력해주세요.'
      });
    }

    const [result] = await db.execute(
      'DELETE FROM product WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: '상품을 찾을 수 없습니다.'
      });
    }

    res.status(200).json({
      message: '상품이 삭제되었습니다.',
      deletedId: id
    });

  } catch (err) {
    console.error('상품 삭제 오류:', err);

    res.status(500).json({
      message: '상품 삭제 실패'
    });
  }
});

// ========================================
// 9. MySQL 연결 확인 및 서버 실행
// ========================================

try {
  const connection = await db.getConnection();

  console.log('MySQL에 연결되었습니다.');
  connection.release();

  app.listen(PORT, () => {
    console.log(
      `서버 실행중... http://localhost:${PORT}`
    );
  });

} catch (err) {
  console.error('MySQL 연결 실패:', err.message);
  process.exitCode = 1;
  await db.end();
}
